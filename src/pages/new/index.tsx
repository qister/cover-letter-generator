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
import { totalApplicationsGoal } from '../../utils/constants'
import { useApplications } from '../../applicationsContext'
import { generateCoverLetter } from '../../api/generateCoverLetter'
import { coverLetterRepository } from '../../repositories'

import styles from './styles.module.css'

const MAX_CHARS = 1200

type Inputs = {
  jobTitle: string
  companyName: string
  skills: string
  additionalDetails: string
}

const generateId = () => Date.now().toString()

export const New = () => {
  const { applications, setApplications } = useApplications()
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewText, setPreviewText] = useState<string>()
  const [lastClId, setLastClId] = useState<string>()

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
      if (lastClId) {
        coverLetterRepository.deleteById(lastClId)
      }
      const id = generateId()
      setLastClId(id)
      coverLetterRepository.add({ cl: coverLetter, id })
      setApplications(coverLetterRepository.getAll())
    },
    [lastClId, setApplications],
  )

  const [jobTitle, companyName, additionalDetails] = useWatch({
    control,
    name: ['jobTitle', 'companyName', 'additionalDetails'],
  })

  const customTitle = useMemo(
    () => [jobTitle, companyName].filter(Boolean).join(', '),
    [jobTitle, companyName],
  )

  const onGoalClick = useCallback(() => {
    setFocus('jobTitle')
    setPreviewText(undefined)
    setLastClId(undefined)
  }, [setFocus])

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
            <Button
              icon={previewText ? <Icon image='repeat' /> : undefined}
              text={previewText ? 'Try Again' : 'Generate Now'}
              size='l'
              allWidth
              mode={previewText ? 'secondary' : 'primary'}
              type='submit'
              disabled={!isValid || isGenerating}
              isLoading={isGenerating}
            />
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

      {applications.length < totalApplicationsGoal && (
        <>
          <Space />
          <Goal action='button' onCreate={onGoalClick} />
          <Space />
        </>
      )}
      <div />
    </div>
  )
}
