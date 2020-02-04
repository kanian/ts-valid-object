import { Schema } from 'joi'

import {
  AnyArgumentDescriptor,
  ObjectArgumentDescriptor,
  ObjectArgumentDescriptorFactory,
  PrimitiveArgumentDescriptorFactory
} from './ArgumentDescriptor'
import { IDerivedValidObjectConstructor } from './Interfaces/IDerivedValidObjectConstructor'
import { IPrimitiveConstructor } from './Interfaces/IPrimitiveConstructor'
import { IValidObjectConstructor } from './Interfaces/IValidObjectConstructor'
import {
  AnyParameterDescriptor,
  ObjectParameterDescriptorFactory as OPDFact,
  PrimitiveParameterDescriptorFactory as PPDFact
} from './ParameterDescriptor'
import { Primitive, PrimitiveType } from './Primitive'

export class ValidObject {
  params: AnyParameterDescriptor[]
  private _value: PrimitiveType | object = {}
  constructor(
    public readonly __className: string = 'ValidObject',
    private schema: Schema,
    ...x: AnyArgumentDescriptor[]
  ) {
    this._init(...x)
    const result = this.validate()
    if (result instanceof Error) {
      this.handleError(result)
    }
    this._value = result
  }

  public get value(): PrimitiveType | object {
    return this._value
  }

  public isInstanceOf(className: string): boolean {
    return this.__className === className
  }

  // Initialise the Object
  private _init(...x: AnyArgumentDescriptor[]) {
    this.params = x.map(arg =>
      arg.__className === 'PrimitiveArgumentDescriptor'
        ? PPDFact(arg.type, arg.name)
        : OPDFact(arg.type, arg.name)
    )
    this.setProperties(...x)
    this._value = this.getValidable()
  }

  // Generate Getter and Setter for each property
  private setProperties(...x: AnyArgumentDescriptor[]) {
    x.forEach(p => {
      // initialise private property counterpart
      this[`_${p.name}`] =
        p.__className === 'ObjectArgumentDescriptor'
          ? p.value
          : p.__className === 'PrimitiveArgumentDescriptor'
          ? new p.type(p.value)
          : undefined
      // Define getter/setter
      Object.defineProperty(this, p.name, {
        get() {
          return this[`_${p.name}`]
        },
        set<T extends ValidObject>(value: PrimitiveType | T) {
          if (p.__className === 'ObjectArgumentDescriptor') {
            // Assign a new ValidObject with the given value
            this[`_${p.name}`] = this.buildValidObject(p, value)
          } else if (p.__className === 'PrimitiveArgumentDescriptor') {
            // Assign a new primitive wuth the given value
            this[`_${p.name}`] = new p.type(value as PrimitiveType)
          }
          // make sure updated value is available
          this.refreshValue()
        }
      })
    })
  }

  // make sure updated value is available
  private refreshValue() {
    this._value = this.getValidable()
  }

  private buildValidObject(p: ObjectArgumentDescriptor, value: object) {
    if ((value as ValidObject).__className === 'ValidObject') {
      return new (p.type as IValidObjectConstructor<typeof p.type>)(
        'ValidObject',
        (value as ValidObject).schema,
        ...this.buildValidObjectArguments(value as ValidObject)
      )
    } else {
      // We have a derived class from ValidObject
      return new (p.type as IDerivedValidObjectConstructor<typeof p.type>)(
        ...this.buildValidObjectArguments(value as ValidObject)
      )
    }
  }

  private buildValidObjectArguments(
    value: ValidObject
  ): AnyArgumentDescriptor[] {
    const params = value.params.map(param => {
      return value[param.name] instanceof ValidObject
        ? ObjectArgumentDescriptorFactory(
            param.type,
            param.name,
            (value[param.name] as ValidObject).value
          )
        : PrimitiveArgumentDescriptorFactory(
            param.type as IPrimitiveConstructor<Primitive<PrimitiveType>>,
            param.name,
            (value[param.name] as Primitive<PrimitiveType>).value
          )
    })
    return params
  }

  // Extract embedded values so that Joi Schema validation can be applied
  private getValidable() {
    const _value = {}
    this.params.forEach(p => {
      if (this[p.name] instanceof ValidObject) {
        _value[p.name] = this[p.name].getValidable()
      } else {
        _value[p.name] = this[p.name].value
      }
    })
    return _value
  }

  validate(): PrimitiveType | object {
    const { error, value } = this.schema.validate(this._value)
    return typeof error === 'undefined' ? value : error
  }

  handleError(err: Error) {
    throw err
  }
}
