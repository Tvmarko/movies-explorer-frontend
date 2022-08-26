export const apiSettings = {
    BASE_URL: 'http://localhost:3000/',
    MOVIES_URL: 'https://api.nomoreparties.co/beatfilm-movies/',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
}

export function handleRequest(path, parameters) {
    return fetch(`${this._url}${path}`, parameters).then((res) => {
        return (res.ok) ? res.json() : Promise.reject(res.status);
    });
}