export default class Api {

  constructor({ url, headers }) {
      this._url = url;
      this._headers = headers;
  }

  getUserInfo() {
      return fetch(`${this._url}/users/me`, {
          method: 'GET',
          headers: this._headers,
      })
      .then(this._checkResponse)
  }

  getInitialCards() {
      return fetch(`${this._url}/cards`, {
          method: 'GET',
          headers: this._headers,
      })
      .then(this._checkResponse)
  }

  editProfile(data) {
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              name: data.name,
              about: data.description
          })
      })
      .then(this._checkResponse)
  }

  addNewElement(cardData) {
      return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
              name: cardData.elementTitle,
              link: cardData.elementLink
          })
      })
      .then(this._checkResponse)
  }

  deleteElement(id) {
      return fetch(`${this._url}/cards/${id}`, {
          method: 'DELETE',
          headers: this._headers,
      })
      .then(this._checkResponse)
  }

  setLike(id) {
      return fetch(`${this._url}/cards/${id}/likes`, {
          method: 'PUT',
          headers: this._headers,
      })
      .then(this._checkResponse)
  }

  removeLike(id) {
      return fetch(`${this._url}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: this._headers,
      })
      .then(this._checkResponse)
  }

  editAvatar(avatar) {
      return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              avatar: avatar,
          })
      })
      .then(this._checkResponse)
  }

  _checkResponse(response) {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(`Ошибка ${response.status}`);
  }

}