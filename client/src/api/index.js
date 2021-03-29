import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const getQuestion = () => api.get(`/question`)

export const getTopics = () => api.get(`/topic`)

// export const getAllAnswers = T_id => api.get(`/answers/${T_id}`)

// export const insertQuestion = payload => api.post(`/question`, payload)
// export const getAllQuestions = () => api.get(`/questions`)
// export const updateQuestionById = (id, payload) => api.put(`/question/${id}`, payload)
// export const deleteQuestionById = id => api.delete(`/question/${id}`)
// export const getQuestionById = id => api.get(`/question/${id}`)

const apis = {
    getQuestion,
    getTopics,
    // getAllAnswers,

    // insertQuestion,
    // getAllQuestions,
    // updateQuestionById,
    // deleteQuestionById,
    // getQuestionById,
}

export default apis