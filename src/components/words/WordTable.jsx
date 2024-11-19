import { IoTrashBinOutline } from "react-icons/io5";
import useSpeech from "../../hooks/useSpeech";
import IsLoading from "../common/IsLoading";
import TableCell from "../TableCell";
import SearchWord from "./SearchWord";
import VisibilityToggle from "./VisibilityToggle";
import VoiceSelector from "./VoiceSelector";
import WordActions from "./WordActions";

const WordTable = ({
  words,
  handleDelete,
  handleUpdateWord,
  handleSearch,
  searchQuery,
  loading,
  handleDeleteAll,
  isDeleting,
  toggleVisibility,
}) => {
  const { voices, selectedVoice, setSelectedVoice, speak } = useSpeech();

  return (
    <div className="table-container">
      {/* header ==> search + voice + delete */}
      <div className="item p-1 d-md-flex align-items-center justify-content-between gap-1">
        <SearchWord handleSearch={handleSearch} searchQuery={searchQuery} />
        <VoiceSelector
          voices={voices}
          selectedVoice={selectedVoice}
          setSelectedVoice={setSelectedVoice}
        />
        <IoTrashBinOutline
          className="icon-trash position-relative"
          onClick={handleDeleteAll}
        />
      </div>
      {/* table header  */}
      <div className="table-header mt-2">
        <TableCell title="English Word" />
        <TableCell title="Arabic Word" />
        <TableCell title="Description" className="cell-description" />
      </div>

      {/* table body */}
      <div className="table-body">
        {loading ? (
          <IsLoading />
        ) : (
          <>
            {words.map((word, index) => (
              <div className="table-row" key={index}>
                <div className="table-cell position-relative">
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => speak(word?.wordEnglish)}
                  >
                    {word?.wordEnglish}
                  </p>
                  <WordActions
                    isDeleting={isDeleting}
                    word={word}
                    handleUpdateWord={handleUpdateWord}
                    handleDelete={handleDelete}
                  />
                </div>
                <div className="table-cell position-relative">
                  <p style={{ marginRight: "10px" }}>
                    {word.isArabicVisible ? word.wordArabic : ""}
                    <VisibilityToggle
                      isVisible={word.isArabicVisible}
                      toggleVisibility={() => toggleVisibility(word._id)}
                    />
                  </p>
                </div>
                <div className="table-cell cell-description">
                  <p>{word.description}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WordTable;
