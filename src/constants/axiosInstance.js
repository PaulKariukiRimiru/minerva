import axios from 'axios';

export const baseInstance = axios.create({
  baseURL: 'https://www.cryptocompare.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

export const baseImageUrl = 'https://www.cryptocompare.com';