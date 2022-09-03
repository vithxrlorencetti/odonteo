import './Message.css';

function Message({ children }) {
  return (
    <div>
      <p>{ children }</p>
    </div>
  );
}

export default Message;
