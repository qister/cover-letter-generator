import { Link } from 'react-router-dom'
import cn from 'classnames'

import { useApplicationsCount } from '../../totalApplicationsContext'
import { Button } from '../../ui/button'
import { totalApplicationsGoal } from '../../utils/constants'
import { Icon } from '../../ui'

import styles from './styles.module.css'

const Dots = ({ total, filled }: { total: number; filled: number }) => (
  <div className={styles.progressDots}>
    {Array(total)
      .fill(null)
      .map((_, i) => (
        <div
          key={i}
          className={cn(styles.dot, {
            [styles.filled]: i < filled,
          })}
        />
      ))}
  </div>
)

type Props =
  | { action: 'button'; onCreate: () => void }
  | { action: 'link'; to: string }

export const Goal = (props: Props) => {
  const { applicationsCount } = useApplicationsCount()

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
        <Dots total={totalApplicationsGoal} filled={applicationsCount} />
        <span className={styles.progressText}>
          {applicationsCount} out of {totalApplicationsGoal}
        </span>
      </div>
    </div>
  )
}
