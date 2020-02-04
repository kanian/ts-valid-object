import { Primitive, PrimitiveType } from '../Primitive'
import { PrimitiveClassFactoryOptions } from './PrimitiveClassFactoryOptions'

export function PrimitiveClassFactory<T extends PrimitiveType>(
  options: PrimitiveClassFactoryOptions
) {
  const { schema } = options
  let PrimitiveClass: {
    new (value: T): Primitive<T>
  } = class extends Primitive<T> {
    constructor(n) {
      super(schema, n)
    }
  }
  return PrimitiveClass
}



