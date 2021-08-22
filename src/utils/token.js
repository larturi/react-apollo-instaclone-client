import jwtDecode from 'jwt-decode';
import { TOKEN } from './constants';

export const setToken = (token) => {
   localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
   return localStorage.getItem(TOKEN);
};

export const decodeToken = (token) => {
   try {
      const tokenDecoded = jwtDecode(token);
      return tokenDecoded;
   } catch (error) {
      return null;
   }
};

export const removeToken = () => {
   localStorage.removeItem(TOKEN);
};
