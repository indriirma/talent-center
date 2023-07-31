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
