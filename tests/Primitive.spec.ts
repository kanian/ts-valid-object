import { Primitive } from '../src/Primitive'
import { Schema } from 'joi'
import {
  StringPrimitive,
  BooleanPrimitive,
  NumberPrimitive
} from './fixtures/Primitives'

const Joi = require('@hapi/joi')
describe('Primitive', () => {
  it('Saves string passed to it', () => {
    const primitive = new StringPrimitive('hello')
    expect(primitive.value).toEqual('hello')
  })
  it('Saves number passed to it', () => {
    const primitive = new NumberPrimitive(52)
    expect(primitive.value).toEqual(52)
  })
  it('Saves boolean passed to it', () => {
    const primitive = new BooleanPrimitive(true)
    expect(primitive.value).toEqual(true)
  })
  it('Supports string + operator', () => {
    const primitive = new StringPrimitive('hello')
    expect(primitive + ' world').toEqual('hello world')
  })
  it('Throws error when schema is invalid', () => {
    // It actually won't let you use wrongly typed arg
    expect(() => {
      new StringPrimitive(12 as any)
    }).toThrow()
    expect(() => {
      new NumberPrimitive('hello' as any)
    }).toThrow()
    expect(() => {
      new BooleanPrimitive('hello' as any)
    }).toThrow()
  })
})
