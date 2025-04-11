import React, { useState, useEffect } from 'react';

const Typewriter = ({ text = '', speed = 80, pause = 1500 }) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!deleting) {
        if (index < text.length) {
          setDisplayed((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);
        } else {
          setDeleting(true);
          setTimeout(() => {}, pause);
        }
      } else {
        if (index > 0) {
          setDisplayed((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setDeleting(false);
        }
      }
    }, speed);

    return () => clearInterval(interval);
  }, [index, deleting, text, speed, pause]);

  return <span>{displayed}|</span>;
};

export default Typewriter;
