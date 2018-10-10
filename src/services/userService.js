import httpService from "./httpService";

const apiEndpoint = `/users`;

export function register(user){
    return httpService.post(apiEndpoint, {
        email: user.email,
        password: user.password,
        name: user.username
    })
}