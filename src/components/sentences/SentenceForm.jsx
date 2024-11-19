import LoadingAction from "../common/LoadingAction";

const SentenceForm = ({ formik, editedSentences, loading }) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex justify-content-center flex-column gap-3 px-2 py-5 rounded shadow"
    >
      <h2 className="text-center">
        {editedSentences ? "Edit " : "Add "}
        Sentence
      </h2>

      <input
        type="text"
        name="sentenceEnglish"
        placeholder="Sentence in English"
        value={formik.values.sentenceEnglish}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.errors.sentenceEnglish && formik.touched.sentenceEnglish && (
        <span className="error text-danger">
          {formik.errors.sentenceEnglish}
        </span>
      )}

      <input
        type="text"
        name="sentenceArabic"
        placeholder="Sentence in Arabic"
        value={formik.values.sentenceArabic}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      {formik.errors.sentenceArabic && formik.touched.sentenceArabic && (
        <span className="error text-danger">
          {formik.errors.sentenceArabic}
        </span>
      )}

      <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
        {loading ? <LoadingAction /> : <>{editedSentences ? "Save" : "Add"}</>}
      </button>
    </form>
  );
};

export default SentenceForm;
