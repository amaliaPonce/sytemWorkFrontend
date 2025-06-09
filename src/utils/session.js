export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem('session')) || null;
  } catch (e) {
    console.error('Error parsing session from localStorage', e);
    return null;
  }
};

export const setSession = (sessionData) => {
  localStorage.setItem('session', JSON.stringify(sessionData));
};

export const clearSession = () => {
  localStorage.removeItem('session');
};
