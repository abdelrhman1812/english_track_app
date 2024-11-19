import { FaSpinner, FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

const SentenceAction = ({
  sentence,
  handleDeleteSentence,
  handleUpdateSentence,
  isDeleting,
}) => {
  return (
    <>
      <FaPenToSquare
        size={15}
        className="position-absolute top-0 end-0 m-1"
        onClick={() => handleUpdateSentence(sentence)}
      />
      {isDeleting === sentence._id ? (
        <FaSpinner
          size={15}
          className="spinner position-absolute bottom-0 end-0 m-1"
        />
      ) : (
        <FaTrash
          className=" position-absolute bottom-0 end-0 m-1"
          size={15}
          onClick={() => handleDeleteSentence(sentence._id)}
        />
      )}
    </>
  );
};

export default SentenceAction;
