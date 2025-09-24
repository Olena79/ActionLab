import { Request, Response } from 'express'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const streamChat = async (
  req: Request,
  res: Response,
) => {
  try {
    const { history, newMessage } = req.body

    console.log('Від чату: ', history, newMessage)

    const formattedHistory = history.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.text,
    }))

    const messages = [
      {
        role: 'system',
        content:
          'Ти — асистент компанії, відповідай просто і зрозуміло.',
      },
      ...formattedHistory,
      { role: 'user', content: newMessage },
    ]

    res.setHeader(
      'Content-Type',
      'text/plain; charset=utf-8',
    )
    res.setHeader('Transfer-Encoding', 'chunked')

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      messages,
    })

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content
      if (text) res.write(text)
    }

    res.end()
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).send('Something went wrong')
  }
}
