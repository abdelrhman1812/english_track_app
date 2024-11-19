import useTopic from "../hooks/useTopic";
import TopicsForm from "./topics/TopicsForm";
import TopicTable from "./topics/TopicTable";

const Topics = () => {
  const {
    isMobile,
    showForm,
    setShowForm,
    formik,
    editedTopic,
    topics,
    handleUpdateTopic,
    handleDeleteTopic,
    loading,
  } = useTopic();

  return (
    <section className="translation-page py-5">
      {/* Button to toggle form visibility on mobile */}
      {isMobile && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-show mb-3"
        >
          {showForm ? "Hide" : "Add Topic"}
        </button>
      )}

      {/* Display the form if showForm is true */}
      {showForm && (
        <TopicsForm
          formik={formik}
          editedTopic={editedTopic}
          loading={loading.submit}
        />
      )}

      {/* Render the list of topics */}
      <TopicTable
        loading={loading.fetch}
        topics={topics}
        handleUpdateTopic={handleUpdateTopic}
        handleDeleteTopic={handleDeleteTopic}
        isDeleted={loading.delete}
      />
    </section>
  );
};

export default Topics;
