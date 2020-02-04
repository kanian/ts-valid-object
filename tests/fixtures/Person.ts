import { ValidObject } from '../../src/ValidObject'
import { PersonNameString } from './PersonNameString'
import { PersonAgeNumber } from './PersonAgeNumber'
import { schemas } from './schemas'
import { PrimitiveType, Primitive } from '../../src/Primitive'
import { Schema } from 'joi'
import { PrimitiveArgumentDescriptor } from '../../src/ArgumentDescriptor'


export class Person extends ValidObject {
  name : string
  age : number
  constructor(
    name: PrimitiveArgumentDescriptor<PersonNameString>,
    age: PrimitiveArgumentDescriptor<PersonAgeNumber>
  ) {
    super('Person', schemas.personSchema, name, age)
  }
  toString = function() {
    return `name: ${this.name} - age: ${this.age}`
  }
}
