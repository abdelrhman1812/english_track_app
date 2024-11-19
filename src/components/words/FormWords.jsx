import LoadingAction from "../common/LoadingAction";

const FormWords = ({
  editingWord,

  formik,
  loading,
}) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex justify-content-center flex-column gap-3 px-2 py-5  shadow"
    >
      <h2 className="text-center">
        {editingWord ? "Update the word" : "Enter the word"}
      </h2>
      <div className="input-item ">
        <div className="item w-100 p-1">
          <input
            type="text"
            name="wordEnglish"
            placeholder="English word"
            value={formik.values.wordEnglish}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.wordEnglish && formik.errors.wordEnglish && (
            <span className="error d-block text-danger">
              {formik.errors.wordEnglish}
            </span>
          )}
        </div>
        <div className="item w-100 p-1">
          <input
            type="text"
            name="wordArabic"
            placeholder="Arabic word"
            value={formik.values.wordArabic}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.wordArabic && formik.errors.wordArabic && (
            <span className="error text-danger d-block">
              {formik.errors.wordArabic}
            </span>
          )}
        </div>
      </div>
      <div className="input-item ">
        <div className="item w-100 p-1">
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <span className="error text-danger d-block">
              {formik.errors.description}
            </span>
          )}
        </div>
      </div>
      <button type="submit" disabled={!(formik.isValid && formik.dirty)}>
        {loading ? <LoadingAction /> : editingWord ? "Save Changes" : "Add"}
      </button>
    </form>
  );
};

export default FormWords;
