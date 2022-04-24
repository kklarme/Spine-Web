export abstract class Result<O extends object = any, R extends object = any> {
  readonly value: R;

  getResultClass?(): new (originalValue: O) => R;

  constructor(readonly originalValue: O) {
    this.value = this.convertValue(originalValue);
  }

  protected convertValue(originalValue: O): R {
    const resultClass = this.getResultClass?.();
    if (!resultClass) {
      throw new Error(
        `Logical error. ${this.constructor.name} neither has a resultClass property nor a custom convertValue method. Either is required.`,
      );
    }
    return new resultClass(originalValue);
  }
}
