import { useEffect, useState } from "react";

const useSpeech = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if (typeof speechSynthesis !== "undefined") {
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();

        // فلترة الأصوات الإنجليزية فقط (مثل en-US و en-GB)
        const englishVoices = availableVoices.filter(
          (voice) => voice.lang === "en-US" || voice.lang === "en-GB"
        );

        // إذا كان هناك أكثر من 4 أصوات إنجليزية، قم بتحديد 4 فقط
        const limitedEnglishVoices = englishVoices.slice(0, 4);

        if (limitedEnglishVoices.length > 0) {
          setVoices(limitedEnglishVoices);
          setSelectedVoice(limitedEnglishVoices[0]); // اختيار أول صوت افتراضي
        } else {
          // في حال لم تجد أصوات إنجليزية، اختر الصوت الأول المتاح
          setVoices(availableVoices);
          setSelectedVoice(availableVoices[0]);
        }
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      console.warn("speechSynthesis is not supported in this environment.");
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
