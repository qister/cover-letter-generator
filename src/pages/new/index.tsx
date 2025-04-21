import { useCallback, useMemo, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'

import {
  Button,
  Icon,
  InputWithLabel,
  Separator,
  Space,
  TextAreaWithLabel,
  Title,
} from '../../ui'
import { Goal, PreviewContent } from '../../components'
import {
  addCoverLetterToStorage,
  // generateCoverLetterOffline
} from '../../utils/common'
import { totalApplicationsGoal } from '../../utils/constants'
import { useApplicationsCount } from '../../totalApplicationsContext'
import { generateCoverLetter } from '../../api/generateCoverLetter'

import styles from './styles.module.css'

const MAX_CHARS = 1200

type Inputs = {
  jobTitle: string
  companyName: string
  skills: string
  additionalDetails: string
}

export const New = () => {
  const { applicationsCount, setApplicationsCount } = useApplicationsCount()
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewText, setPreviewText] = useState<string>()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    setFocus,
  } = useForm<Inputs>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data: Inputs) => {
      setIsGenerating(true)
      // const { error, coverLetter } = await generateCoverLetterOffline(data)
      const { error, coverLetter } = await generateCoverLetter(data)
      setIsGenerating(false)
      if (error) {
        setPreviewText(error)
        return
      }
      setPreviewText(coverLetter)
      const total = addCoverLetterToStorage(coverLetter)
      setApplicationsCount(total)
    },
    [setApplicationsCount],
  )

  const [jobTitle, companyName, additionalDetails] = useWatch({
    control,
    name: ['jobTitle', 'companyName', 'additionalDetails'],
  })

  const customTitle = useMemo(
    () => [jobTitle, companyName].filter(Boolean).join(', '),
    [jobTitle, companyName],
  )

  return (
    <div>
      <div className={styles.topSection}>
        <div className={styles.formSection}>
          <Title
            text={customTitle || 'New application'}
            mode={customTitle ? 'primary' : 'secondary'}
          />
          <Separator className={styles.separator} />

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <InputWithLabel
                  {...register('jobTitle', { required: true })}
                  label='Job title'
                  placeholder='Product manager'
                />
              </div>

              <div className={styles.formGroup}>
                <InputWithLabel
                  {...register('companyName', { required: true })}
                  label='Company'
                  placeholder='Apple'
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <InputWithLabel
                {...register('skills', { required: true })}
                label='I am good at...'
                placeholder='HTML, CSS and doing things in time'
              />
            </div>

            <div className={styles.formGroup}>
              <TextAreaWithLabel
                {...register('additionalDetails', {
                  maxLength: MAX_CHARS,
                })}
                label='Additional details'
                placeholder='Describe why you are a great fit or paste your bio'
                hasError={Boolean(errors.additionalDetails)}
              />
              <div className={styles.charCount}>
                {(additionalDetails || '').length}/{MAX_CHARS}
              </div>
            </div>
            {previewText ? (
              <Button
                icon={<Icon image='repeat' />}
                text='Try Again'
                size='l'
                allWidth
                mode='secondary'
                onClick={(e) => {
                  e.preventDefault()
                  setPreviewText(undefined)
                  setFocus('jobTitle')
                }}
              />
            ) : (
              <Button
                type='submit'
                text='Generate Now'
                size='l'
                allWidth
                disabled={!isValid || isGenerating}
                isLoading={isGenerating}
              />
            )}
          </form>
        </div>
        <div className={styles.previewContentWrapper}>
          <PreviewContent
            content={previewText}
            isLoading={isGenerating}
            placeholder='Your personalized job application will appear here...'
          />
        </div>
      </div>

      {applicationsCount < totalApplicationsGoal && (
        <>
          <Space />
          <Goal />
          <Space />
        </>
      )}
      <div />
    </div>
  )
}
