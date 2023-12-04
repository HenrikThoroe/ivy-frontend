'use client'

import Icon from '@/components/(media)/Icon/Icon'
import { Player } from '@ivy-chess/model'
import classNames from 'classnames'

interface Props {
  /**
   * The player data
   */
  player: Player

  /**
   * Whether the player is connected.
   */
  isConnected: boolean

  /**
   * Whether the user can connect as this player.
   */
  canConnect: boolean

  /**
   * Called when the user joins the game as this player.
   */
  onJoin: () => void

  /**
   * Called when the user leaves the game as this player.
   */
  onLeave: () => void
}

/**
 * An inset card for displaying the statet of a player.
 *
 * When the user can connect as this player, the card will
 * provide a button to either join or leave the game.
 */
export default function PlayerCard(props: Props) {
  const { player, onJoin, onLeave, isConnected, canConnect } = props

  //* UI

  const JoinButton = () => (
    <button
      onClick={onJoin}
      className={classNames(
        'w-max rounded-lg bg-gradient-to-br from-sky-600 to-indigo-400 px-12 py-3 text-xl font-bold text-on-secondary shadow-md',
        'transition-all duration-100',
        'hover:from-sky-500 hover:to-indigo-300 hover:shadow-none'
      )}
    >
      Join
    </button>
  )

  const LeaveButton = () => (
    <button
      onClick={onLeave}
      className={classNames(
        'w-max rounded-lg bg-gradient-to-br from-pink-400 to-red-600 px-12 py-3 text-xl font-bold text-on-secondary shadow-md',
        'transition-all duration-100',
        'hover:from-pink-300 hover:to-red-500 hover:shadow-none'
      )}
    >
      Leave
    </button>
  )

  const ID = () => {
    return (
      <span
        onClick={() => navigator.clipboard.writeText(player.id)}
        className={classNames(
          'flex flex-row items-center justify-center gap-4 rounded-md bg-primary-accent px-12 py-3 font-mono text-xl text-on-primary',
          'hover:cursor-pointer hover:text-action-primary active:text-action-primary-active'
        )}
      >
        {player.id}
        <Icon name="copy" />
      </span>
    )
  }

  const Content = () => {
    if (canConnect && player.type === 'human') {
      return isConnected ? <LeaveButton /> : <JoinButton />
    }

    return <ID />
  }

  //* Render

  return (
    <section className="flex w-full flex-col items-center justify-center rounded-md border py-14 shadow-inner">
      <Content />
    </section>
  )
}
