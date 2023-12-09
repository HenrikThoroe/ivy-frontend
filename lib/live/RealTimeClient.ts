import { IOSchema, InSchema, OutSchema } from '@ivy-chess/api-schema'
import { z } from 'zod'

type Listener<O extends OutSchema, K extends keyof O> = (data: z.infer<O[K]>) => void

/**
 * A wrapper around the WebSocket API that provides
 * a type-safe interface for sending and receiving
 * messages.
 */
export class RealTimeClient<I extends InSchema, O extends OutSchema> {
  private readonly schema: IOSchema<I, O>

  private socket: WebSocket

  private expectation?: (data: string) => Promise<void>

  private readonly listeners: Partial<Record<keyof O, Listener<O, Extract<keyof O, string>>[]>> = {}

  private readonly messageQueue: string[] = []

  protected constructor(schema: IOSchema<I, O>, socket: WebSocket) {
    this.schema = schema
    this.socket = socket
    this.handleMessage = this.handleMessage.bind(this)
    this.socket.addEventListener('message', this.handleMessage)
  }

  //* API

  /**
   * Creates a new RealTimeClient for the given endpoint.
   * The endpoint's input and output schema will be used
   * to validate messages.
   *
   * Waits for the socket to connect before resolving.
   *
   * @param url The url of the endpoint to connect to.
   * @param schema The schema of the endpoint.
   * @returns A promise for the client.
   */
  public static async custom<I extends InSchema, O extends OutSchema>(
    url: string,
    schema: IOSchema<I, O>
  ) {
    const socket = new WebSocket(url)
    await new Promise((resolve) => socket.addEventListener('open', resolve))
    return new RealTimeClient(schema, socket)
  }

  /**
   * If the socket is not yet connected, waits for it to connect.
   *
   * @returns A promise that resolves when the socket is connected.
   */
  public async waitForConnection() {
    if (this.isConnected) {
      return
    }

    return new Promise<void>((resolve) => {
      const cb = () => {
        this.socket.removeEventListener('open', cb)
        resolve()
      }

      this.socket.addEventListener('open', cb)
    })
  }

  /**
   * Reinitializes the socket connection.
   */
  public reload() {
    this.exit()
    this.socket = new WebSocket(this.socket.url)
    this.socket.addEventListener('message', this.handleMessage)
  }

  /**
   * Adds an event listener for the `close` event.
   *
   * @param listener The listener to call when the socket is closed.
   */
  public onClose(listener: () => void) {
    this.socket.addEventListener('close', listener)
  }

  /**
   * Appends an event listener for the given key.
   * The listener will be called whenever a message
   * with the given key is received.
   *
   * @param key The key of the message to listen for.
   * @param listener The listener to call when the message is received.
   */
  public on<K extends Extract<keyof O, string>>(key: K, listener: Listener<O, K>) {
    if (!this.listeners[key]) {
      this.listeners[key] = []
    }

    this.listeners[key]!.push(listener)
  }

  /**
   * Closes the socket connection.
   */
  public exit() {
    this.socket.removeEventListener('message', this.handleMessage)
    for (const key in this.listeners) {
      this.listeners[key] = []
    }

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.close()
    }

    if (this.socket.readyState === WebSocket.CONNECTING) {
      const cb = () => {
        this.socket.removeEventListener('open', cb)
        this.socket.close()
      }

      this.socket.addEventListener('open', cb)
    }
  }

  /**
   * Checks whether the socket is connected.
   *
   * @returns Whether the socket is connected.
   */
  public get isConnected() {
    return this.socket.readyState === WebSocket.OPEN
  }

  /**
   * Sends a message to the server.
   * The message will be validated against the
   * input schema of the endpoint.
   *
   * @param _ The key of the endpoint to send the message to.
   * @param message The message to send.
   */
  public send<K extends keyof I>(_: K, message: z.infer<I[K]>) {
    this.socket.send(JSON.stringify(message))
  }

  /**
   * Expects a message from the server.
   *
   * When a message is expected, the next message received by the
   * socket, will be validated against the output schema of the
   * endpoint.
   *
   * If another message is already expecetd and not yet handled,
   * the method will throw an error.
   *
   * If there are already received messages, that have not yet been
   * handled, the first message in the buffer will be taken, validated
   * and then removed from the buffer.
   *
   * @param key The key of the expeceted message.
   * @param timeout The timeout in milliseconds after which the expectation will be cancelled.
   * @returns A promise for the validated message when received.
   *          Will first resolve when the message is received and otherwise block when awaited.
   * @thows when the message is invalid, another message is already expected or the timeout is reached.
   */
  public async expect<K extends Extract<keyof O, string>>(key: K, timeout?: number) {
    if (this.expectation) {
      throw new Error('Cannot expect message while another is being handled')
    }

    return new Promise<z.infer<O[K]>>((resolve, reject) => {
      const signal = timeout
        ? setTimeout(() => {
            this.expectation = undefined
            reject(`Expecting message '${key}' timed out after ${timeout}ms`)
          }, timeout)
        : undefined

      this.expectation = async (data) => {
        const schema = this.schema.output[key]
        const json = JSON.parse(data)
        const res = schema.safeParse(json)

        clearTimeout(signal)

        if (!res.success) {
          throw new Error(`Received invalid message "${JSON.stringify(json)}" for key "${key}"`)
        }

        resolve(res.data)
      }

      this.checkForMessage()
    })
  }

  //* Private Methods

  private async handleMessage(msg: MessageEvent<any>) {
    const str = msg.data.toString()

    this.messageQueue.push(str)
    await this.checkForMessage()

    for (const key in this.listeners) {
      this.handle(key, str)
    }
  }

  private async checkForMessage() {
    if (this.messageQueue.length === 0 || !this.expectation) {
      return
    }

    await this.expectation(this.messageQueue.shift()!)
    this.expectation = undefined
  }

  private handle<K extends Extract<keyof O, string>>(key: K, data: string) {
    if (!this.listeners[key]) {
      return
    }

    const schema = this.schema.output[key]

    try {
      const json = JSON.parse(data)
      const res = schema.parse(json)

      this.listeners[key]!.forEach((listener) => listener(res))
    } catch {
      return
    }
  }
}
