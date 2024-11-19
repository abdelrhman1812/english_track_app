import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import notify from "../lib/notify";
import getTopics, {
  addTopic,
  deleteTopic,
  updateTopic,
} from "../services/Apis/topicApi/topicApi";
import useResponsive from "./useResponsive";

const useTopic = () => {
  const { isMobile, showForm, setShowForm } = useResponsive();
  const [loading, setLoading] = useState({
    fetch: false,
    submit: false,
    delete: null,
  });
  const [error, setError] = useState(null);

  const [topics, setTopics] = useState([]);
  const [editedTopic, setEditedTopic] = useState(null);

  /* ========== Form Validation ========== */
  const validationSchema = useMemo(
    () =>
      Yup.object({
        title: Yup.string()
          .min(3, "The title must be at least 3 characters long.")
          .required("Please enter the title."),
        topic: Yup.string()
          .min(3, "The topic must be at least 3 characters long.")
          .required("Please enter a topic."),
      }),
    []
  );

  /* ========== Get Topics ========== */
  const handleGetTopics = useCallback(async () => {
    setLoading({ ...loading, fetch: true });
    try {
      const { data } = await getTopics();
      setTopics(data?.topics || []);
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setLoading({ ...loading, fetch: false });
    }
  }, []);

  /* ========== Handle deleting a topic ========== */

  const handleDeleteTopic = async (id) => {
    setLoading((prev) => ({ ...prev, delete: id }));
    try {
      const { data } = await deleteTopic(id);
      console.log(data);
      if (data.success) {
        notify("success", "Note deleted successfully");
        setTopics((prevTopics) =>
          prevTopics.filter((topic) => topic._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
    } finally {
      setLoading((prev) => ({ ...prev, delete: null }));
    }
  };

  /* ========== Handle adding a topic ========== */
  const handleAddTopic = async (values) => {
    setLoading((prev) => ({ ...prev, submit: true }));

    try {
      const { data } = await addTopic(values);
      if (data.success) {
        notify("success", "Topic added successfully");
        setTopics((prev) => {
          return [...prev, data.topic];
        });
        formik.resetForm();
        if (isMobile) {
          setShowForm(false);
        }
      }
    } catch (error) {
      console.error("Error adding topic:", error);
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  /* ========== Handle updating a topic ========== */
  const handleUpdateTopic = (topic) => {
    setEditedTopic(topic);
    formik.setValues({
      title: topic.title,
      topic: topic.topic,
    });
    if (isMobile) {
      setShowForm(true);
    }
  };

  /* ========== Edit a topic  ========== */
  const handleEditTopic = async (values) => {
    setLoading((prev) => ({ ...prev, submit: true }));
    try {
      const { data } = await updateTopic(editedTopic._id, values);
      if (data.success) {
        notify("success", "Topic updated successfully");
        setTopics((prevTopics) =>
          prevTopics.map((topic) =>
            topic._id === editedTopic._id ? data?.topic : topic
          )
        );
        formik.resetForm();
        setEditedTopic(null);
        if (isMobile) {
          setShowForm(false);
        }
      } else {
        notify("error", "Failed to update topic. Please try again.");
      }
    } catch (error) {
      console.error("Error updating topic:", error);
      notify("error", "An error occurred while updating the topic.");
    } finally {
      setLoading((prev) => ({ ...prev, submit: false }));
    }
  };

  /* ========== Formik ========== */
  const formik = useFormik({
    initialValues: {
      title: "",
      topic: "",
    },
    validationSchema,
    onSubmit: editedTopic ? handleEditTopic : handleAddTopic,
  });

  useEffect(() => {
    handleGetTopics();
  }, [handleGetTopics]);

  return {
    isMobile,
    showForm,
    setShowForm,
    formik,
    editedTopic,
    topics,
    handleUpdateTopic,
    handleDeleteTopic,
    loading,
  };
};

export default useTopic;
