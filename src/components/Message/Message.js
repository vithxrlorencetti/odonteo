import './Message.css';

function Message({ children, addClass }) {
  return (
    <div className={`message ${addClass}`} data-testid="test-message">
      <p>{ children }</p>
    </div>
  );
}

export default Message;
