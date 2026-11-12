import { useEffect, useRef } from "react";

const STAR_COUNT = 200;

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars = [];
    let animationFrameId = null;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function initOrScaleStars(prevWidth, prevHeight) {
      if (stars.length === 0) {
        stars = Array.from({ length: STAR_COUNT }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.5,
          speed: Math.random() * 0.3 + 0.1,
        }));
      } else if (prevWidth > 0 && prevHeight > 0) {
        const scaleX = width / prevWidth;
        const scaleY = height / prevHeight;
        for (let i = 0; i < stars.length; i++) {
          stars[i].x *= scaleX;
          stars[i].y *= scaleY;
        }
      }
    }

    function drawFrame(advance) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#ffffff70";
      ctx.beginPath();

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (advance) {
          star.y += star.speed;
          if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
          }
        }
        ctx.moveTo(star.x + star.r, star.y);
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      }

      ctx.fill();
    }

    function resizeCanvas() {
      const prevWidth = width;
      const prevHeight = height;
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initOrScaleStars(prevWidth, prevHeight);
      if (reducedMotionQuery.matches || document.hidden) {
        drawFrame(false);
      }
    }

    function stopAnimation() {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    function animate() {
      if (document.hidden || reducedMotionQuery.matches) {
        animationFrameId = null;
        return;
      }
      drawFrame(true);
      animationFrameId = requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (
        animationFrameId === null &&
        !document.hidden &&
        !reducedMotionQuery.matches
      ) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    }

    function handleMotionChange() {
      if (reducedMotionQuery.matches) {
        stopAnimation();
        drawFrame(false);
      } else {
        startAnimation();
      }
    }

    resizeCanvas();
    drawFrame(false);
    startAnimation();

    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    return () => {
      stopAnimation();
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-100 h-full w-full bg-[#111] pointer-events-none"
    />
  );
}
