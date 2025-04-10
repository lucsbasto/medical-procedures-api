export class TimeoutError extends Error {
  public statusCode: number;

  constructor() {
    super('Timeout exceeded');
    this.name = 'TimeoutError';
    this.statusCode = 408;
  }
}
