export default function fetchApi(path, options) {
  const headers = {
    'Content-Type': 'application/json'
  }

  const optionsWithHeaders = {
    ...options,
    headers
  }

  const parsedResponse = fetch(path, optionsWithHeaders)
    .then((response) => response.json());

  return parsedResponse;
}