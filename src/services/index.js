import axios from 'axios';
import { SERVER_URL } from "../config";

export const getData = (data) => {
    const url = `${SERVER_URL}/get_data`;
    return axios.get(url);
};

export const sendFile = (data) => {
    const url = `${SERVER_URL}/upload_contents_file`;
    return axios.post(url, data);
};