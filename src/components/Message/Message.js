import './Message.css';

function Message({ children, addClass }) {
  return (
    <div className={`message ${addClass}`}>
      <p>{ children }</p>
    </div>
  );
}

export default Message;
