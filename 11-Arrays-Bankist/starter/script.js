'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `   
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
        <div class="movements__value">${mov}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;
};
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};
createUsernames(accounts);

//TODO EVENT HANDLERS:
let CurrentAccount;
btnLogin.addEventListener('click', function (e) {
  //Prevent Form from submitting
  e.preventDefault();
  CurrentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (CurrentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and a welcome message
    labelWelcome.textContent = `Welcome Back, ${
      CurrentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Clear Input Fields:
    inputLoginUsername.value = inputLoginPin.value = '';
    //Makes it Lose its focus
    inputLoginPin.blur();
    //Display Movements
    displayMovements(CurrentAccount.movements);

    //Display Balance
    calcDisplayBalance(CurrentAccount.movements);
    //Display Summary
    calcDisplaySummary(CurrentAccount);
  }
});
// console.log(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//IDEA :SLICE :
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(2));
// console.log(arr.slice(1, -1));
// console.log(arr.slice()); // RETURN COPY

//IDEA: SPLICE: WORKS JUST LIKE SLICE BUT MUTATE THE SAME ARRAY.
// arr.splice(-1); //Removes last element
// console.log(arr);
// arr.splice(1, 2); // Removes the two elements after first element
// console.log(arr);
//IDEA :REVERSE: It also mutate the array.
// arr = ['a', 'b', 'c', 'd', 'e'];

// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());

//IDEA: CONCAT: DOESN'T MUTATE
// const letters = arr.concat(arr2);
// console.log(letters);

//IDEA :JOIN :
// console.log(letters.join('-'));

//IDEA: at method: good at : 1 - Method chaining , 2- getting last elements of arrays.
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// TRADITIONAL WAY TO GET THE last element of array
// console.log(arr[arr.length - 1]);

//  NEW WAY TO GET IT EASIER:
// console.log(arr.at(-1));

//IDEA: FOREACH METHOD : IT GIVES ITEM  & INDEX AND ARRAY
// Continue and Break doesn't work on this function!
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// movements.forEach((x, index) =>
//   x > 0
//     ? console.log(`Movement ${index + 1}: You deposited ${x}`)
//     : console.log(`Movement ${index + 1}: You withdrew ${Math.abs(x)}`)
// );

//IDEA : FOREACH FOR MAPS AND SETS:
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
//IDEA: MAPS:
// currencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });

//IDEA: SETS:
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });
//TODO CHALLENGE
const kate1 = [5, 2, 4, 1, 15, 8, 3];
const kate2 = [10, 5, 6, 1, 4];
const julia1 = [3, 5, 2, 12, 7];
const julia2 = [9, 16, 6, 8, 3];

const checkDogs = function (kate, julia) {
  let july = julia.slice(1, -2);
  console.log(july);
  let both = july.concat(kate);
  console.log(both);
  both.forEach(function (dog, i) {
    console.log(
      `Dog number ${i + 1} is  ${
        dog >= 3 ? `an adult, and is a ${dog} years old` : 'still a puppy'
      }`
    );
  });
};
// checkDogs(kate1, julia1);
// checkDogs(kate2, julia2);

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, curr, i, Arr) => acc + curr / Arr.length, 0);
console.log(calcAverageHumanAge(kate1));
console.log(calcAverageHumanAge(kate2));
console.log(calcAverageHumanAge(julia1));
console.log(calcAverageHumanAge(julia2));
//IDEA MAP functions:
//const eurToUSD = 1.1;
//const movementstoUSD = movements.map(mov => mov * eurToUSD);
//IDEA Filter shr7:
//const deposits = movements.filter(mov => mov > 0);
//console.log(deposits);
//const withdrawals = movements.filter(mov => mov < 0);
//console.log(withdrawals);
//IDEA Reduce :
//const balance = movements.reduce((acc, curr) => acc + curr, 0);
//console.log(balance);
// const eurToUSD = 1.1;
// const totalDeposit

//IDEA Find METHOD:Another Method that loops through the array finding the first element that accept the condition and retrieve it.
const firstWithDrawal = movements.find(mov => mov < 0);
//IDEA we Can also find an object or item from array and this is where it really shines!
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
// let acc;
// for (let account of accounts) {
//   if (account.owner === 'Jessica Davis') acc = account;
// }
//console.log(acc);
