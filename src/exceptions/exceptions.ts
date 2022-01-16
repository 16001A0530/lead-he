class ExceptionAxiosGetData extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ExceptionAxiosGetData.prototype);
  }

  getMessage() {
    return "hello " + this.message;
  }
}
