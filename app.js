const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');
const form = document.getElementById('loan-form');
const results = document.getElementById('results');
const loading = document.getElementById('loading');

const calculateResults = (e) => {
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // show/hide results and loading spinner
    results.style.display = 'block';
    loading.style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
  amount.value = '';
  interest.value = '';
  years.value = '';
};

form.addEventListener('submit', (e) => {
  // show/hide loading and results
  results.style.display = 'none';
  loading.style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

const showError = (error) => {
  //  hide loading spinner and results
  results.style.display = 'none';
  loading.style.display = 'none';

  const errorDiv = document.createElement('div');
  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 3000);
};

const clearError = () => {
  document.querySelector('.alert').remove();
};
