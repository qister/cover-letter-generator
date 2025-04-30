import { LocalStorageProvider } from '../storage/localStorageProvider'
import { CoverLetterRepository } from './coverLetterRepository'

const storage = new LocalStorageProvider()

export const coverLetterRepository = new CoverLetterRepository(storage)
