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
