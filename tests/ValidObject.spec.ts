import { ValidObject } from '../src/ValidObject'
import { People } from './fixtures/People'
import { Person } from './fixtures/Person'
import { PersonAgeNumber } from './fixtures/PersonAgeNumber'
import { PersonNameString } from './fixtures/PersonNameString'
import { schemas } from './fixtures/schemas'
import {
  AnyArgumentDescriptor,
  ObjectArgumentDescriptor,
  ObjectArgumentDescriptorFactory as OADFact,
  PrimitiveArgumentDescriptor,
  PrimitiveArgumentDescriptorFactory as PADFact
} from '../src/ArgumentDescriptor'
describe('ValidObject', () => {
  it('Builds a Valid Object out of PrimitiveArgumentDescriptors', () => {
    const personObj = new ValidObject(
      'ValidObject',
      schemas.personSchema,
      PADFact(PersonNameString, 'name', 'john'),
      PADFact(PersonAgeNumber, 'age', 55)
    )
    expect(personObj.value).toEqual({ name: 'john', age: 55 })
  })
  it('Throws Error if any PrimitiveArgumentDescriptor is not valid', () => {
    expect(() => {
      new ValidObject(
        'ValidObject',
        schemas.personSchema,
        PADFact(PersonNameString, 'name', 10),
        PADFact(PersonAgeNumber, 'age', 55)
      )
    }).toThrow()
  })
  it('Builds a Valid Object out of ObjectArgumentDescriptors', () => {
    const person1 = new ValidObject(
      'ValidObject',
      schemas.personSchema,
      PADFact(PersonNameString, 'name', 'john'),
      PADFact(PersonAgeNumber, 'age', 55)
    )
    const person2 = new ValidObject(
      'ValidObject',
      schemas.personSchema,
      PADFact(PersonNameString, 'name', 'jake'),
      PADFact(PersonAgeNumber, 'age', 25)
    )
    const personsObj = new ValidObject(
      'ValidObject',
      schemas.personsSchema,
      OADFact(ValidObject, 'person1', person1),
      OADFact(ValidObject, 'person2', person2)
    )
    expect(personsObj.value).toEqual({
      person1: { name: 'john', age: 55 },
      person2: { name: 'jake', age: 25 }
    })
  })
  it('Throws Error if invalid value is assigned to property of ValidObject built from PrimitiveArgumentDescriptors', () => {
    // Loose the type
    const person: any = new Person(
      PADFact(PersonNameString, 'name', 'Jess'),
      PADFact(PersonAgeNumber, 'age', 55)
    )
    expect(() => {
      person.name = 10
    }).toThrow()
  })
  it('Throws Error if invalid value is assigned to property of ValidObject built from ObjectArgumentDescriptors', () => {
    const person = new Person(
      PADFact(PersonNameString, 'name', 'Jess'),
      PADFact(PersonAgeNumber, 'age', 55)
    )
    const person2 = new Person(
      PADFact(PersonNameString, 'name', 'Jessica'),
      PADFact(PersonAgeNumber, 'age', 55)
    )
    const people = new People(
      OADFact(Person, 'person1', person),
      OADFact(Person, 'person2', person2)
    )
    //console.log(person.name)
    expect(() => {
      // Loosen the type
      (people as any).person1 = { name: 'something' }
    }).toThrow()
  })

  it('Accepts a valid ValidObject value assigned to property of ValidObject built from ObjectArgumentDescriptors', () => {
    const person = new Person(
      PADFact(PersonNameString, 'name', 'Jess'),
      PADFact(PersonAgeNumber, 'age', 55)
    )
    const person2 = new Person(
      PADFact(PersonNameString, 'name', 'Jessica'),
      PADFact(PersonAgeNumber, 'age', 55)
    )
    const person3 = new Person(
      PADFact(PersonNameString, 'name', 'Jane'),
      PADFact(PersonAgeNumber, 'age', 1055)
    )
    const people = new People(
      OADFact(Person, 'person1', person),
      OADFact(Person, 'person2', person2)
    )
    people.person2 = person3
    expect(people.value).toEqual({
      person1: { name: 'Jess', age: 55 },
      person2: { name: 'Jane', age: 1055 }
    })
  })
})
