import useWords from "../hooks/useWords";
import FormWords from "./words/FormWords";
import WordTable from "./words/WordTable";

const WordTranslation = () => {
  const {
    words,
    loading,
    editingWord,
    handleAddWord,
    handleUpdateWord,
    handleDelete,
    handleDeleteAll,
    handleSearch,
    handleSaveUpdate,
    setWords,
    formik,
    showForm,
    setShowForm,
    isMobile,
    searchQuery,
  } = useWords();

  const toggleVisibility = (id) => {
    setWords((prevWords) =>
      prevWords.map((word) =>
        word._id === id
          ? { ...word, isArabicVisible: !word.isArabicVisible }
          : word
      )
    );
  };

  return (
    <section className="translation-page py-5">
      {isMobile && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-show top-0 position-absolute"
        >
          {showForm ? "Hide Form" : "Add Word"}
        </button>
      )}

      {showForm && (
        <FormWords
          handleAddWord={handleAddWord}
          handleSaveUpdate={handleSaveUpdate}
          editingWord={editingWord}
          formik={formik}
          loading={loading.submit}
        />
      )}

      <WordTable
        handleDeleteAll={handleDeleteAll}
        loading={loading.fetch}
        words={words}
        handleDelete={handleDelete}
        handleUpdateWord={handleUpdateWord}
        toggleVisibility={toggleVisibility}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        isDeleting={loading.delete}
      />
    </section>
  );
};

export default WordTranslation;
