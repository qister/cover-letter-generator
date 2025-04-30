import { StorageProvider } from '../storage/storageProvider'

const generateId = () => Date.now().toString()

export interface CLItem {
  id: string
  cl: string
}

const lsKey = 'clList'

export class CoverLetterRepository {
  private readonly key = lsKey

  constructor(private storage: StorageProvider) {}

  add(cl: string): number {
    const list = this.getAll()
    const newItem = { id: generateId(), cl }
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
}
