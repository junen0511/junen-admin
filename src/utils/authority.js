const authorityKey = 'authority';
const tokenKey = 'token';

export function getAuthority() {
    return localStorage.getItem(authorityKey);
}

export function setAuthority(authority) {
    return localStorage.setItem(authorityKey, authority);
}

export function getToken() {
  return localStorage.getItem(tokenKey) || '';
}

export function setToken(token) {
  return localStorage.setItem(tokenKey, token);
}
