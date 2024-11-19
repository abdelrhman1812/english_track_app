import { FaSpinner, FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

const TopicsAction = ({
  handleDeleteTopic,
  handleUpdateTopic,
  topic,
  isDeleted,
}) => {
  return (
    <>
      <FaPenToSquare
        onClick={() => handleUpdateTopic(topic)}
        size={15}
        className="topic-action top-0 end-0 m-1"
      />

      {isDeleted === topic._id ? (
        <FaSpinner
          size={15}
          className="spinner topic-action bottom-0 end-0 m-1"
        />
      ) : (
        <FaTrash
          onClick={() => handleDeleteTopic(topic._id)}
          size={15}
          className="topic-action bottom-0 end-0 m-1"
        />
      )}
    </>
  );
};

export default TopicsAction;
