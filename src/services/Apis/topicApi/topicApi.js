import clientApi from "../../clientApi";

const getTopics = async () => {
  const response = await clientApi.get("/topics");
  return response;
};

const addTopic = async (values) => {
  const response = await clientApi.post("/topics", values);
  console.log(response);
  return response;
};

const deleteTopic = async (id) => {
  const response = await clientApi.delete(`/topics/${id}`);
  console.log(response);
  return response;
};

const updateTopic = async (id, values) => {
  const response = await clientApi.put(`/topics/${id}`, values);
  console.log(response);
  return response;
};

export { addTopic, deleteTopic, updateTopic };

export default getTopics;
