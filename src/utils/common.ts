const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const generateCoverLetterOffline = async ({
  jobTitle,
  companyName,
  skills,
  additionalDetails,
}: {
  jobTitle: string
  companyName: string
  skills: string
  additionalDetails: string
}) => {
  await delay(2000)
  const coverLetter = `Dear ${companyName} Team,

I am writing to express my interest in the ${jobTitle} position.

My experience in the realm combined with my skills in ${skills} make me a strong candidate for this role.

${additionalDetails}

I am confident that my skills and enthusiasm would translate into valuable contributions to your esteemed organization.

Thank you for considering my application. I eagerly await the opportunity to discuss my qualifications further.`

  return { error: undefined, coverLetter }
}
