import cn from 'classnames'

import styles from './styles.module.css'

export const Dots = ({
  total,
  filled,
  type = 'lines',
}: {
  total: number
  filled: number
  type: 'circles' | 'lines'
}) => (
  <div className={cn(styles[type], styles.progressDots)}>
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
