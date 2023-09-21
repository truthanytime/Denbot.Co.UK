import { apiPost, apiPatch } from '../../utils/api';
import { API_URL } from '../constant';

export const loginApi = data => apiPost(`${API_URL}auth/login`, data);

export const forgetPassword = (email) => apiPost(`${API_URL}auth/forgotPassword`, email);

export const resetPassword = (password, header) =>  apiPatch(`${API_URL}user/resetPassword`, password, header);
   
