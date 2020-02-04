import { Schema } from 'joi'

export type PrimitiveType = string | number | boolean

export class Primitive<PrimitiveType> {
  private _value: PrimitiveType

  constructor(public readonly _schema: Schema, x: PrimitiveType) {
    const result = this.validate(x)
    if (result instanceof Error) {
      this.handleError(result)
    }
    this._value = x
  }

  public get schema(): Schema {
    return this._schema
  }
  public get value(): PrimitiveType {
    return this._value
  }

  validate(param) {
    const { error, value } = this.schema.validate(param)
    return typeof error === 'undefined' ? value : error
  }

  handleError(err: Error) {
    throw err
  }

  toString() {
    return `${this.value}`
  }
}
