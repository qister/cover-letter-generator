import { Link } from 'react-router-dom'

import { Icon, Dots } from '../../ui'
import { useApplications } from '../../applicationsContext'
import { totalApplicationsGoal } from '../../constants'
import logo from './logo.svg'

import styles from './styles.module.css'

export const Header = () => {
  const { applications } = useApplications()

  return (
    <header className={styles.header}>
      <Link to='/'>
        <div className={styles.logo}>
          <img src={logo} alt='logo' />
        </div>
      </Link>
      <div className={styles.progress}>
        <span className={styles.totalText}>
          {applications.length}/{totalApplicationsGoal} applications generated
        </span>
        {applications.length < totalApplicationsGoal ? (
          <Dots
            total={totalApplicationsGoal}
            filled={applications.length}
            type='circles'
          />
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
