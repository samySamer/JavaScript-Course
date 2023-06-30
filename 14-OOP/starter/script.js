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

const bmw = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);
bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
bmw.brake();
bmw.accelerate();
Mercedes.accelerate();
Mercedes.accelerate();
Mercedes.accelerate();
Mercedes.brake();
