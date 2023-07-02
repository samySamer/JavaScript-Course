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
Tesla.accelerate();
Tesla.brake();
Tesla.chargeBattery(90);
