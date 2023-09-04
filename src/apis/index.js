import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const USERS = {
  'USER_DUMMY::ADMIN': {
    username: 'USER_DUMMY::ADMIN',
    password: 'ADMIN',
    grants: [
      {
        name: 'ADMIN',
      },
    ],
  },
};

export const login = ({ username, password }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const user = USERS[username];
      if (user?.password === password) resolve(USERS[username]);
      else throw new Error(`Unknown user: { ${username} }. Please use { username: "USER_DUMMY::ADMIN", password: "ADMIN" }`);
    }, 250);
  });

export const logout = (payload) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, 125);
  });

export const fetchPopularTags=()=>{
  const url = `${API_BASE_URL}/tags-management/popular-tags-option-lists`;
  return axios.get(url);
};

export const fetchSearchTags = async(value)=>{
  try{
    const response = await axios.get(`${API_BASE_URL}/tags-management/tags-option-lists`,
    {params:{tags:value}});
    return response.data;
  } catch(error)
  {
    console.error('Error fetching data : ',error);
    throw error;
  }
};
