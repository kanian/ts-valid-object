import { schemas } from './schemas'
import { PrimitiveClassFactory } from '../../src/Factories/PrimitiveClassFactory'

export const PersonNameString = PrimitiveClassFactory<string>({
  schema: schemas.personNameSchema
})

export type PersonNameString = InstanceType<typeof PersonNameString>