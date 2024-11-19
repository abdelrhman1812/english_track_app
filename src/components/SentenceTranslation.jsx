import useSentence from "../hooks/useSentence";
import SentenceForm from "./sentences/SentenceForm";
import SentenceTable from "./sentences/SentenceTable";

const SentenceTranslation = () => {
  const {
    isMobile,
    showForm,
    setShowForm,
    loading,
    formik,
    editedSentences,
    sentences,
    handleDeleteSentence,
    handleUpdateSentence,
    setSentences,
  } = useSentence();

  const toggleVisibility = (id) => {
    setSentences((prevSentences) =>
      prevSentences.map((sentence) =>
        sentence._id === id
          ? { ...sentence, isArabicVisible: !sentence.isArabicVisible }
          : sentence
      )
    );
  };

  return (
    <section className="translation-page py-5">
      {isMobile && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-show mb-3"
        >
          {showForm ? "Hide Form" : "Add Sentence"}
        </button>
      )}

      {showForm && (
        <SentenceForm
          loading={loading.submit}
          formik={formik}
          editedSentences={editedSentences}
        />
      )}

      <SentenceTable
        loading={loading.fetch}
        sentences={sentences}
        handleDeleteSentence={handleDeleteSentence}
        handleUpdateSentence={handleUpdateSentence}
        toggleVisibility={toggleVisibility}
        isDeleting={loading.delete}
      />
    </section>
  );
};

export default SentenceTranslation;
