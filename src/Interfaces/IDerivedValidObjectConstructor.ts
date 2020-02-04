import { Schema } from "joi";
import { AnyArgumentDescriptor } from "../ArgumentDescriptor";

export interface IDerivedValidObjectConstructor<T> {
  new (...args: AnyArgumentDescriptor[]) : T
}
