import { useCallback, useMemo, useState } from 'react'
import cn from 'classnames'

import { Icon } from '../../ui'

import styles from './styles.module.css'

interface PreviewContentProps {
  content?: string
  onDelete?: () => void
  isLoading?: boolean
  placeholder?: string
}

export const PreviewContent = ({
  content,
  onDelete,
  isLoading = false,
  placeholder = '',
}: PreviewContentProps) => {
  const [copied, setCopied] = useState(false)

  const onCopy = useCallback(() => {
    if (!content) return

    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [content])

  const textContent = useMemo(
    () => content ?? placeholder,
    [content, placeholder],
  )

  return (
    <div className={cn(styles.previewContainer)}>
      <div
        className={cn(styles.previewContent, { [styles.hidden]: isLoading })}
      >
        {textContent}
      </div>
      {isLoading && (
        <div className={styles.sphereContainer}>
          <div className={cn(styles.sphere)} />
        </div>
      )}
      <div className={styles.fadeOverlay} />
      <div className={styles.overlay} />
      <button
        className={cn(styles.copyButton, styles.previewContextButtonText, {
          [styles.hidden]: isLoading,
        })}
        onClick={onCopy}
        disabled={isLoading}
      >
        {copied ? 'Copied' : 'Copy to clipboard'}
        <Icon image='copy' alt='copy' />
      </button>
      {onDelete && (
        <button
          className={cn(styles.deleteButton, styles.previewContextButtonText, {
            [styles.hidden]: isLoading,
          })}
          onClick={onDelete}
          disabled={isLoading}
        >
          <Icon image='delete' alt='delete' />
          Delete
        </button>
      )}
    </div>
  )
}
