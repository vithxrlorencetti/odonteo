export default function showMessage(setMessage, text) {
  setMessage({
    show: true,
    text,
  });

  setTimeout(() => {
    setMessage({
      show: false,
      text: '',
    })
  }, 2000);
}