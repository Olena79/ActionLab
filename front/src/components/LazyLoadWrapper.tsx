import React, { Suspense, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const LazyLoadWrapper = ({ children }: { children: React.ReactNode }) => {
	const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
	const [show, setShow] = useState(false)

	React.useEffect(() => {
		if (inView) setShow(true)
	}, [inView])

	return (
		<div ref={ref}>
			{show ? (
				<Suspense fallback={<div>Завантаження...</div>}>{children}</Suspense>
			) : (
				<div style={{ minHeight: '200px' }} /> // заглушка
			)}
		</div>
	)
}

export default LazyLoadWrapper
