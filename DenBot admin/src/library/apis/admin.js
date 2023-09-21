import { apiPost, apiGet } from '../../utils/api';
import { API_URL } from '../constant';

export const getZapierUrlApi = () => apiGet(`${API_URL}admin/getZapierUrl`);

export const setZapierUrlApi = (data) => apiPost(`${API_URL}admin/setZapierUrl`, data);
