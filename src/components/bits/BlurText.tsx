import { motion, Transition, Easing } from 'motion/react';
import { useEffect, useRef, useState, useMemo, ReactNode, isValidElement, Children, createElement } from 'react';

type BlurTextProps = {
  text?: string | ReactNode | ReactNode[];
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
  textColors?: string[];
};

// Helper function to extract plain text from ReactNode
const extractText = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (isValidElement(node)) {
    return Children.toArray(node.props.children).map(extractText).join('');
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }
  return '';
};

// Helper function to create a structure with text positions
interface TextSegment {
  type: 'text' | 'element';
  content: string | ReactNode;
  startIndex: number;
  endIndex: number;
  childSegments?: TextSegment[];
}

const parseNodeToSegments = (node: ReactNode, startIndex: number = 0): { segments: TextSegment[]; totalLength: number } => {
  if (typeof node === 'string' || typeof node === 'number') {
    const text = String(node);
    return {
      segments: [{ type: 'text', content: text, startIndex, endIndex: startIndex + text.length }],
      totalLength: text.length
    };
  }
  
  if (isValidElement(node)) {
    const children = node.props.children;
    let currentIndex = startIndex;
    const segments: TextSegment[] = [];
    
    if (children === null || children === undefined) {
      return { segments: [], totalLength: 0 };
    }
    
    if (Array.isArray(children)) {
      children.forEach((child: ReactNode) => {
        if (child === null || child === undefined) {
          return;
        }
        if (typeof child === 'string' || typeof child === 'number') {
          const text = String(child);
          segments.push({ type: 'text', content: text, startIndex: currentIndex, endIndex: currentIndex + text.length });
          currentIndex += text.length;
        } else if (isValidElement(child)) {
          const childResult = parseNodeToSegments(child, currentIndex);
          segments.push({ 
            type: 'element', 
            content: child, 
            startIndex: currentIndex, 
            endIndex: currentIndex + childResult.totalLength,
            childSegments: childResult.segments
          });
          currentIndex += childResult.totalLength;
        } else {
          const childResult = parseNodeToSegments(child, currentIndex);
          segments.push(...childResult.segments);
          currentIndex += childResult.totalLength;
        }
      });
    } else if (typeof children === 'string' || typeof children === 'number') {
      const text = String(children);
      segments.push({ 
        type: 'element', 
        content: node, 
        startIndex, 
        endIndex: startIndex + text.length,
        childSegments: [{ type: 'text', content: text, startIndex: 0, endIndex: text.length }]
      });
      currentIndex = startIndex + text.length;
    } else if (isValidElement(children)) {
      const childResult = parseNodeToSegments(children, currentIndex);
      segments.push({ 
        type: 'element', 
        content: node, 
        startIndex: currentIndex, 
        endIndex: currentIndex + childResult.totalLength,
        childSegments: childResult.segments
      });
      currentIndex += childResult.totalLength;
    } else {
      const childResult = parseNodeToSegments(children, currentIndex);
      segments.push({ 
        type: 'element', 
        content: node, 
        startIndex: currentIndex, 
        endIndex: currentIndex + childResult.totalLength,
        childSegments: childResult.segments
      });
      currentIndex += childResult.totalLength;
    }
    
    return { segments, totalLength: currentIndex - startIndex };
  }
  
  if (Array.isArray(node)) {
    let currentIndex = startIndex;
    const segments: TextSegment[] = [];
    node.forEach((child) => {
      if (child !== null && child !== undefined) {
        const childResult = parseNodeToSegments(child, currentIndex);
        segments.push(...childResult.segments);
        currentIndex += childResult.totalLength;
      }
    });
    return { segments, totalLength: currentIndex - startIndex };
  }
  
  return { segments: [], totalLength: 0 };
};

// Helper function to split segments into words or letters for animation
interface AnimatedSegment {
  content: ReactNode;
  isSpace: boolean;
  color?: string;
}

const splitSegmentsForAnimation = (
  segments: TextSegment[],
  animateBy: 'words' | 'letters',
  textColors?: string[]
): AnimatedSegment[] => {
  const result: AnimatedSegment[] = [];
  let colorIndex = 0;

  const getColor = (): string | undefined => {
    if (!textColors || textColors.length === 0) return undefined;
    const color = textColors[colorIndex % textColors.length];
    colorIndex++;
    return color;
  };

  for (const segment of segments) {
    if (segment.type === 'text') {
      const text = String(segment.content);
      
      if (animateBy === 'words') {
        const words = text.split(/(\s+)/);
        words.forEach((word) => {
          if (word.trim() === '' && word.length > 0) {
            // Space
            result.push({ content: '\u00A0', isSpace: true });
          } else if (word.length > 0) {
            const color = getColor();
            result.push({ 
              content: word, 
              isSpace: false,
              color
            });
          }
        });
      } else {
        // Letters
        const chars = text.split('');
        chars.forEach((char) => {
          if (char === ' ') {
            result.push({ content: '\u00A0', isSpace: true });
          } else {
            const color = getColor();
            result.push({ 
              content: char, 
              isSpace: false,
              color
            });
          }
        });
      }
    } else if (segment.type === 'element') {
      // For elements, treat them as a single unit (word or letter depending on mode)
      const element = segment.content as React.ReactElement;
      const color = getColor();
      
      // Store color to apply on wrapper, not directly on element
      // This preserves any existing colors in the JSX element
      result.push({ 
        content: element,
        isSpace: false,
        color
      });
    }
  }

  return result;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  textColors = []
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  // Parse text into segments and then split for animation
  const animatedSegments = useMemo(() => {
    if (typeof text === 'string') {
      // Simple string case - split directly
      if (animateBy === 'words') {
        const words = text.split(/(\s+)/);
        let colorIndex = 0;
        return words.map((word) => {
          if (word.trim() === '' && word.length > 0) {
            return { content: '\u00A0', isSpace: true };
          } else if (word.length > 0) {
            const color = textColors.length > 0 ? textColors[colorIndex % textColors.length] : undefined;
            colorIndex++;
            return { content: word, isSpace: false, color };
          }
          return { content: '', isSpace: false };
        }).filter(seg => seg.content !== '');
      } else {
        // Letters
        const chars = text.split('');
        let colorIndex = 0;
        return chars.map((char) => {
          if (char === ' ') {
            return { content: '\u00A0', isSpace: true };
          } else {
            const color = textColors.length > 0 ? textColors[colorIndex % textColors.length] : undefined;
            colorIndex++;
            return { content: char, isSpace: false, color };
          }
        });
      }
    } else {
      // JSX case - parse and split
      const parsed = parseNodeToSegments(text);
      return splitSegmentsForAnimation(parsed.segments, animateBy, textColors);
    }
  }, [text, animateBy, textColors]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap items-end`}>
      {animatedSegments.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === animatedSegments.length - 1 ? onAnimationComplete : undefined}
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity',
              color: segment.color || 'inherit'
            }}
          >
            {segment.content}
            {animateBy === 'words' && !segment.isSpace && index < animatedSegments.length - 1 && !animatedSegments[index + 1]?.isSpace && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
