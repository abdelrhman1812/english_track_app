import useNotes from "../hooks/useNotes";
import NoteForm from "./notes/NoteForm";
import NoteTable from "./notes/NoteTable";

const Notes = () => {
  const {
    isMobile,
    showForm,
    setShowForm,
    loading,
    formik,
    editedNote,
    notes,
    handleDeleteNote,
    handleUpdateNote,
  } = useNotes();

  return (
    <section className="translation-page py-5">
      {isMobile && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-show mb-3"
        >
          {showForm ? "Hide Form" : "Add Note"}
        </button>
      )}

      {showForm && (
        <NoteForm
          loading={loading.submit}
          formik={formik}
          editedNote={editedNote}
        />
      )}

      <NoteTable
        loading={loading.fetch}
        isDeleted={loading.delete}
        notes={notes}
        handleDeleteNote={handleDeleteNote}
        handleUpdateNote={handleUpdateNote}
      />
    </section>
  );
};

export default Notes;
