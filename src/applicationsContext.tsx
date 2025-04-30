import { ReactNode, createContext, useContext, useState } from 'react'

import { coverLetterRepository } from './repositories'
import { CLItem } from './repositories/coverLetterRepository'

const ApplicationsContext = createContext<{
  applications: CLItem[]
  setApplications: (items: CLItem[]) => void
}>({
  applications: [],
  setApplications: () => {},
})

// eslint-disable-next-line react-refresh/only-export-components
export const useApplications = () => useContext(ApplicationsContext)

export const ApplicationsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [applications, setApplications] = useState(
    coverLetterRepository.getAll(),
  )

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        setApplications,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  )
}
