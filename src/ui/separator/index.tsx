import cn from 'classnames'

import styles from './styles.module.css'

export const Separator = ({ className }: { className?: string }) => (
  <hr className={cn(styles.separator, className)} />
)
