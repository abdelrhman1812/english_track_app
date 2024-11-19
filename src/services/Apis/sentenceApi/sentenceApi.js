import clientApi from "../../clientApi";

const getSentences = async () => {
  const response = await clientApi.get("/sentences");
  //   console.log(response);
  return response;
};

const addSentence = async (values) => {
  const response = await clientApi.post("/sentences", values);
  console.log(response);
  return response;
};

const deleteSentence = async (id) => {
  const response = await clientApi.delete(`/sentences/${id}`);
  console.log(response);
  return response;
};

const updateSentence = async (id, values) => {
  const response = await clientApi.put(`/sentences/${id}`, values);
  console.log(response);
  return response;
};

export { addSentence, deleteSentence, updateSentence };

export default getSentences;
