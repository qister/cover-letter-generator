import { StorageProvider } from './storageProvider'

export class LocalStorageProvider implements StorageProvider {
  get<T>(key: string): T | null {
    const raw = localStorage.getItem(key)
    try {
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
