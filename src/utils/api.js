import { url, movieUrl } from './constants';

class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include', 
      method: 'GET',    
      headers: this._headers,
    })
      .then(this._handleResponse);
  };

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    })
      .then(this._handleResponse);
  };

  updateUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'email': email,
      })
    })
      .then(this._handleResponse);
  };

  createMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include', 
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        trailerLink: movieData.trailerLink,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
        image: movieUrl + movieData.image.url,
        thumbnail: movieUrl + movieData.image.formats.thumbnail.url,
        movieId: movieData.id.toString(),
      })
    })
      .then(this._handleResponse);
  };

  removeMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      credentials: 'include', 
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse);
  };
}

const api = new Api({
  baseUrl: url,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export { api };