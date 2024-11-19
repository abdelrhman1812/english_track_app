import clientApi from "../../clientApi";

const getNotes = async () => {
  const response = await clientApi.get("/notes");
  return response;
};

const addNote = async (values) => {
  const response = await clientApi.post("/notes", values);
  console.log(response);
  return response;
};

const deleteNote = async (id) => {
  const response = await clientApi.delete(`/notes/${id}`);
  console.log(response);
  return response;
};

const updateNote = async (id, values) => {
  const response = await clientApi.put(`/notes/${id}`, values);
  console.log(response);
  return response;
};

export { addNote, deleteNote, updateNote };

export default getNotes;
