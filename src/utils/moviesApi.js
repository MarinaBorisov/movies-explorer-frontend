import { movieUrl } from './constants';

class MoviesApi {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
  }

  getAllMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
    })
      .then(response => this._getResponseData(response));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: movieUrl,
});

export { moviesApi };