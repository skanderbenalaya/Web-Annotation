import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getQuestion = () => api.get(`/question`);

export const getCount = () => api.get(`/question/count`);

export const getTopics = () => api.get(`/topic`);

export const getTopicAnswers = (topic) => api.get(`/answer/topic/${topic}`);

export const ignoreQuestion = (id) => api.put(`/question/ignore/${id}`);

export const validateQuestion = (id) => api.put(`/question/validate/${id}`);

export const insertQuestion = (id, payload) => api.put(`/answer/question/${id}`, payload);

// export const insertQuestion = payload => api.post(`/question`, payload)
// export const getAllQuestions = () => api.get(`/questions`)
// export const updateQuestionById = (id, payload) => api.put(`/question/${id}`, payload)
// export const deleteQuestionById = id => api.delete(`/question/${id}`)
// export const getQuestionById = id => api.get(`/question/${id}`)

const apis = {
  getQuestion,
  getCount,
  getTopics,
  getTopicAnswers,
  ignoreQuestion,
  validateQuestion,
  insertQuestion,
  // getAllQuestions,
  // updateQuestionById,
  // deleteQuestionById,
  // getQuestionById,
};

export default apis;
