import { apiGet, apiPatch, apiPost } from '../../utils/api';
import { API_URL } from '../constant';

export const createPaymentIntent = data => apiPost(`${API_URL}payment/createPaymentIntent`, data);
