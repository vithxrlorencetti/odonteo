export default function showMessage(setMessage, text, status) {
  setMessage({
    show: true,
    text,
    status
  });

  setTimeout(() => {
    setMessage({
      show: false,
      text: '',
      status: ''
    })
  }, 2000);
}