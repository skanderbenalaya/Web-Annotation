import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getQuestion = () => api.get(`/question`);

export const getTopics = () => api.get(`/topic`);

export const getTopicAnswers = (topic) => api.get(`/answer/topic/${topic}`);

export const ignoreQuestion = id => api.post(`/question/ignore/${id}`);

export const validateQuestion = id => api.post(`/question/validated/${id}`);

export const insertQuestion = (id, payload) => api.post(`/answer/question/${id}`,payload);

// export const insertQuestion = payload => api.post(`/question`, payload)
// export const getAllQuestions = () => api.get(`/questions`)
// export const updateQuestionById = (id, payload) => api.put(`/question/${id}`, payload)
// export const deleteQuestionById = id => api.delete(`/question/${id}`)
// export const getQuestionById = id => api.get(`/question/${id}`)

const apis = {
  getQuestion,
  getTopics,
  getTopicAnswers,

  // insertQuestion,
  // getAllQuestions,
  // updateQuestionById,
  // deleteQuestionById,
  // getQuestionById,
};

export default apis;
