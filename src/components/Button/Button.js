import './Button.css';

function Button({ onClickFunction, children, id }) {
  return (
    <button
      type='button'
      className='standard-button'
      onClick={onClickFunction}
      id={id}
    >
      { children }
    </button>
  );
}

export default Button;
