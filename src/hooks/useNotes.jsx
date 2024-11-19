import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import notify from "../lib/notify";
import getNotes, {
  addNote,
  deleteNote,
  updateNote,
} from "../services/Apis/note/notesApi";
import useRecorder from "./useRecorder";
import useResponsive from "./useResponsive";

const useNotes = () => {
  const { setAudioUrl, setAudioBlob } = useRecorder();
  const { isMobile, showForm, setShowForm } = useResponsive();
  const [notes, setNotes] = useState([]);
  const [editedNote, setEditedNote] = useState(null);
  const [loading, setLoading] = useState({
    fetch: false,
    submit: false,
    delete: null,
  });

  const [error, setError] = useState(null);

  /* ========== Form Validation ========== */
  const validationSchema = useMemo(
    () =>
      Yup.object({
        note: Yup.string()
          .min(2, "The note must be at least 2 characters long.")
          .required("Please enter a note."),
      }),
    []
  );

  /* ========== Get Notes ========== */
  const handleGetNote = useCallback(async () => {
    setLoading({ ...loading, fetch: true });
    setError(null);
    try {
      const { data } = await getNotes();
      setNotes(data?.notes || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading({ ...loading, fetch: false });
    }
  }, []);

  /* ========== Delete Note ========== */
  const handleDeleteNote = async (id) => {
    setLoading((prev) => ({ ...prev, delete: id }));

    try {
      const { data } = await deleteNote(id);
      if (data.success) {
        notify("success", "Note deleted successfully");
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      }
    } catch (error) {
      console.error("Error while deleting note:", error);
      setError("Failed to delete note.");
    } finally {
      setLoading((prev) => ({ ...prev, delete: null })); // Reset loading
    }
  };

  /* ========== Add Note  ========== */
  const handleAddNote = async (values) => {
    const formData = new FormData();
    formData.append("note", values.note);
    if (values.voiceFile) {
      formData.append("voice", values.voiceFile);
    }

    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);
    try {
      const { data } = await addNote(formData);
      if (data.success) {
        notify("success", "Note added successfully");
        formik.resetForm();

        setNotes((prevNotes) => {
          return [...prevNotes, data.note];
        });
      }
      if (isMobile) {
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error while adding note:", error);
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  /* ========== Update Note  ========== */
  const handleUpdateNote = (note) => {
    setEditedNote(note);
    formik.setFieldValue("note", note?.note);
    if (isMobile) {
      setShowForm(true);
    }
  };

  /* ========== Edit Note  ========== */
  const handleEditNote = async (values) => {
    const formData = new FormData();
    formData.append("note", values.note);
    if (values.voiceFile) {
      formData.append("voice", values.voiceFile);
    }

    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);

    try {
      const { data } = await updateNote(editedNote._id, formData);

      if (data.success) {
        notify("success", "Note updated successfully");

        formik.resetForm();

        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === editedNote._id ? data?.note : note
          )
        );

        setEditedNote(null);

        if (isMobile) {
          setShowForm(false);
        }
      } else {
        setError("Failed to update note.");
      }
    } catch (error) {
      console.error("Error while updating note:", error);
      setError("An error occurred while updating the note.");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  /* ========== Formik  ========== */
  const formik = useFormik({
    initialValues: { note: "", voiceFile: null },
    validationSchema,
    onSubmit: editedNote ? handleEditNote : handleAddNote,
  });
  /* ========== Effects  ========== */
  useEffect(() => {
    handleGetNote();
  }, [handleGetNote]);

  return {
    isMobile,
    showForm,
    setShowForm,
    loading,
    formik,
    editedNote,
    notes,
    handleDeleteNote,
    handleUpdateNote,
  };
};

export default useNotes;
