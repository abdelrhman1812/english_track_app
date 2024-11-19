import { useEffect, useState } from "react";

const useResponsive = () => {
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 991);
  };

  const handleFocus = () => {
    if (isMobile) {
      setShowForm(false);
    }
  };

  const handleBlur = () => {
    if (isMobile) {
      setShowForm(true);
    }
  };

  useEffect(() => {
    if (window.innerWidth > 991) {
      setShowForm(true);
    }

    window.addEventListener("resize", handleResize);

    window.addEventListener("focusin", handleFocus);
    window.addEventListener("focusout", handleBlur);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("focusin", handleFocus);
      window.removeEventListener("focusout", handleBlur);
    };
  }, [isMobile]);

  return { isMobile, showForm, setShowForm };
};

export default useResponsive;
