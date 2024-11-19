import { useEffect, useState } from "react";

const useResponsive = () => {
  const [showForm, setShowForm] = useState(false); // افتراضياً يكون الفورم مخفي
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 991);
    // عند تغيير حجم الشاشة لأكبر من 991، خلي الفورم دايمًا يظهر
    if (window.innerWidth > 991) {
      setShowForm(true);
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

  return { isMobile, showForm, setShowForm };
};

export default useResponsive;
