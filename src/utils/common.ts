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

const generateId = () => Date.now().toString()

type CLItem = { id: string; cl: string }

export const addCoverLetterToStorage = (cl: string) => {
  const clList = localStorage.getItem('clList')
  const id = generateId()
  if (!clList) {
    localStorage.setItem('clList', JSON.stringify([{ id, cl }]))
    return 1
  }

  const parsedList = JSON.parse(clList) as CLItem[]
  parsedList.push({ id, cl })
  localStorage.setItem('clList', JSON.stringify(parsedList))

  return parsedList.length
}

export const getTotalCoverLetterCount = () => {
  const clList = localStorage.getItem('clList')
  if (!clList) return 0
  return JSON.parse(clList).length
}

export const getCoverLetterList = (): CLItem[] => {
  const clList = localStorage.getItem('clList')
  if (!clList) {
    return []
  }

  const parsedList = JSON.parse(clList) as CLItem[]

  return parsedList
}

export const setCoverLetterList = (clList: CLItem[]) => {
  localStorage.setItem('clList', JSON.stringify(clList))
}
