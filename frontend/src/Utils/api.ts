import axios from 'axios';
import { QueryResult, useQuery } from 'react-query';
import config from './config';
import { Activite, CentreServiceScolaire } from '../../../common/src/schemas';

const api = axios.create({
    baseURL: config.API_URL,
    responseType: 'json',
});

export default api;

export function useActivites(): QueryResult<Activite[]> {
    return useQuery('activites', async () => {
        const { data } = await api.get('/activites');
        return data;
    });
}

export function useCentresService(): QueryResult<CentreServiceScolaire[]> {
    return useQuery('centres-service-scolaire', async () => {
        const { data } = await api.get('/centres-service-scolaire');
        return data;
    });
}
