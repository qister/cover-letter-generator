import cn from 'classnames'

import styles from './styles.module.css'

export const Title = ({
  text,
  size = 'm',
  mode = 'primary',
}: {
  text: string
  size?: 'm' | 'l'
  mode?: 'primary' | 'secondary'
}) => <h1 className={cn(styles.h1, styles[size], styles[mode])}>{text}</h1>
