import { IDerivedValidObjectConstructor } from './Interfaces/IDerivedValidObjectConstructor'
import { IPrimitiveConstructor } from './Interfaces/IPrimitiveConstructor'
import { IValidObjectConstructor } from './Interfaces/IValidObjectConstructor'
import { Primitive, PrimitiveType } from './Primitive'
import { ValidObject } from './ValidObject'

export type PrimitiveArgumentDescriptor<
  T extends Primitive<PrimitiveType> = any
> = {
  __className: 'PrimitiveArgumentDescriptor'
  type: IPrimitiveConstructor<T>
  name: string
  value: PrimitiveType
}

export function PrimitiveArgumentDescriptorFactory<
  T extends Primitive<PrimitiveType> = any
>(
  type: IPrimitiveConstructor<T>,
  name: string,
  value: PrimitiveType
): PrimitiveArgumentDescriptor<T> {
  return {
    __className: 'PrimitiveArgumentDescriptor',
    type,
    name,
    value
  }
}

export type ObjectArgumentDescriptor<T extends ValidObject = any> = {
  __className: 'ObjectArgumentDescriptor'
  type: IValidObjectConstructor<T> | IDerivedValidObjectConstructor<T>
  name: string
  value: any
}

export function ObjectArgumentDescriptorFactory<
  T extends ValidObject = any
>(
  type: IValidObjectConstructor<T> | IDerivedValidObjectConstructor<T>,
  name: string,
  value: T
): ObjectArgumentDescriptor<T> {
  return {
    __className: 'ObjectArgumentDescriptor',
    type,
    name,
    value
  }
}

export type AnyArgumentDescriptor =
  | PrimitiveArgumentDescriptor
  | ObjectArgumentDescriptor
