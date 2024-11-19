import { FaMicrophone, FaStop } from "react-icons/fa";

const NoteVoiceAction = ({ isRecording, startRecording, stopRecording }) => {
  return (
    <div className="note-voice-action">
      {!isRecording ? (
        <FaMicrophone onClick={startRecording} />
      ) : (
        <FaStop onClick={stopRecording} />
      )}
    </div>
  );
};

export default NoteVoiceAction;
