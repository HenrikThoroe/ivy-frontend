import { api } from '@ivy-chess/api-schema'
import { Move, fenEncode } from '@ivy-chess/model'
import { RealTimeClient } from './RealTimeClient'

const playerInterface = api.games.ws.playerInterface

type I = typeof playerInterface.input

type O = typeof playerInterface.output

interface ClientState {
  id?: string
  initialized: boolean
  shouldMove: boolean
}

type Subscription = () => void

/**
 * A wrapper around the WebSocket API that provides
 * a type-safe interface for sending and receiving
 * messages for the player API of the
 * game manager service.
 */
export class PlayerClient extends RealTimeClient<I, O> {
  private readonly state: ClientState

  private readonly subscriptions: Subscription[] = []

  private static cache?: PlayerClient

  constructor() {
    super(playerInterface, new WebSocket(process.env.NEXT_PUBLIC_GAMES_PLAYER_HOST!))

    this.subscribe = this.subscribe.bind(this)
    this.checkIn = this.checkIn.bind(this)
    this.move = this.move.bind(this)
    this.resign = this.resign.bind(this)
    this.publish = this.publish.bind(this)

    this.state = {
      initialized: false,
      shouldMove: false,
    }

    this.on('move', () => {
      this.state.shouldMove = true
      this.publish()
    })

    this.onClose(() => {
      this.state.id = undefined
      this.state.initialized = false
      this.state.shouldMove = false
      this.publish()
    })
  }

  //* API

  /**
   * Returns a cached version of the client.
   * The client will be created on the first call.
   * Recouring calls will return the same instance.
   */
  public static get cached(): PlayerClient {
    if (!PlayerClient.cache) {
      PlayerClient.cache = new PlayerClient()
    }

    return PlayerClient.cache
  }

  /**
   * Subscribes to changes in the client's state.
   * Returns a function that can be used to unsubscribe.
   *
   * @param listener A callback that will be called when the state changes.
   * @returns A function that can be used to unsubscribe.
   */
  public subscribe(listener: Subscription) {
    this.subscriptions.push(listener)

    return () => {
      this.subscriptions.splice(this.subscriptions.indexOf(listener), 1)
    }
  }

  /**
   * Returns the player's ID.
   */
  public get id(): string | undefined {
    return this.state.id
  }

  /**
   * Returns whether the player is initialized.
   */
  public get isInitialized(): boolean {
    return this.state.initialized
  }

  /**
   * Returns whether the player should move.
   */
  public get shouldMove(): boolean {
    return this.state.shouldMove
  }

  /**
   * Checks the player into the game.
   *
   * @param player The player's ID.
   */
  public checkIn(player: string) {
    this.state.id = player
    this.state.initialized = true
    this.publish()

    this.send('checkIn', {
      key: 'check-in-msg',
      player,
    })
  }

  /**
   * Sends a move to the server.
   *
   * @param move The move to send.
   */
  public move(move: Move) {
    this.state.shouldMove = false
    this.publish()
    this.send('move', {
      key: 'move-msg',
      move: fenEncode.encodeMove(move),
    })
  }

  /**
   * Sends a resignation to the server.
   */
  public resign() {
    this.send('resign', {
      key: 'resign-msg',
    })
  }

  //* Private Methods

  private publish() {
    for (const subscription of this.subscriptions) {
      subscription()
    }
  }
}
