export function handleChange({ target: { name, value } }, setStateFunction) {
  setStateFunction((oldState) => {
    return ({
      ...oldState,
      [name]: value,
    });
  });
}
