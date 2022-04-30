export type SerializableObjects = Date;
export type Serialize<T extends object> = {
  [P in keyof T]: T[P] extends SerializableObjects ? string : T[P];
};
