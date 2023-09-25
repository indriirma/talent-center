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

//Get API for Landing Page
export const fetchPopularTags = () => {
  const url = `${API_BASE_URL}/tags-management/popular-tags-option-lists`;
  return axios.get(url);
};

export const fetchSearchTags = async (value) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags-management/tags-option-lists`, { params: { tags: value } });
    return response.data;
  } catch (error) {
    console.error('Error fetching data : ', error);
    throw error;
  }
};

//API for Main Page
export const fetchTalentList = async (currentPage, entries, sortBy) => {
  const url = `${API_BASE_URL}/talent-management/talents`;
  return await axios.get(url, {
    params: {
      sortBy: sortBy,
      size: entries,
      page: currentPage - 1,
    },
  });
};

//API for sidebar Mainpage
export const fetchTalentLevel = () => {
  return axios.get(`${API_BASE_URL}/master-management/talent-level-option-lists`);
};

export const fetchTalentPosition = () => {
  return axios.get(`${API_BASE_URL}/master-management/talent-position-option-lists`);
};

export const fetchSkillSetType = () => {
  return axios.get(`${API_BASE_URL}/master-management/skill-set-type-option-lists`);
};

export const downloadCV = async (talentId) => {
  const url = `${API_BASE_URL}/talent-management/talents/download-cv?talentId=${talentId}`;
  return await axios.post(url, { responseType: 'arraybuffer' });
};

export const fetchDataTalent = async (talentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/talent-management/talents/${talentId}`);
    return await response.data;
  } catch (error) {
    throw error;
  }
};

//API for my wishlist page
export const addToWishlist = async (talentId, userId) => {
  try {
    const dataToSend = {
      talentId: talentId,
      userId: userId,
    };
    const response = await axios.post(`${API_BASE_URL}/talent-management/talents/add-to-list`, dataToSend);
  } catch (error) {
    console.error(error);
  }
};

export const fetchWishlist = async (userId) => {
  return await axios.get(`${API_BASE_URL}/talent-management/wishlists?userId=${userId}`);
};

export const removeWishlist = async (userId, wishlistId) => {
  try {
    const url = `${API_BASE_URL}/talent-management/wishlists/remove`;
    const reqBody = {
      userId: userId,
      wishlistId: wishlistId,
    };
    return await axios.put(url, reqBody);
  } catch (error) {
    console.error(error);
  }
};

export const removeAllWishlist = async (userId) => {
  try {
    return await axios.put(`${API_BASE_URL}/talent-management/wishlists/remove-all?userId=${userId}`);
  } catch (error) {
    console.error(error);
  }
};

export const requestAllWishlist = async (userId, wishlist) => {
  try {
    const url = `${API_BASE_URL}/talent-management/wishlists/request`;
    const reqBody = {
      userId: userId,
      wishlist: wishlist,
    };
    return await axios.post(url, reqBody);
  } catch (error) {
    console.error(error);
  }
};
