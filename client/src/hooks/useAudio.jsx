import { useEffect } from "react";

const audio = new Audio("/bruh.mp3");
audio.loop = true;

const useAudio = isRinging => {
  useEffect(() => {
    if (isRinging) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isRinging]);
};

export default useAudio;
