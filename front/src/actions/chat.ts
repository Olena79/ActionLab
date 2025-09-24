const baseURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:10000'

export const sendChatMessage = async (
	history: { role: string; text: string }[],
	newMessage: string,
	onChunk: (chunk: string) => void
) => {
	const response = await fetch(`${baseURL}/chat/stream`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			history,
			newMessage,
		}),
	})

	console.log('Від чату: ', response)

	if (!response.body) throw new Error('ReadableStream not supported')

	const reader = response.body.getReader()
	const decoder = new TextDecoder()

	while (true) {
		const { done, value } = await reader.read()
		if (done) break
		const chunk = decoder.decode(value, { stream: true })
		onChunk(chunk)
	}
}
