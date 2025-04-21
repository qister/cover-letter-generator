import { useId } from 'react'
import cn from 'classnames'

import styles from './styles.module.css'

type Props = React.JSX.IntrinsicElements['textarea'] & {
  label?: string
  hasError?: boolean
}

export const TextAreaWithLabel = ({ label, hasError, ...props }: Props) => {
  const id = useId()
  return (
    <>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(styles.textarea, hasError && styles.hasError)}
        {...props}
      />
    </>
  )
}
