import { apiSettings, handleRequest } from './utils';

class Api {
    constructor(options) {
        this._url = options.BASE_URL;
        this._moviesUrl = options.MOVIES_URL;
        this._headers = options.headers;
        this._handleRequest  = handleRequest ;
    }

    login = (email, password) => {
        return this._handleRequest ('signin', {
            method: 'POST',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({ 
                "email": email,
                "password": password 
            }),
        })
    }

    register = (name, email, password) => {
        return this._handleRequest ('signup', {
            method: 'POST',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
                }),
        });
    }

    getUser () {
        return this._handleRequest ('users/me', {
            method: 'GET',
            headers: {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers}
        });
    }
    
    editProfile(user) {
        return this._handleRequest ('users/me', {
            method: 'PATCH',
            headers: {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers},
            body: JSON.stringify({ 
              name: user.name,
              email: user.email
            }) 
        });
    }

    getMovies() {
        return this._handleRequest ('movies', {
            headers: {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers}
        });
    }

    addMovie(movie) {
        return this._handleRequest ('movies', {
            method: 'POST',
            headers: {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers},
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `${this._moviesUrl}${movie.image.url}`,
                trailer: movie.trailerLink,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: `${this._moviesUrl}${movie.image.formats.thumbnail.url}`,
            }),
        });
    }

    deleteMovie(movieId) {
        return this._handleRequest (`movies/${movieId}`, {
            method: 'DELETE',
            headers: {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers}
        });
    }
}

export const mainApi = new Api(apiSettings);