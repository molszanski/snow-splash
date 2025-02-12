/**
 * From
 * https://github.com/ai/nanoevents
 *
 * Sadly, can't install it via npm. Some build issue
 */

//////////////////

interface EventsMap {
  [event: string]: any
}

interface DefaultEvents extends EventsMap {
  [event: string]: (...args: any) => void
}

export interface Unsubscribe {
  (): void
}

export declare class Emitter<Events extends EventsMap = DefaultEvents> {
  /**
   * Event names in keys and arrays with listeners in values.
   *
   * ```js
   * emitter1.events = emitter2.events
   * emitter2.events = { }
   * ```
   */
  events: Partial<{ [E in keyof Events]: Events[E][] }>

  /**
   * Add a listener for a given event.
   *
   * ```js
   * const unbind = ee.on('tick', (tickType, tickDuration) => {
   *   count += 1
   * })
   *
   * disable () {
   *   unbind()
   * }
   * ```
   *
   * @param event The event name.
   * @param cb The listener function.
   * @returns Unbind listener from event.
   */
  on<K extends keyof Events>(this: this, event: K, cb: Events[K]): Unsubscribe

  /**
   * Calls each of the listeners registered for a given event.
   *
   * ```js
   * ee.emit('tick', tickType, tickDuration)
   * ```
   *
   * @param event The event name.
   * @param args The arguments for listeners.
   */
  emit<K extends keyof Events>(
    this: this,
    event: K,
    ...args: Parameters<Events[K]>
  ): void
}

/**
 * Create event emitter.
 *
 * ```js
 * import { createNanoEvents } from 'nanoevents'
 *
 * class Ticker {
 *   constructor() {
 *     this.emitter = createNanoEvents()
 *   }
 *   on(...args) {
 *     return this.emitter.on(...args)
 *   }
 *   tick() {
 *     this.emitter.emit('tick')
 *   }
 * }
 * ```
 */

export function createNanoEvents<
  Events extends EventsMap = DefaultEvents,
>(): Emitter<Events> {
  return {
    events: {},
    emit(event, ...args) {
      // @ts-ignore
      ;(this.events[event] || []).forEach((i) => i(...args))
    },
    on(event, cb) {
      // @ts-ignore
      ;(this.events[event] = this.events[event] || []).push(cb)
      return () =>
        // @ts-ignore
        (this.events[event] = (this.events[event] || []).filter(
          (i) => i !== cb,
        ))
    },
  }
}
