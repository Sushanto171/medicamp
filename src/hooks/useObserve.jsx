import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (threshold = 0.5) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !mount)
            setIsVisible(entry.isIntersecting);
          setMount(true);
        });
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  return { elementRef, isVisible };
};

export default useIntersectionObserver;
