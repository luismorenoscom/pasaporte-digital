import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IntroLoader } from "../components/IntroLoader";

export default function IntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // nada aquí; IntroLoader llama onFinish cuando termina
  }, []);

  return (
    <IntroLoader
      videoSrc={`/intro.mp4?v=${Date.now()}`}
      logoSrc="/logo-ironman-pasaporte.png"
      maxDurationMs={10000}
      onFinish={() => navigate("/auth", { replace: true })}
    />
  );
}


