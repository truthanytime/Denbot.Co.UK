import { apiPost, apiGet, apiPatch, apiDelete } from '../../utils/api';
import { API_URL } from '../constant';

export const createSessionApi = data => apiPost(`${API_URL}session/`, data);

export const updateSessionApi = (id, data) => apiPatch(`${API_URL}session/${id}`, data);

export const getSessionsApi = () => apiGet(`${API_URL}session/`);

export const getSessionApi = id => apiGet(`${API_URL}noSession/details/${id}`);

export const deleteSessionApi = id => apiDelete(`${API_URL}session/${id}`);
