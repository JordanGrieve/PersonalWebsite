import { useRef, useEffect } from "react";

function Background() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Autoplay failed:", err));
    }
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      className="absolute w-full h-full object-cover -z-10"
    >
      <source
        src="/backgrounds/liberty-garden-pokemon.1920x1080.mp4"
        type="video/mp4"
      />
    </video>
  );
}

export default Background;
