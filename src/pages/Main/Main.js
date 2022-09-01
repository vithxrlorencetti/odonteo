import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { handleChange } from '../../utils/handleChange';
import './Main.css';

function Main() {
  const [chargingInformation, setChargingInformation] = useState({});
  const [message, setMessage] = useState({ show: false, text: '' });

  const navigate = useNavigate();

  function isInformationValid() {
    const {
      paymentAmount,
      numberOfInstallments,
      billingDay,
      firstInstallmentDate
    } = chargingInformation;

    const validAmount = parseFloat(paymentAmount) > 0;
    const validInstallmentNum = parseInt(numberOfInstallments, 10) > 0 && Number.isInteger(Number(numberOfInstallments));
    let validBillingDay = parseInt(billingDay, 10) > 0 && parseInt(billingDay, 10) < 32 && Number.isInteger(Number(billingDay));
    const validInstallmentDate = firstInstallmentDate && parseInt(firstInstallmentDate.split('-')[0], 10) >= 1960;

    if (numberOfInstallments === '1') {
      validBillingDay = true;
    }

    return validAmount && validInstallmentNum && validInstallmentDate && validBillingDay;
  }

  function register() {
    let text = 'Informações em formato incorreto.';

    if (isInformationValid()) {
      text = 'Registro efetuado com sucesso!';
      localStorage.setItem('chargingInformation', JSON.stringify(chargingInformation));
    }

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

  return (
    <main>
      { message.show &&
        <div id='message' >
          <p>{ message.text }</p>
        </div> }
      <form>
        <label htmlFor='amount'>
          Quantia a receber:
          <input
            id='amount'
            className='form-input'
            name='paymentAmount'
            type='number'
            placeholder='ex. 3500.50'
            onChange={(e) => handleChange(e, setChargingInformation)}
          />
        </label>
        <label htmlFor='installments'>
          Número de parcelas:
          <input
            id='installments'
            className='form-input'
            name='numberOfInstallments'
            type='number'
            placeholder='ex. 2'
            onChange={(e) => handleChange(e, setChargingInformation)}
          />
        </label>
        <label htmlFor='billing-day'>
          Dia do mês para cobrança:
          <input
            id='billing-day'
            className='form-input'
            name='billingDay'
            type='number'
            placeholder='ex. 15'
            disabled={chargingInformation.numberOfInstallments === '1'}
            onChange={(e) => handleChange(e, setChargingInformation)}
          />
        </label>
        <label htmlFor='first-installment-date'>
          Data da primeira parcela:
          <input
            id='first-installment-date'
            className='form-input date'
            name='firstInstallmentDate'
            type='date'
            placeholder='dd-mm-yyyy'
            onChange={(e) => handleChange(e, setChargingInformation)}
          />
        </label>
        <Button
          id='register-button'
          onClickFunction={register}
          addClassName='form-button'
        >
          Registrar cobrança
        </Button>
      </form>
      <Button
        id='go-to-statement-button'
        onClickFunction={() => navigate('/statement')}
      >
        Ver extrato
      </Button>
    </main>
  );
}

export default Main;
