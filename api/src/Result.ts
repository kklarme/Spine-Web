export abstract class Result<O extends object = any, N extends object = any> {
  readonly value: N;

  resultClass?: new (originalValue: O) => N;

  constructor(readonly originalValue: O) {
    this.value = this.convertValue(originalValue);
  }

  protected convertValue(originalValue: O): N {
    if (!this.resultClass) {
      throw new Error(
        `Logical error. ${this.constructor.name} neither has a resultClass property nor a custom convertValue method. Either is required.`,
      );
    }
    return new this.resultClass(originalValue);
  }
}
