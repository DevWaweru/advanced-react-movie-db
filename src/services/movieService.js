import httpService from "./httpService";
import { apiUrl } from '../config.json';

function movieUrl(id){
    return `${apiUrl}/movies/${id}`;
}
export function getMovies() {
    return httpService.get(`${apiUrl}/movies`);
}

export function getMovie(id) {
    return httpService.get(movieUrl(id));
}

export function saveMovie(movie) {
    if (movie._id){
        const body = { ...movie };
        delete body._id;
        return httpService.put(movieUrl(movie._id), body);
    }
    return httpService.post(`${apiUrl}/movies`, movie)
}

export function deleteMovie(id) {
    return httpService.delete(movieUrl(id));
}