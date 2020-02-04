import { ValidObject } from '../../src/ValidObject'

import { ObjectArgumentDescriptor } from '../../src/ArgumentDescriptor'

import { Person } from './Person'

import { schemas } from './schemas'

export class People extends ValidObject {
  person1: Person
  person2: Person
  constructor(
    person1: ObjectArgumentDescriptor<Person>,
    person2: ObjectArgumentDescriptor<Person>
  ) {
    super('People',schemas.personsSchema, person1, person2)
  }
  toString = function() {
    return `person1: ${this.person1} - person2: ${this.person2}`
  }
}
