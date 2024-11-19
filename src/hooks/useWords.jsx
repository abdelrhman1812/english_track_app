import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import notify from "../lib/notify";
import getWords, {
  addWord,
  deleteAllWord,
  deleteWord,
  updateWord,
} from "../services/Apis/words/wordsApi";
import useResponsive from "./useResponsive";

const useWords = () => {
  const [words, setWords] = useState([]);
  const [editingWord, setEditingWord] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { isMobile, showForm, setShowForm } = useResponsive();

  const [loading, setLoading] = useState({
    fetch: false,
    submit: false,
    delete: false,
  });
  const [error, setError] = useState(null);

  /* ================= Get all words ================= */
  const getAllWords = useCallback(async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    setError(null);
    try {
      const { data } = await getWords();
      setWords(data?.words || []);
    } catch (err) {
      setError("Failed to fetch words.");
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  }, []);

  /* ================= Handle deleting a word ================= */
  const handleDelete = async (id) => {
    setLoading((prev) => ({ ...prev, delete: id }));

    try {
      const { data } = await deleteWord(id);
      if (data.success) {
        notify("success", "Word deleted successfully");
        setWords((prevWords) => prevWords.filter((word) => word._id !== id));
      }
    } catch (err) {
      setError("Failed to delete the word.");
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  /* ================= Handle deleting all words ================= */
  const handleDeleteAll = async () => {
    try {
      await deleteAllWord();
      await getAllWords();
    } catch (err) {
      setError("Failed to delete the word.");
    }
  };

  /* ================= Handle adding a word ================= */
  const handleAddWord = async (values) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);
    try {
      const { data } = await addWord(values);
      if (data.success) {
        notify("success", "Word added successfully");
        setWords((prevWords) => [...prevWords, data.word]);
        formik.resetForm();

        if (window.innerWidth <= 991) {
          setShowForm(false);
        }
      }
    } catch (err) {
      setError("Failed to add the word.");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  /* ================= Handle updating a word ================= */

  const handleUpdateWord = async (word) => {
    setEditingWord(word);
    formik.setValues({
      wordArabic: word.wordArabic,
      wordEnglish: word.wordEnglish,
      description: word.description,
    });

    console.log(isMobile);

    if (isMobile) setShowForm(true);
  };

  /* ================= Handle submitting an update ================= */
  const handleSaveUpdate = async (values) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);
    try {
      const { data } = await updateWord(editingWord._id, values);
      if (data.success) {
        notify("success", "Word updated successfully");
        setWords((prevWords) =>
          prevWords.map((word) =>
            word._id === editingWord._id ? { ...word, ...values } : word
          )
        );
        formik.resetForm();
        setEditingWord(null);
        if (window.innerWidth <= 991) setShowForm(false);
      }
    } catch (err) {
      setError("Failed to update the word.");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value === "") {
      await getAllWords();
    } else {
      const filtered = words.filter(
        (word) =>
          word.wordEnglish
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          word.wordArabic
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
      );
      setWords(filtered);
    }
  };

  const validationSchema = useMemo(() => {
    return Yup.object({
      wordArabic: Yup.string().min(1).optional(),
      wordEnglish: Yup.string()
        .min(1, "English word must be at least 1 character long.")
        .max(20, "English word must not exceed 50 characters.")
        .required("Please enter the word in English."),
      description: Yup.string().min(5).optional(),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      wordArabic: "",
      wordEnglish: "",
      description: "",
    },
    validationSchema,
    onSubmit: editingWord ? handleSaveUpdate : handleAddWord,
  });
  useEffect(() => {
    getAllWords();
  }, [getAllWords]);

  return {
    words,
    loading,
    error,
    editingWord,
    setEditingWord,
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
  };
};

export default useWords;
