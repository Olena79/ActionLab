import React, { useEffect, useRef } from 'react'

interface VideoPlayerProps {
	src: string
	poster: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (videoRef.current) {
						if (entry.isIntersecting) {
							videoRef.current.play()
						} else {
							videoRef.current.pause()
						}
					}
				})
			},
			{ threshold: 0.25 }
		)

		if (videoRef.current) observer.observe(videoRef.current)
		return () => observer.disconnect()
	}, [])

	return (
		<video
			ref={videoRef}
			src={src}
			loop
			muted
			playsInline
			preload='none'
			poster={poster}
			style={{ width: 'auto', height: '188px', objectFit: 'cover' }}
		/>
	)
}
