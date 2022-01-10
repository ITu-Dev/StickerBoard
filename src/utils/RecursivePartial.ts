export type RecursivePartial<T> = {
    [P in keyof T]?:
    T[P] extends (infer U)[] ? Value<U>[] : Value<T[P]>;
};
/* add any types than should be considered as a value, say, DateTimeOffset */
type AllowedPrimitives = boolean | string | number | Date;
type Value<T> = T extends AllowedPrimitives ? T : RecursivePartial<T>;
