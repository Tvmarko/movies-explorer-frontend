import { apiSettings, handleRequest } from './utils';

class Api {
    constructor(options) {
        this._url = options.MOVIES_URL;
        this._headers = options.headers;
        this._handleRequest = handleRequest;
    }

    getMovies() {
        return this._handleRequest('', {
            headers: {
                ...this._headers,
            }
        });
    }
}

export const moviesApi = new Api(apiSettings);