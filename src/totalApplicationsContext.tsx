import { ReactNode, createContext, useContext, useState } from 'react'

import { getTotalCoverLetterCount } from './utils/common'

const ApplicationsCountContext = createContext<{
  applicationsCount: number
  setApplicationsCount: (total: number) => void
}>({ applicationsCount: 0, setApplicationsCount: () => {} })

// eslint-disable-next-line react-refresh/only-export-components
export const useApplicationsCount = () => useContext(ApplicationsCountContext)

export const ApplicationsCountProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [applicationsCount, setApplicationsCount] = useState<number>(
    getTotalCoverLetterCount(),
  )

  return (
    <ApplicationsCountContext.Provider
      value={{ applicationsCount, setApplicationsCount }}
    >
      {children}
    </ApplicationsCountContext.Provider>
  )
}
