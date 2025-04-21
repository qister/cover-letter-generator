export type Inputs = {
  jobTitle: string
  companyName: string
  skills: string
  additionalDetails: string
}

type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

const buildCoverLetterPrompt = ({
  jobTitle,
  companyName,
  skills,
  additionalDetails,
}: Inputs): string =>
  `Write a professional cover letter for the position of ${jobTitle} at ${companyName}. Highlight the following skills: ${skills}. Additional details: ${additionalDetails}. Try to make it in 500-700 chars`

const buildChatRequest = (
  prompt: string,
): {
  model: string
  messages: ChatMessage[]
  temperature: number
} => ({
  model: 'gpt-4',
  temperature: 0.7,
  messages: [
    {
      role: 'system',
      content:
        'You are a professional career assistant helping users write effective job applications.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ],
})

const fetchCoverLetter = async (
  requestBody: object,
): Promise<{ error?: string; coverLetter: string }> => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('OpenAI API error:', data)
      return {
        error: data?.error?.message ?? 'Error from OpenAI API',
        coverLetter: '',
      }
    }

    const result = data?.choices?.[0]?.message?.content
    if (!result) {
      return { error: 'No cover letter was generated.', coverLetter: '' }
    }

    return { coverLetter: result }
  } catch (error) {
    console.error('Request failed:', error)
    return { error: 'Failed to connect to OpenAI API.', coverLetter: '' }
  }
}

export const generateCoverLetter = async (inputs: Inputs) => {
  const prompt = buildCoverLetterPrompt(inputs)
  const requestBody = buildChatRequest(prompt)

  return await fetchCoverLetter(requestBody)
}
