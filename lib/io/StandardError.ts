class StandardError extends Error {
  public code: string;

  constructor(message: string, code: string = "ERROR") {
    super(message);
    this.code = code;
  }
}

export default StandardError;
