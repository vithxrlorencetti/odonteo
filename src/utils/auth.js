import jwt_decode from "jwt-decode";

export default function isAuthenticated() {
  const token = JSON.parse(localStorage.getItem('token'));
  console.log(token);

  if (!token) {
    return false;
  }
  
  const { exp } = jwt_decode(token);

  if (Date.now() >= exp * 1000) {
    return false;
  }

  return true;
}

// código inspirado na seguinte fonte: https://stackoverflow.com/questions/51292406/check-if-token-expired-using-this-jwt-library
