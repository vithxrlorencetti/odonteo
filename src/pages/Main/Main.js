import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Message from '../../components/Message/Message';
import { handleChange } from '../../utils/handleChange';
import './Main.css';

function Main() {
  const [incomeInformation, setIncomeInformation] = useState({
    paymentAmount: '',
    numberOfInstallments: '',
    billingDay: '',
    firstInstallmentDate: '',
  });

  const {
    paymentAmount,
    numberOfInstallments,
    billingDay,
    firstInstallmentDate,
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

  function parseInstallmentDetails() {
    const installmentValue = Math.floor((Number(paymentAmount) / Number(numberOfInstallments)) * 100) / 100;
    
    // ^ Código consultado na seguinte fonte: https://tutorial.eyehunts.com/js/javascript-format-number-2-decimals-without-rounding-example-code/
    
    const installmentDetails = {
      dates: [firstInstallmentDate],
      installmentValue
    };


    let [year, month] = firstInstallmentDate.split('-');
    year = Number(year);
    
    const shortMonths = [4, 6, 9, 11];
    
    for (let i = 1; i < Number(numberOfInstallments); i += 1) {
      let day = Number(billingDay);
      month = Number(month) + 1;

      if (month === 13) {
        year += 1;
        month = 1;
      }

      if (day === 31 && shortMonths.some((element) => element === month)) {
        day = 30;
      }

      if (day >= 29 && month === 2) {
        day = 28;
      }


      if (month < 10) {
        month = `0${month}`;
      }

      if (day < 10) {
        day = `0${day}`;
      }

      installmentDetails.dates.push(`${year}-${month}-${day}`);
    }

    return installmentDetails;
  }

  function register() {
    let text = 'Informações em formato incorreto.';

    if (isInformationValid()) {
      text = 'Registro efetuado com sucesso!';
      const installmentDetails = parseInstallmentDetails();
      localStorage.setItem('installmentDetails', JSON.stringify([installmentDetails]));
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
