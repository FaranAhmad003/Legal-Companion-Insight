import { useState, useEffect } from "react";
import "./Text.css";

const phrases = [
  "Justice & Excellence in Legal Practice",
  "Your Trusted Legal Partner",
  "Defending Your Rights with Passion",
  "Guiding You Through Legal Complexities",
];

const TypingEffect = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const typingSpeed = isDeleting ? 50 : 100; // Typing & Backspacing Speed
  const delayBetweenPhrases = 1500; // Delay before deleting

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[loopIndex];
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setText((prev) => prev + currentPhrase[charIndex]);
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
        }
      } else {
        if (charIndex > 0) {
          setText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setLoopIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      }
    };

    const typingTimer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimer);
  }, [charIndex, isDeleting, loopIndex]);

  return (
    <div className="hero-text-container">
      <h1 className="animated-text">
        {text}
        <span className="blinking-cursor">|</span>
      </h1>
    </div>
  );
};

export default TypingEffect;
