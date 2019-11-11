import axios from 'axios';

export const imgur = axios.create({
  baseURL: "https://api.imgur.com/3/"
})