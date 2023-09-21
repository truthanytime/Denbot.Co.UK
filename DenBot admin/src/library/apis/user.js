import { apiGet, apiPatch, apiPost } from '../../utils/api';
import { API_URL } from '../constant';

export const createUserApi = data => apiPost(`${API_URL}user`, data);

export const listUserApi = (type, options) => apiGet(`${API_URL}user/all/${type}`, options);

export const editUserApi = profileId => apiGet(`${API_URL}user/${profileId}`);

export const updateUsersApi = (profileId, data) => apiPatch(`${API_URL}user/${profileId}`, data);