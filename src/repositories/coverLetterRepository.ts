import { StorageProvider } from '../storage/storageProvider'

export interface CLItem {
  id: string
  cl: string
}

const lsKey = 'clList'

export class CoverLetterRepository {
  private readonly key = lsKey

  constructor(private storage: StorageProvider) {}

  add(newItem: CLItem) {
    const list = this.getAll()
    list.push(newItem)
    this.storage.set(this.key, list)

    return list.length
  }

  getAll() {
    return this.storage.get<CLItem[]>(this.key) ?? []
  }

  getCount() {
    return this.getAll().length
  }

  setAll(list: CLItem[]) {
    this.storage.set(this.key, list)
  }

  deleteById(id: string) {
    const filtered = this.getAll().filter(({ id: itemId }) => itemId !== id)
    this.setAll(filtered)
  }
}
