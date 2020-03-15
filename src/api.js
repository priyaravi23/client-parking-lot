const axios = require('axios');
const BASE_URL = 'http://localhost:8000';

export const listSpots = () => {
    return axios({
        url: `${BASE_URL}/entities`,
        method: 'get',
    });
};
export const getSpot = id => {
    return axios({
        url: `${BASE_URL}/entities/${id}`,
        method: 'get',
    });
};
export const createSpot = spot => {
    console.log('making a post request ... ');
    return axios({
        url: `${BASE_URL}/entities`,
        method: 'post',
        data: spot,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
export const updateSpot = spot => {
    return axios({
        url: `${BASE_URL}/entities/${spot.id}`,
        method: 'put',
        data: spot
    });
};
export const deleteSpot = id => {
    return axios({
        url: `${BASE_URL}/entities/${id}`,
        method: 'delete',
    });
};

