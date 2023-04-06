export const BASE_URL = "https://api.mesto.vrazdorsky.nomoredomains.monster/";

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function register(password, email) {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then(getResponseData)
    .then((res) => {
      return res;
    });
}

export function login(password, email) {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then(getResponseData)
    .then((data) => {
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        return data;
      } else {
        return;
      }
    });
}

export function checkToken() {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then(getResponseData)
    .then((data) => {
      return data;
    });
}
