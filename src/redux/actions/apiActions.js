export const STORE_TOKEN = 'STORE_TOKEN';
export const STORE_USER = 'STORE_USER';

export const storeToken = token => ({
  type: STORE_TOKEN,
  payload: token
});

export const storeUser = user => ({
  type: STORE_USER,
  payload: user
});