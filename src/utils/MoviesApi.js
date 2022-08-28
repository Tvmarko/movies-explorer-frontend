import { apiSettings } from './utils';

class Api {
    constructor(MOVIES_URL, headers) {
        this._moviesUrl = MOVIES_URL;
        this._headers = headers;
    }

    _checkErrors(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      };

    getMovies() {
        return fetch(`${ this._moviesUrl}`, {
            headers: {
                ...this._headers,
            }
        })
        .then(this._checkErrors);
    }
}

export const moviesApi = new Api(apiSettings);