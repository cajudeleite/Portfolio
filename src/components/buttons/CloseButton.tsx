import XIcon from "../../assets/icons/XIcon";
import { scaleOnHover } from "../../utils/classNameLibrary";

const CloseButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div
      className={`h-8 cursor-pointer ${scaleOnHover} ${className}`}
      onClick={onClick}
    >
      <XIcon />
    </div>
  );
};

export default CloseButton;
