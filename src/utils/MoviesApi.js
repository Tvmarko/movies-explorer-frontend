import { apiSettings } from './utils';

class Api {
    constructor(settings) {
        this._moviesUrl = settings.MOVIES_URL;
        this._headers = settings.headers;
    }

    _checkErrors(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      };

    getMovies() {
        return fetch(this._moviesUrl, {
            headers: {
                ...this._headers,
            }
        })
        .then(this._checkErrors);
    }
}

export const moviesApi = new Api(apiSettings);