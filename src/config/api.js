// https://dexample.com/api/apps/births-certificate/ministry.jpg

const APP_NAME = "births-certificate";

export const serverURL = (windowUrl) => {
  let SERVER_URL = windowUrl; //window.location.origin;
  if (SERVER_URL.includes("localhost")) {
    SERVER_URL = SERVER_URL;
  } else {
    SERVER_URL = `${SERVER_URL}/api/apps/${APP_NAME}`;
  }
  return SERVER_URL;
};
