import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function MainImg({ priority = false }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-50 md:w-60 aspect-[480/870]">
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="animate-pulse bg-sideBG/25 rounded-3xl w-full h-full absolute inset-0"
        />
      )}
      <img
        width={480}
        height={870}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`relative w-full h-full object-cover rounded-3xl transition-opacity duration-300 ${
          priority || isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src="/AhmedZaki.webp"
        alt="Ahmed Zaki"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
      <StatusBadge />
    </div>
  );
}
