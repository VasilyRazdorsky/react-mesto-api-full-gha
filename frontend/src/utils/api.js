class Api {
  constructor({ baseUrl, headers }) {
    this._adress = baseUrl;
    this._headers = headers
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._adress}/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }

  getCardsInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._adress}/cards`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }

  changeUserInfo(inputValues) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about,
      }),
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  addNewCard(cardInfo) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardInfo.postName,
        link: cardInfo.link,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  addLikeOnPost(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }

  deleteLikeFromPost(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }

  changeAvatar(inputValues) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: inputValues.avatar,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  }
});
export default api;
