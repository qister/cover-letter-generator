import { Link } from 'react-router-dom'

import { useApplications } from '../../applicationsContext'
import { totalApplicationsGoal } from '../../constants'
import { Icon, Dots, Button } from '../../ui'

import styles from './styles.module.css'

type Props =
  | { action: 'button'; onCreate: () => void }
  | { action: 'link'; to: string }

export const Goal = (props: Props) => {
  const { applications } = useApplications()

  return (
    <div className={styles.goalSection}>
      <h2 className={styles.goalTitle}>Hit your goal</h2>
      <p className={styles.goalDescription}>
        Generate and send out couple more job applications
        <br />
        today to get hired faster
      </p>

      {props.action === 'link' ? (
        <Link to={props.to}>
          <Button size='l' text='Create New' icon={<Icon image='plus' />} />
        </Link>
      ) : (
        <Button
          size='l'
          text='Create New'
          icon={<Icon image='plus' />}
          onClick={props.onCreate}
        />
      )}
      <div className={styles.dotsSection}>
        <Dots
          total={totalApplicationsGoal}
          filled={applications.length}
          type='lines'
        />
        <span className={styles.progressText}>
          {applications.length} out of {totalApplicationsGoal}
        </span>
      </div>
    </div>
  )
}
