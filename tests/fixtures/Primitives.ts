import { Schema } from 'joi'

import { PrimitiveClassFactory as PFact } from '../../src/Factories/PrimitiveClassFactory'
import { Primitive, PrimitiveType } from '../../src/Primitive'

const Joi = require('@hapi/joi')

const stringSchema: Schema = Joi.string()
const numberSchema: Schema = Joi.number()
const booleanSchema: Schema = Joi.boolean()

export const StringPrimitive = PFact<string>({
  schema: stringSchema
})
export type StringPrimitive = InstanceType<typeof StringPrimitive>

export const NumberPrimitive = PFact<number>({
  schema: numberSchema
})
export type NumberPrimitive = InstanceType<typeof NumberPrimitive>

export const BooleanPrimitive = PFact<boolean>({
  schema: booleanSchema
})
export type BooleanPrimitive = InstanceType<typeof BooleanPrimitive>
