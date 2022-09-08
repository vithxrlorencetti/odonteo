export default function parseInstallmentDetails(
    paymentAmount,
    numberOfInstallments,
    billingDay,
    firstInstallmentDate
  ) {
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
