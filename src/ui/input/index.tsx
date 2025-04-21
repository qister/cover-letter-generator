import { useId } from 'react'

import styles from './styles.module.css'

type Props = React.JSX.IntrinsicElements['input'] & { label?: string }

export const InputWithLabel = ({ label, ...props }: Props) => {
  const id = useId()
  
  return (
    <>
      {label && <label className={styles.label} htmlFor={id}>{label}</label>}
      <input id={id} className={styles.input} {...props} />
    </>
  )
}
