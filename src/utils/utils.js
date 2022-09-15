export const apiSettings = {
    BASE_URL:  `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
    MOVIES_URL: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
}

