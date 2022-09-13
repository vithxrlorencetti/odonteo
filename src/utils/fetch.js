export default function fetchApi(path, options, sendToken) {
  const headers = {
    'Content-Type': 'application/json'
  }

  if (sendToken) {
    headers.authorization = JSON.parse(localStorage.getItem('token'));
  }

  const optionsWithHeaders = {
    ...options,
    headers
  }

  const parsedResponse = fetch(path, optionsWithHeaders)
    .then((response) => response.json());

  return parsedResponse;
}