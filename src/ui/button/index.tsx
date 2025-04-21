import { type ReactNode } from 'react'
import cn from 'classnames'

import styles from './styles.module.css'

type Props = React.JSX.IntrinsicElements['button'] & {
  isLoading?: boolean
  text?: string
  allWidth?: boolean
  disabled?: boolean
  size?: 'm' | 'l'
  icon?: ReactNode
  mode?: 'primary' | 'secondary'
}

export const Button = ({
  isLoading,
  text,
  allWidth = false,
  disabled,
  size = 'm',
  icon,
  mode = 'primary',
  ...props
}: Props) => (
  <button
    className={cn(
      styles.button,
      allWidth && styles.allWidth,
      styles[size],
      styles[mode],
    )}
    disabled={isLoading || disabled}
    {...props}
  >
    {isLoading ? (
      <span className={styles.spinner} />
    ) : (
      <>
        {icon} {text}
      </>
    )}
  </button>
)
