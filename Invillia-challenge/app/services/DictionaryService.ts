import axios from 'axios';

const BaseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export const fetchWord = async (word: string) => {
  try {
    const {data} = await axios.get(`${BaseURL}/${word}`);
    return data;
  } catch (error) {
    console.log('error fetching word', error);
    throw new Error('An error occurred when searching for words in the API');
  }
};
