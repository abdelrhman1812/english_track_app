import clientApi from "../../clientApi";

const getWords = async () => {
  const response = await clientApi.get("/words");
  //   console.log(response);
  return response;
};

const addWord = async (values) => {
  const response = await clientApi.post("/words", values);
  //   console.log(response);
  return response;
};

const deleteWord = async (id) => {
  const response = await clientApi.delete(`/words/${id}`);
  console.log(response);
  return response;
};

const deleteAllWord = async () => {
  const response = await clientApi.delete(`/words/`);
  console.log(response);
  return response;
};

const updateWord = async (id, values) => {
  const response = await clientApi.put(`/words/${id}`, values);
  console.log(response);
  return response;
};

export { addWord, deleteAllWord, deleteWord, updateWord };

export default getWords;
