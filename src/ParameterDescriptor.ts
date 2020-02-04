import { IDerivedValidObjectConstructor } from './Interfaces/IDerivedValidObjectConstructor'
import { IPrimitiveConstructor } from './Interfaces/IPrimitiveConstructor'
import { IValidObjectConstructor } from './Interfaces/IValidObjectConstructor'
import { Primitive, PrimitiveType } from './Primitive'
import { ValidObject } from './ValidObject'

export type PrimitiveParameterDescriptor<
  T extends Primitive<PrimitiveType> = any
> = {
  __className: 'PrimitiveParameterDescriptor'
  type: IPrimitiveConstructor<T>
  name: string
}

export function PrimitiveParameterDescriptorFactory<
  T extends Primitive<PrimitiveType> = any
>(
  type: IPrimitiveConstructor<T>,
  name: string,
  __className: 'PrimitiveParameterDescriptor' = 'PrimitiveParameterDescriptor'
): PrimitiveParameterDescriptor<T> {
  return { type, name, __className }
}

export type ObjectParameterDescriptor<T extends ValidObject = any, U = T> = {
  __className: 'ObjectParameterDescriptor'

  type: IValidObjectConstructor<T> | IDerivedValidObjectConstructor<T>
  name: string
}

export function ObjectParameterDescriptorFactory<T extends ValidObject = any>(
  type: IValidObjectConstructor<T> | IDerivedValidObjectConstructor<T>,
  name: string,
  __className: 'ObjectParameterDescriptor' = 'ObjectParameterDescriptor',

): ObjectParameterDescriptor<T> {
  return { type, name, __className }
}

export type AnyParameterDescriptor =
  | ObjectParameterDescriptor
  | PrimitiveParameterDescriptor
