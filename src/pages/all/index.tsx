import { Link } from 'react-router-dom'

import { Button, Icon, Separator, Space, Title } from '../../ui'
import { Goal, PreviewContent } from '../../components'
import { useApplications } from '../../applicationsContext'
import { totalApplicationsGoal } from '../../utils/constants'
import { coverLetterRepository } from '../../repositories'

import styles from './styles.module.css'

export const All = () => {
  const { applications, setApplications } = useApplications()

  return (
    <div>
      <div className={styles.header}>
        <Title text='Applications' size='l' />
        <Link to='/new'>
          <Button text='Create New' size='m' icon={<Icon image='plus' />} />
        </Link>
      </div>
      <Separator className={styles.separator} />

      <div className={styles.grid}>
        {applications.map(({ id, cl }) => (
          <div key={id} className={styles.card}>
            <PreviewContent
              content={cl}
              onDelete={() => {
                const newApplications = applications.filter(
                  ({ id: cvId }) => cvId !== id,
                )
                setApplications(newApplications)
                coverLetterRepository.setAll(newApplications)
              }}
            />
          </div>
        ))}
      </div>
      {applications.length < totalApplicationsGoal && (
        <Goal action='link' to='/new' />
      )}
      <Space />
    </div>
  )
}
