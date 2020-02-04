import { ValidObject } from '../../src/ValidObject'


import { PersonNameString } from './PersonNameString'


import { Person } from './Person'

import { schemas } from './schemas'
import { PrimitiveArgumentDescriptor, ObjectArgumentDescriptor } from '../../src/ArgumentDescriptor'

export class GroupPerson extends ValidObject {
  constructor(
    group: PrimitiveArgumentDescriptor<PersonNameString>,
    person: ObjectArgumentDescriptor<Person>
  ) {
    super('GroupPerson',schemas.groupPersonSchema, group, person)
  }
  toString = function() {
    return `group: ${this.group} - person: ${this.person}`
  }
}
