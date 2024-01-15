import axios from 'axios';

export const postChatbotPrompt = async (payload) => {
    const response = await axios.post(`http://127.0.0.1:8000/api/validate/`, payload);
    // const response = await axios.post(`${process.env.REACT_APP_VALIDATION_BASE_URL}/api/account/profile/`, payload);
    return response;
}