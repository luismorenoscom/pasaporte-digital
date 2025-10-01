import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Forzar la reproducción del video
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          // Intentar reproducir de nuevo después de un breve delay
          setTimeout(() => {
            video.play().catch(() => {});
          }, 1000);
        }
      };
      
      // Event listeners
      video.addEventListener('loadeddata', playVideo);
      video.addEventListener('canplay', playVideo);
      
      // Intentar reproducir inmediatamente
      playVideo();
      
      return () => {
        video.removeEventListener('loadeddata', playVideo);
        video.removeEventListener('canplay', playVideo);
      };
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full z-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover transition-all duration-500 ${
          isHovered ? 'scale-105 brightness-110' : 'scale-100 brightness-100'
        }`}
        style={{ 
          minHeight: '100vh',
          minWidth: '100vw'
        }}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
        onPlay={() => console.log('Video playing')}
        onError={(e) => {
          console.log('Error loading video:', e);
          console.log('Video src:', e.currentTarget.src);
          console.log('Video error code:', e.currentTarget.error?.code);
        }}
      >
        <source src="/getty-images-1226358300.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay dinámico que se reduce en hover */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isHovered ? 'bg-black/40' : 'bg-black/60'
      }`}></div>
      
      {/* Overlay con gradiente dinámico */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isHovered 
          ? 'bg-gradient-to-b from-black/30 via-black/20 to-black/40' 
          : 'bg-gradient-to-b from-black/50 via-black/30 to-black/60'
      }`}></div>
    </div>
  );
}
