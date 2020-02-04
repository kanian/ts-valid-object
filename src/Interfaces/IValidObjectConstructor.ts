import { Schema } from "joi";
import { AnyArgumentDescriptor } from "../ArgumentDescriptor";

export interface IValidObjectConstructor<T> {
  new (className: string, schema: Schema, ...args: AnyArgumentDescriptor[]): T;
}
