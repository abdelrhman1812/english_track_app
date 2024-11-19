import useRecorder from "../../hooks/useRecorder";
import LoadingAction from "../common/LoadingAction";
import NoteVoiceAction from "./NoteVoiceAction";
import Timer from "./Timer";

const NoteForm = ({ loading, formik, editedNote }) => {
  const {
    isRecording,
    audioUrl,
    audioBlob,
    recordingTime,
    startRecording,
    stopRecording,
    setAudioUrl,
    setAudioBlob,
  } = useRecorder();

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.setFieldValue("voiceFile", audioBlob || null);

    formik.handleSubmit();
    setAudioBlob(null);
    setAudioUrl(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center flex-column gap-3 px-2 py-5 shadow"
    >
      <h2 className="text-center">{editedNote ? "Edit " : "Add "} a Note</h2>

      {/* Textarea for the note */}
      <textarea
        name="note"
        placeholder="Enter your note"
        value={formik.values.note}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        rows="4"
        className="w-100 mb-1"
      />
      {formik.touched.note && formik.errors.note && (
        <span className="error text-danger">{formik.errors.note}</span>
      )}

      {/* Audio playback */}
      {audioUrl && (
        <audio controls src={audioUrl}>
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Timer and recording controls */}
      <Timer isRecording={isRecording} recordingTime={recordingTime} />

      <div className="btns d-flex gap-3 align-items-center">
        <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
          {loading ? <LoadingAction /> : <>{editedNote ? "Save" : "Add"}</>}
        </button>

        <NoteVoiceAction
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </div>
    </form>
  );
};

export default NoteForm;
