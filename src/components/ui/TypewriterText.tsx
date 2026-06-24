import { useEffect, useState } from "react";
import { Text } from "react-native";

interface TypewriterProps {
  text: string;
  speed?: number;
}

export default function TypewriterText({ text, speed = 80 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsDone(false);

    const words = text.split(" ");
    let i = 0;

    const interval = setInterval(() => {
      if (i < words.length) {
        setDisplayedText((prev) => (prev ? prev + " " : "") + words[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <Text className="text-white text-lg font-semibold leading-7">
      {displayedText}
      {!isDone && <Text className="text-white/50"> |</Text>}
    </Text>
  );
}
