import { PrimitiveClassFactory } from '../../src/Factories/PrimitiveClassFactory'
import { schemas } from './schemas'

export const PersonAgeNumber = PrimitiveClassFactory<number>({
  schema: schemas.personAgeSchema
})

export type PersonAgeNumber = InstanceType<typeof PersonAgeNumber>
