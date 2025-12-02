"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function AnimatedHeroText() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (title) {
      const chars = title.querySelectorAll(".char");
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const text = "代碼構築世界，創新引領未來";

  return (
    <h1
      ref={titleRef}
      className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline"
      style={{ overflow: "hidden" }}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{
            opacity: 0, // Start with opacity 0 to prevent flash of unstyled content
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}
