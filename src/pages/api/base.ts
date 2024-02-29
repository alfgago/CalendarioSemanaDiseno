import axios from 'axios';

const AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_ACCESS_TOKEN; // Replace with your Airtable API key

export const API = axios.create({
  baseURL: 'https://api.airtable.com/v0/appfjfpAxVBZokAqt/',
  headers: {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`
  }
});