// components/RainEffect.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const RainEffect = () => {
  const [drops, setDrops] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const newDrops = Array.from({ length: 30 }).map((_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {drops.map((drop) => (
        <Image
          key={drop.id}
          src="/logo.png" 
          alt="logo-drop"
          width={50}
          height={50}
          style={{
            position: "absolute",
            top: "-50px",
            left: `${drop.left}%`,
            animation: `fall 5s linear infinite`,
            animationDelay: `${drop.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RainEffect;
