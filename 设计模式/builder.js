/**
 * 建造模式
 */

/** 产品类 */
class Car {
  constructor() {}

  setColor() {
    console.log('喷漆')
  }

  setBody() {
    console.log('车身')
  }
}

/** 建造类 */
class Builder {
  createColor(){}
  createBody(){}
}

class ConcreteBuilder extends Builder {
  constructor(inCar) {
    super()
    this.car = inCar || new Car()
  }
  createColor(){
    this.car.setColor()
  }
  createBody(){
    this.car.setBody()
  }
}


const concrete = new  ConcreteBuilder()
concrete.createBody()
concrete.createColor()
