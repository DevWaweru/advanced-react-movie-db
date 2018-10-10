import httpService from "./httpService";
import jwtDecode from 'jwt-decode';
import { apiUrl } from '../config.json';

const apiEndpoint = `${apiUrl}/auth`;

export async function login(email, password){
    const { data: jwt } = await httpService.post(apiEndpoint, { email, password });
    localStorage.setItem("token", jwt);
}
export function loginWithJWT(jwt){
    localStorage.setItem("token", jwt);
}
export function logout(){
    localStorage.removeItem('token');
}

export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem('token');
        return jwtDecode(jwt);
    } catch (ex) {
        return null    
    }
}

export default{
    login,
    loginWithJWT,
    logout,
    getCurrentUser
}