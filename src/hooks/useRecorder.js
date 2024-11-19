import { useState } from "react";

const useRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          recorder.start();
          setIsRecording(true);
          setRecordingTime(0);
          setAudioUrl(null);

          const id = setInterval(() => {
            setRecordingTime((prev) => prev + 1);
          }, 1000);
          setTimerId(id);

          let chunks = [];
          recorder.ondataavailable = (event) => {
            chunks.push(event.data);
          };

          recorder.onstop = () => {
            clearInterval(timerId);
            const audioBlob = new Blob(chunks, { type: "audio/wav" });
            setAudioBlob(audioBlob);
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
          };
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      clearInterval(timerId);
    }
  };

  return {
    isRecording,
    audioUrl,
    audioBlob,
    recordingTime,
    startRecording,
    stopRecording,
  };
};

export default useRecorder;
