
import { useEffect, useState, useRef } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { 
      threshold: 0.1, 
      rootMargin: '0px',
      ...options 
    });

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { ref, isVisible };
};

export const useImageLoad = () => {
  const [loaded, setLoaded] = useState(false);
  
  const handleImageLoaded = () => {
    setLoaded(true);
  };
  
  return { loaded, handleImageLoaded };
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / documentHeight;
      setProgress(scrollProgress);
    };
    
    window.addEventListener('scroll', updateProgress);
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);
  
  return progress;
};
