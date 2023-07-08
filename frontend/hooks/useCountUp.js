import { useEffect, useState } from 'react';

export default function useCountUp(targetValue, duration) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateInterval = Math.ceil(duration / targetValue); 
    const step = Math.ceil(targetValue / (duration / updateInterval));

    let currentCount = 0;
    const timer = setInterval(() => {
      if (currentCount + step >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        currentCount += step;
        setCount(currentCount);
      }
    }, updateInterval);

    return () => clearInterval(timer);
  }, [targetValue, duration]);

  return count;
}
