import { useEffect, useState } from "react";

const useSpeech = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if (typeof speechSynthesis !== "undefined") {
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
          setSelectedVoice(availableVoices[0]);
        }
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;

      if (!speechSynthesis.getVoices().length) {
        setVoices([{ name: "Default Voice", lang: "en-US" }]);
        setSelectedVoice({ name: "Default Voice", lang: "en-US" });
      }
    } else {
      console.warn("speechSynthesis is not supported in this environment."); // تحذير إذا كانت غير مدعومة
    }
  }, []);

  const speak = (text) => {
    if (selectedVoice && typeof speechSynthesis !== "undefined") {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      speechSynthesis.speak(utterance);
    } else {
      console.warn(
        "No voice selected or available, or speechSynthesis is not supported."
      );
    }
  };

  return { voices, selectedVoice, setSelectedVoice, speak };
};

export default useSpeech;
