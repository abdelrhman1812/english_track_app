import { FaClock } from "react-icons/fa";

const Timer = ({ isRecording, recordingTime }) => {
  return (
    <>
      <div className="timer d-flex align-items-center ">
        {isRecording && (
          <>
            <FaClock className="me-1 position-relative" />
            <span> Recording Time: {recordingTime}s</span>
          </>
        )}
      </div>
    </>
  );
};

export default Timer;
