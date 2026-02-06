class Car {
  #brand;
  #model;
  speed = 0;
  isBootOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    const bootStatus = this.isBootOpen ? "Open" : "Closed"

    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed}Mph, Boot is ${bootStatus}`)
  }

  go() {
    if (this.isBootOpen === false && this.speed < 200) {
      this.speed += 5;
    }
  }

  brake() {
    if (this.speed > 0) {
      this.speed -= 5; 
    }
  }

  openBoot() {
    if (this.speed === 0) {
      this.isBootOpen = true;
    }
  }

  closeBoot() {
    this.isBootOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    if (this.speed < 280) {
      this.speed += this.acceleration
    }
  }

  openBoot() {}
  closeBoot() {}
}

const car1 = new Car({
  brand: "Toyota",
  model: "Corolla"
});

const car2 = new Car({
  brand: "Tesla",
  model: "Model 3"
});

const raceCar = new RaceCar({
  brand: "Mclaren",
  model: "F1",
  acceleration: 20
})

car1.go()
car2.go()
car2.brake()
raceCar.go()

car1.closeBoot();
car2.openBoot();

car1.displayInfo();
car2.displayInfo();
raceCar.displayInfo();

