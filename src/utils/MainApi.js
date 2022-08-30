import { apiSettings } from './utils';

class Api {
    constructor(settings) {
        this._baseUrl = settings.BASE_URL;
        this._headers = settings.headers;
      }
    
    _checkErrors(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      };

    login (email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({ 
                "email": email,
                "password": password 
            }),
        })
        .then(this._checkErrors);
    }

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
                }),
        })
        .then(this._checkErrors);
    }

    editProfile(user) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers},
            body: JSON.stringify({
                name: user.name, 
                email: user.email,
            })
          })
          .then(this._checkErrors);
        }

        getProfileInfo() {
            return fetch(`${this._baseUrl}/users/me`, {
              headers: {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers}
          })
          .then(this._checkErrors);
        } 


    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers}
        })
        .then(this._checkErrors);
    }

    addMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers},
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
                movieId: movie.id,
            }),
        })
        .then(this._checkErrors);
    }

    deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/movies${movieId}`, {
            method: 'DELETE',
            headers: {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers}
        })
        .then(this._checkErrors);
    }

    handleLikeMovieStatus(movie, likeMovieStatus) {
        return fetch(`${this._baseUrl}/movies/${movie}/likes`, {
          method: (likeMovieStatus ? 'PUT': 'DELETE'),
          headers: {authorization: `Bearer ${localStorage.getItem('jwt')}`, ...this._headers}
        })
        .then(this._checkErrors);
      }

    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: {authorization: `Bearer ${token}`, ...this._headers}          
        })
        .then(this._checkErrors);
    }
}

export const mainApi = new Api(apiSettings);