import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import notify from "../lib/notify";
import getSentences, {
  addSentence,
  deleteSentence,
  updateSentence,
} from "../services/Apis/sentenceApi/sentenceApi";
import useResponsive from "./useResponsive";

const useSentence = () => {
  const { isMobile, showForm, setShowForm } = useResponsive();
  const [sentences, setSentences] = useState([]);
  const [editedSentences, setEditedSentences] = useState(null);
  const [loading, setLoading] = useState({
    fetch: false,
    submit: false,
    delete: false,
  });

  const [error, setError] = useState(null);

  /* ========== Validation ========== */
  const validationSchema = useMemo(() => {
    return Yup.object({
      sentenceEnglish: Yup.string()
        .min(2, "The sentence English must be at least 2 characters long.")
        .max(30, "The sentence English must be at most 30 characters long")
        .required("Sentence English is required."),
      sentenceArabic: Yup.string()
        .min(2, "The sentence Arabic must be at least 2 characters long.")
        .max(30, "The sentence Arabic must be at most 30 characters long."),
    });
  }, []);

  const handleGetSentences = async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    setError(null);
    try {
      const { data } = await getSentences();
      setSentences(data?.sentences);
    } catch (error) {
      console.error("Error fetching sentences:", error);
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  const handleAddSentence = async (values) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);
    try {
      const { data } = await addSentence(values);
      if (data.success) {
        notify("success", "Sentence added successfully");
        setSentences((prevSentences) => [...prevSentences, data.sentence]);
        formik.resetForm();
        if (window.innerWidth <= 991) {
          setShowForm(false);
        }
      }
    } catch (error) {
      console.error("Error while adding sentence: ", error);
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  /* ========== Delete Sentence ========== */
  const handleDeleteSentence = async (id) => {
    setLoading((prev) => ({ ...prev, delete: id }));
    try {
      const { data } = await deleteSentence(id);
      if (data.success) {
        notify("success", "Sentence deleted successfully");
        setSentences((prevSentences) =>
          prevSentences.filter((sentence) => sentence._id !== id)
        );
      }
    } catch (error) {
      console.error("Error while deleting sentence: ", error);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  /* ========== Edit Sentence ========== */
  const handleUpdateSentence = async (sentence) => {
    setEditedSentences(sentence);
    formik.setValues({
      sentenceEnglish: sentence.sentenceEnglish,
      sentenceArabic: sentence.sentenceArabic,
    });
    if (window.innerWidth <= 991) {
      setShowForm(true);
    }
  };

  const handleSaveUpdateSentence = async (values) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);
    try {
      const { data } = await updateSentence(editedSentences._id, values);
      console.log(data);
      if (data.success) {
        notify("success", "Sentence updated successfully");
        formik.resetForm();
        setSentences((prevSentences) =>
          prevSentences.map((sentence) =>
            sentence._id === editedSentences._id ? data.sentence : sentence
          )
        );
        if (window.innerWidth <= 991) {
          setShowForm(false);
        }
        setEditedSentences(null);
      }
    } catch (error) {
      console.error("Error while updating sentence: ", error);
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  /* ========== Formik Config ========== */
  const formik = useFormik({
    initialValues: {
      sentenceEnglish: "",
      sentenceArabic: "",
    },
    validationSchema,
    onSubmit: editedSentences ? handleSaveUpdateSentence : handleAddSentence, // Fixed typo
  });

  useEffect(() => {
    handleGetSentences();
  }, []);

  return {
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
  };
};

export default useSentence;
