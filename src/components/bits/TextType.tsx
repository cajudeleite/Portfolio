'use client';

import { ElementType, useEffect, useRef, useState, createElement, useMemo, useCallback, ReactNode, isValidElement, Children } from 'react';
import { gsap } from 'gsap';

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[] | ReactNode | ReactNode[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

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
  childSegments?: TextSegment[]; // Store child segments for elements to avoid re-parsing
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
    
    // Handle Fragment or element with children
    if (children === null || children === undefined) {
      return { segments: [], totalLength: 0 };
    }
    
    if (Array.isArray(children)) {
      children.forEach((child: ReactNode, index: number) => {
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
          // Handle other ReactNode types
          const childResult = parseNodeToSegments(child, currentIndex);
          segments.push(...childResult.segments);
          currentIndex += childResult.totalLength;
        }
      });
    } else if (typeof children === 'string' || typeof children === 'number') {
      // Element with single text child - wrap the element
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
      // Element with single element child - wrap the element
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
      // Other cases - try to parse as ReactNode
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

// Helper function to render segments up to a certain character index
const renderSegmentsUpToIndex = (segments: TextSegment[], charIndex: number, relativeStartIndex: number = 0): ReactNode[] => {
  const result: ReactNode[] = [];
  let currentIndex = relativeStartIndex;
  
  for (const segment of segments) {
    if (currentIndex >= charIndex) break;
    
    if (segment.type === 'text') {
      const text = String(segment.content);
      const segmentEnd = Math.min(currentIndex + text.length, charIndex);
      const textToShow = text.substring(0, segmentEnd - currentIndex);
      if (textToShow) {
        result.push(textToShow);
      }
      currentIndex += text.length;
    } else if (segment.type === 'element') {
      const segmentEnd = Math.min(segment.endIndex, charIndex);
      if (segmentEnd > currentIndex) {
        const element = segment.content as React.ReactElement;
        const elementTextLength = segment.endIndex - segment.startIndex;
        const charsToShow = segmentEnd - currentIndex;
        
        if (charsToShow >= elementTextLength) {
          // Show full element
          result.push(element);
        } else if (charsToShow > 0 && segment.childSegments) {
          // Show partial element content using stored child segments
          // Calculate the absolute target index within the element
          const targetIndex = segment.startIndex + charsToShow;
          const partialChildren = renderSegmentsUpToIndex(segment.childSegments, targetIndex, segment.startIndex);
          
          // Render the element with partial children
          result.push(createElement(element.type, { ...element.props, key: currentIndex }, ...partialChildren));
        } else if (charsToShow > 0) {
          // Fallback: extract text if childSegments not available
          const elementChildren = element.props.children;
          let textIndex = 0;
          
          const extractPartialText = (node: ReactNode): string => {
            if (textIndex >= charsToShow) return '';
            if (typeof node === 'string' || typeof node === 'number') {
              const text = String(node);
              const remaining = charsToShow - textIndex;
              const partial = text.substring(0, remaining);
              textIndex += partial.length;
              return partial;
            }
            if (isValidElement(node)) {
              return Children.toArray(node.props.children).map(extractPartialText).join('');
            }
            if (Array.isArray(node)) {
              return node.map(extractPartialText).join('');
            }
            return '';
          };
          
          const partialText = extractPartialText(elementChildren);
          result.push(createElement(element.type, { ...element.props, key: currentIndex }, partialText));
        }
        currentIndex = segmentEnd;
      }
    }
    
    if (currentIndex >= charIndex) break;
  }
  
  return result;
};

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  
  // Parse text array into segments for each text item
  const textSegmentsArray = useMemo(() => {
    return textArray.map(item => {
      if (typeof item === 'string') {
        return { segments: [{ type: 'text' as const, content: item, startIndex: 0, endIndex: item.length }], totalLength: item.length };
      }
      return parseNodeToSegments(item);
    });
  }, [textArray]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return;
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout: NodeJS.Timeout;

    const currentTextSegments = textSegmentsArray[currentTextIndex];
    const currentPlainText = extractText(textArray[currentTextIndex]);
    const processedText = reverseMode ? currentPlainText.split('').reverse().join('') : currentPlainText;
    const maxLength = currentTextSegments.totalLength;

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (currentCharIndex === 0) {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          if (onSentenceComplete) {
            const plainText = extractText(textArray[currentTextIndex]);
            onSentenceComplete(plainText, currentTextIndex);
          }

          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          setDisplayedText('');
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setCurrentCharIndex(prev => Math.max(0, prev - 1));
            const newPlainText = reverseMode 
              ? processedText.substring(0, Math.max(0, currentCharIndex - 1))
              : processedText.substring(0, Math.max(0, currentCharIndex - 1));
            setDisplayedText(newPlainText);
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < maxLength) {
          timeout = setTimeout(
            () => {
              const newIndex = currentCharIndex + 1;
              setCurrentCharIndex(newIndex);
              const newPlainText = reverseMode 
                ? processedText.substring(0, newIndex)
                : processedText.substring(0, newIndex);
              setDisplayedText(newPlainText);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          );
        } else if (textArray.length >= 1) {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    textSegmentsArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    getRandomSpeed
  ]);

  const currentTextItem = textArray[currentTextIndex];
  const isPlainString = typeof currentTextItem === 'string';
  const currentTextSegments = textSegmentsArray[currentTextIndex];
  
  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < currentTextSegments.totalLength || isDeleting);

  // Render content based on whether it's plain text or JSX
  const renderContent = () => {
    if (isPlainString) {
      // Simple string rendering
      return (
        <span className="inline" style={{ color: getCurrentTextColor() || 'inherit' }}>
          {displayedText}
        </span>
      );
    } else {
      // JSX rendering with segments
      const renderedSegments = renderSegmentsUpToIndex(currentTextSegments.segments, currentCharIndex);
      return (
        <span className="inline" style={{ color: getCurrentTextColor() || 'inherit' }}>
          {renderedSegments}
        </span>
      );
    }
  };

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight overflow-visible ${className}`,
      style: { overflow: 'visible', ...props.style },
      ...props
    },
    renderContent(),
    showCursor && (
      <span
        ref={cursorRef}
        className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;
