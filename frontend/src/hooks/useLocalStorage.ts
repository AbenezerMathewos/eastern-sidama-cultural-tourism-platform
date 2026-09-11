import { useState } from 'react';

/**
 * useLocalStorage - Persists state to localStorage with JSON serialization.
 * Falls back gracefully if localStorage is unavailable.
 *
 * @param key - The localStorage key.
 * @param initialValue - The initial/default value.
 * @returns A stateful value and a setter function, like useState.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(useLocalStorage: Failed to set key "", error);
    }
  };

  return [storedValue, setValue];
}