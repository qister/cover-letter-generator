import { Link } from 'react-router-dom'
import cn from 'classnames'

import { Icon } from '../../ui'
import { useApplicationsCount } from '../../totalApplicationsContext'
import { totalApplicationsGoal } from '../../utils/constants'
import logo from './logo.svg'

import styles from './styles.module.css'

const Dots = ({ total, filled }: { filled: number; total: number }) => (
  <div className={styles.progressDots}>
    {Array(total)
      .fill(null)
      .map((_, i) => (
        <div
          key={i}
          className={cn(styles.dot, { [styles.filled]: i < filled })}
        />
      ))}
  </div>
)

export const Header = () => {
  const { applicationsCount } = useApplicationsCount()

  return (
    <header className={styles.header}>
      <Link to='/'>
        <div className={styles.logo}>
          <img src={logo} alt='logo' />
        </div>
      </Link>
      <div className={styles.progress}>
        <span className={styles.totalText}>
          {applicationsCount}/{totalApplicationsGoal} applications generated
        </span>
        {applicationsCount < totalApplicationsGoal ? (
          <Dots total={totalApplicationsGoal} filled={applicationsCount} />
        ) : (
          <Icon image='check' alt='done' />
        )}
        <Link to='/all' className={styles.homeButton}>
          <Icon image='home' alt='home' />
        </Link>
      </div>
    </header>
  )
}
