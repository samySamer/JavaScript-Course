'use strict';
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
//   //IDEA Never use this :
//   // this.calcAge = function () {};
// };
// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };
//IDEA Challenge 1 :
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

// const bmw = new Car('BMW', 120);
// const Mercedes = new Car('Mercedes', 95);
// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();
// Mercedes.accelerate();
// Mercedes.accelerate();
// Mercedes.accelerate();
// Mercedes.brake();
//IDEA Challenge 2 :
class Es6Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
// const Ford = new Es6Car('Ford', 120);
// Ford.accelerate();
// console.log(Ford.speedUS);
// Ford.accelerate();
// Ford.speedUS = 50;
// console.log(Ford);
// Ford.brake();
//IDEA Challenge 3 :
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`the charge became ${this.charge}%`);
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with charge ${this.charge}%`
  );
};
const Tesla = new EV('Tesla', 120, 23);
// Tesla.accelerate();
// Tesla.brake();
// Tesla.chargeBattery(90);
//IDEA Another example On Classes

//To make method chainable we return this.
class Account {
  // 1) Public fields:
  locale = navigator.language;
  // 2) Private Fields:
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //Protected Properties:
    this.#pin = pin;
  }
  // 3) Public Methods:
  deposit(val) {
    this.#movements.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }
  requestLoan(val) {
    if (this._approveLoan(val)) this.deposit(val);
    console.log(`Loan Approved`);
    return this;
  }
  // 4) Private Methods:
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('samy', 'EGP', 1111);
// console.log(acc1);
// acc1.deposit(200);
// acc1.withdraw(140);
// acc1.requestLoan(1000);
///////////////////////////
//Chaining:
acc1.deposit(2000).deposit(5000).withdraw(300).requestLoan(10000);
//Challenge 4:

class Es6EV extends Es6Car {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`the charge became ${this.#charge}`);
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with charge ${
        this.#charge
      }%`
    );
    return this;
  }
}

const Rivian = new Es6EV('Rivian', 120, 23);
Rivian.chargeBattery(90).accelerate().brake().accelerate();
