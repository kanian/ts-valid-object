import { ValidObject } from "../ValidObject";
import { PrimitiveType, Primitive } from "../Primitive";

export interface IPrimitiveConstructor<T> {
  new (arg: PrimitiveType) : T
}
