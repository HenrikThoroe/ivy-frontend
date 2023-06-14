export class HTTPError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }

  toString() {
    return `(HTTP)[status: ${this.status}] ${this.message}`
  }
}
