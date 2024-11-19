import { FaEye, FaEyeSlash } from "react-icons/fa";

const VisibilityToggle = ({ isVisible, toggleVisibility }) => {
  return (
    <span className="visibility-toggle" onClick={toggleVisibility}>
      {isVisible ? (
        <FaEyeSlash className="icon-eye" />
      ) : (
        <FaEye className="icon-eye" />
      )}
    </span>
  );
};

export default VisibilityToggle;
