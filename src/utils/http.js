import { BASE_URL } from "../configs/api";

function get(url, token) {
  return fetch(`${BASE_URL}${url}`, {
    headers: {
      authorization: token
    }
  })
    .then((res) => res.json())
    .catch((err) => err);
}

function post(url, data, token) {
  return fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .catch((err) => err);
}

function put(url, data, token) {
  return fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .catch((err) => err);
}

function destroy(url, token) {
  return fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
    .then((res) => res.json())
    .catch((err) => err);
}

export default { get, post, put, destroy };
