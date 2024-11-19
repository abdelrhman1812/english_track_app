import IsLoading from "../common/IsLoading";
import SentenceAction from "./SentenceAction";
import VisibilityToggle from "./VisibilityToggle";

const SentenceTable = ({
  sentences,
  handleDeleteSentence,
  toggleVisibility,
  handleSpeak,
  handleUpdateSentence,
  loading,
  isDeleting,
}) => (
  <div className="table-container">
    <div className="table-header">
      <div className="table-cell">English Sentence</div>
      <div className="table-cell">Arabic Sentence</div>
    </div>
    <div className="table-body">
      {loading ? (
        <IsLoading />
      ) : (
        <>
          {sentences.map((sentence) => (
            <div className="table-row" key={sentence._id}>
              <div className="table-cell position-relative">
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSpeak(sentence.sentenceEnglish)}
                >
                  {sentence.sentenceEnglish}
                </p>
                <SentenceAction
                  isDeleting={isDeleting}
                  sentence={sentence}
                  handleUpdateSentence={handleUpdateSentence}
                  handleDeleteSentence={handleDeleteSentence}
                />
              </div>
              <div className="table-cell position-relative">
                {sentence.isArabicVisible ? sentence.sentenceArabic : ""}
                {sentence.sentenceArabic && (
                  <VisibilityToggle
                    isVisible={sentence.isArabicVisible}
                    toggleVisibility={() => toggleVisibility(sentence._id)}
                  />
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  </div>
);

export default SentenceTable;
