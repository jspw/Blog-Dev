import constants from "./constants";

export function saveTokenLocally(token) {
  localStorage.setItem(constants.TOKEN, JSON.stringify(token));
}

export function getLocalToken() {
  const token = localStorage.getItem(constants.TOKEN);
  if (token) {
    return JSON.parse(token);
  } else {
    return null;
  }
}

export function removeLocalToken() {
  localStorage.removeItem(constants.TOKEN);
}

export function saveUserDataLocally(user) {
  localStorage.setItem(constants.USER, JSON.stringify(user));
}

export function getLocalUserData() {
  const user = localStorage.getItem(constants.USER);
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

export function removeLocalUser() {
  localStorage.removeItem(constants.USER);
}
