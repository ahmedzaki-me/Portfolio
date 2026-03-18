import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function MainImg() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-50 md:w-60 ">
      {!isLoaded && (
        <div className="animate-pulse bg-sideBG rounded-3xl w-full h-110 aspect-3/4 md:aspect-square"></div>
      )}
      <img
        className={`rounded-3xl transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0 absolute"
        }`}
        src="/AhmedZaki.jpg"
        alt="AhmedZaki"
        onLoad={() => setIsLoaded(true)}
      />
      <StatusBadge />
    </div>
  );
}
