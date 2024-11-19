import { useEffect, useRef, useState } from "react";

const useResponsive = () => {
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const inputRef = useRef(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 991);
    if (window.innerWidth > 991) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth > 991) {
      setShowForm(true);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (showForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showForm]);

  return { isMobile, showForm, setShowForm, inputRef };
};

export default useResponsive;
