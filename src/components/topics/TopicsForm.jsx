import React from "react";
import LoadingAction from "../common/LoadingAction";

const TopicsForm = ({ formik, editedTopic, loading }) => {
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex justify-content-center flex-column gap-3 px-2 py-5  shadow"
      >
        <h2 className="text-center">{editedTopic ? "Update " : "Add"} Topic</h2>
        <span className="text-center">Enter a topic title and its content</span>
        <textarea
          name="title"
          placeholder="Enter topic title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="3"
          title="Please enter the topic title"
        />
        {formik.touched.title && formik.errors.title && (
          <span className="error text-danger">{formik.errors.title}</span>
        )}

        <textarea
          name="topic"
          placeholder="Enter the topic"
          value={formik.values.topic}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="4"
          title="Please enter the topic content"
        />
        {formik.touched.topic && formik.errors.topic && (
          <span className="error text-danger">{formik.errors.topic}</span>
        )}

        <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
          {loading ? (
            <>
              <LoadingAction />
            </>
          ) : (
            <> {editedTopic ? "Save" : "Add"} Topic</>
          )}
        </button>
      </form>
    </>
  );
};

export default TopicsForm;
