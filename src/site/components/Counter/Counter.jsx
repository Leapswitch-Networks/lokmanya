import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const Counter = ({
  targetValue,
  duration = 3000,
  usePlusSign = false,
  className = "",
}) => {
  const [displayNumber, setDisplayNumber] = useState("0");
  const sectionRef = useRef(null);
  const animationFrameId = useRef(null);

  const animateCounter = () => {
    const targetNumber = parseFloat(String(targetValue).replace(/,/g, ""));
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentNumber = Math.floor(progress * targetNumber);

      setDisplayNumber(currentNumber.toLocaleString());

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(update);
      } else {
        setDisplayNumber(targetNumber.toLocaleString());
      }
    };

    cancelAnimationFrame(animationFrameId.current); // Prevent overlapping animations
    animationFrameId.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset to 0 before starting animation
            setDisplayNumber("0");
            animateCounter();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [targetValue, duration]);

  return (
    <div ref={sectionRef} className={`counter ${className}`}>
      {displayNumber}
      {usePlusSign && " +"}
    </div>
  );
};

Counter.propTypes = {
  targetValue: PropTypes.string.isRequired,
  duration: PropTypes.number,
  usePlusSign: PropTypes.bool,
  className: PropTypes.string,
};

export default Counter;
