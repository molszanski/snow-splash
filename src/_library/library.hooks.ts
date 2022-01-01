import React, { useState, useEffect } from "react"

// -- Generic

export type ContainerGeneric<T> = {
  container?: T
  error?: Error
}

export function useGenericContainer<T>(
  containerPromise: Promise<T>,
  controls?: {
    onContainerUpdate(cb: (container: T) => void): void
  },
): ContainerGeneric<T> {
  const [data, setData] = useState<any>(undefined)
  const [error, setError] = useState()

  // Update container
  useEffect(() => {
    if (controls) {
      controls.onContainerUpdate((container) => {
        setData(container)
      })
    }
  }, [controls])

  // We can add optimizations later.
  useEffect(() => {
    containerPromise
      .then((container) => {
        setData(container)
      })
      .catch((e) => setError(e))
  }, [])

  return { container: data, error }
}

export type ContainerGenericBettter<T> = [container?: T, error?: Error]

export function useBetterGenericContainer<T>(
  containerPromise: Promise<T>,
  controls?: {
    onContainerUpdate(cb: (container: T) => void): void
  },
): ContainerGenericBettter<T> {
  const [data, setData] = useState<any>(undefined)
  const [error, setError] = useState()

  // Update container
  useEffect(() => {
    if (controls) {
      controls.onContainerUpdate((container) => {
        setData(container)
      })
    }
  }, [controls])

  // We can add optimizations later.
  useEffect(() => {
    containerPromise
      .then((container) => {
        setData(container)
      })
      .catch((e) => setError(e))
  }, [])

  return [data, error]
}
