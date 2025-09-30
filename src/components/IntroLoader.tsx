import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * IntroLoader Component (FINAL)
 * --------------------------------------------------------
 * - Video full-screen sin controles
 * - Logo centrado y responsive con fade/zoom
 * - Fade-in / Fade-out
 * - Límite de 10s (configurable)
 * - Bloquea scroll mientras está visible
 *
 * Usage:
 *   <IntroLoader videoSrc="/intro.mp4" logoSrc="/logo.svg" onFinish={() => ...} />
 */
export function IntroLoader({
  videoSrc,
  logoSrc,
  maxDurationMs = 10000,
  onFinish,
}: {
  videoSrc: string;
  logoSrc: string;
  maxDurationMs?: number;
  onFinish?: () => void;
}) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [logoAnimDurationSec, setLogoAnimDurationSec] = useState<number>(2.8);

  // Bloquear scroll del body durante la intro
  useEffect(() => {
    if (visible) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [visible]);

  const end = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 550);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(end, maxDurationMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [maxDurationMs]);

  // Forzar reproducción del video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      console.log('Video element found:', video);
      console.log('Video src:', video.src);
      video.play().catch(console.error);
    }
  }, []);

  // Ajustar la duración del zoom del logo para que coincida con la duración del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoaded = () => {
      const maxSeconds = maxDurationMs / 1000;
      const videoSeconds = isNaN(video.duration) ? logoAnimDurationSec : video.duration;
      const duration = Math.max(0.8, Math.min(videoSeconds, maxSeconds));
      setLogoAnimDurationSec(duration);
    };
    video.addEventListener("loadedmetadata", handleLoaded);
    return () => video.removeEventListener("loadedmetadata", handleLoaded);
  }, [maxDurationMs, logoAnimDurationSec]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="group fixed inset-0 z-[9999] bg-black w-screen h-screen overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* Video background */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-center select-none [image-rendering:auto]"
            src={videoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            controls={false}
            controlsList="nodownload noremoteplayback nofullscreen"
            disablePictureInPicture
            onEnded={end}
            onError={(e) => {
              console.error('Video error:', e);
              console.error('Video src:', videoSrc);
            }}
            onLoadStart={() => console.log('Video load started')}
            onCanPlay={() => console.log('Video can play')}
            onContextMenu={(e) => e.preventDefault()}
          />

          {/* Overlay semi-transparente (entre video y logo) */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          />

          {/* Logo centrado */}
          <div className="relative z-30 h-full w-full grid place-items-center p-6">
            <motion.img
              src={logoSrc}
              alt="Logo"
              initial={{ scale: 0.78, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 1 }}
              transition={{ duration: logoAnimDurationSec, ease: "easeOut" }}
              className="w-[60vw] max-w-[720px] min-w-[200px] h-auto drop-shadow-[0_0_36px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Sin botón omitido: removido según solicitud */}

          {/* Fade-out overlay */}
          {exiting && (
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
