import axios from 'axios';
import { Paper, AnalyticsData } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
const API_URL = `${BASE_URL}/papers`;

export const getPapers = async (filters?: any) => {
    const params = new URLSearchParams();
    if (filters) {
        Object.keys(filters).forEach(key => {
            const val = filters[key];
            if (Array.isArray(val)) {
                val.forEach(v => params.append(key, v));
            } else if (val && val !== 'all') {
                params.append(key, val);
            }
        });
    }
    const response = await axios.get<Paper[]>(`${API_URL}`, { params });
    return response.data;
};

export const createPaper = async (paper: Omit<Paper, 'id' | 'dateAdded' | 'createdAt'>) => {
    const response = await axios.post<Paper>(`${API_URL}`, paper);
    return response.data;
};

export const getAnalytics = async () => {
    const response = await axios.get<AnalyticsData>(`${API_URL}/analytics`);
    return response.data;
};
