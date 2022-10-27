type TypesToStringify = Date;
export type ServerSideProp<T extends object> = {
  [P in keyof T]: T[P] extends TypesToStringify ? string : T[P];
};

export function modelToServerSideProp<T extends object>(obj: T): ServerSideProp<T> {
  // This is the simplest way to realize the conversion for now.
  // Objects are automatically recursively converted and undefined properties are omitted
  return JSON.parse(JSON.stringify(obj));
}

export function modelFromServerSideProp<T extends object>(serverSideProp: ServerSideProp<T>): T {
  return Object.entries(serverSideProp).reduce((obj, [key, value]) => {
    if (typeof value === 'string') {
      const potentialDate = new Date(value);
      if (potentialDate.toString().toLowerCase() !== 'invalid date') {
        value = potentialDate;
      }
    }
    obj[key as keyof T] = value as T[keyof T];
    return obj;
  }, {} as T);
}
