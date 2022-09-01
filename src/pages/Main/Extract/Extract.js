import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import './Extract.css';

function Extract() {
  const navigate = useNavigate();

  return (
    <main>
      <Button
        id='go-back-button'
        onClickFunction={() => navigate('/')}
      >
        Voltar
      </Button>
    </main>
  );
}

export default Extract;
