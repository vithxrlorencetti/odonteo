import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Message from '../../components/Message/Message';
import { handleChange } from '../../utils/handleChange';
import parseInstallmentDetails from '../../utils/parseInstallmentDetails';
import './Main.css';

function Main() {
  const [incomeInformation, setIncomeInformation] = useState({
    paymentAmount: '',
    numberOfInstallments: '',
    billingDay: '',
    firstInstallmentDate: ''
  });

  const {
    paymentAmount,
    numberOfInstallments,
    billingDay,
    firstInstallmentDate
  } = incomeInformation;

  const [message, setMessage] = useState({ show: false, text: '' });

  const navigate = useNavigate();

  function isInformationValid() {
    const validAmount = Number(paymentAmount) > 0;
    const validInstallmentNum = Number(numberOfInstallments) > 0 && Number.isInteger(Number(numberOfInstallments));
    let validBillingDay = Number(billingDay) > 0 && Number(billingDay) < 32 && Number.isInteger(Number(billingDay));
    const validInstallmentDate = firstInstallmentDate && Number(firstInstallmentDate.split('-')[0]) >= 1960;

    if (numberOfInstallments === '1') {
      validBillingDay = true;
    }

    return validAmount && validInstallmentNum && validInstallmentDate && validBillingDay;
  }

  async function register() {
    let text;
    // let text = 'Informações em formato incorreto.';

    if (isInformationValid()) {
      // text = 'Registro efetuado com sucesso!';
      const installmentDetails = parseInstallmentDetails(
        paymentAmount,
        numberOfInstallments,
        billingDay,
        firstInstallmentDate
      );

      const body = {
        income: {
          ...installmentDetails,
          userId: 1
        }
      }

      const headers = {
        'Content-Type': 'application/json'
      }
      
      const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers
      }

      text = await fetch('http://localhost:3000/income', options)
        .then((response) => response.json())
        .then(({ message }) => message);
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
        <Message>
          {message.text}
        </Message>
      }
      <form>
        <label htmlFor='amount'>
          Quantia a receber:
          <input
            id='amount'
            className='form-input'
            name='paymentAmount'
            type='number'
            placeholder='ex. 3500.50'
            onChange={(e) => handleChange(e, setIncomeInformation)}
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
            onChange={(e) => handleChange(e, setIncomeInformation)}
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
            disabled={incomeInformation.numberOfInstallments === '1'}
            onChange={(e) => handleChange(e, setIncomeInformation)}
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
            onChange={(e) => handleChange(e, setIncomeInformation)}
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
