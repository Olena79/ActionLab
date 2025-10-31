import { Box, styled } from '@mui/material'
import React, { useEffect, useRef } from 'react'

interface VideoPlayerProps {
	src: string
	poster: string
}

export const RoundVideoPlayer: React.FC<VideoPlayerProps> = ({
	src,
	poster,
}) => {
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
		<RoundBox>
			<video
				ref={videoRef}
				src={src}
				loop
				muted
				playsInline
				preload='none'
				poster={poster}
				style={{
					width: '100%',
					height: 'auto',
					objectFit: 'cover',
					objectPosition: 'center',
				}}
			/>
		</RoundBox>
	)
}

//===============================
const RoundBox = styled(Box)(() => ({
	width: 300,
	height: 300,
	marginTop: 40,
	marginLeft: 60,
	borderRadius: '50%',
	overflow: 'hidden',
	position: 'relative',
	boxShadow:
		'#FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, inset 0px -2px 39px -16px rgba(245,221,71,0)',

	'@media (max-width: 600px)': {
		width: 200,
		height: 200,
		marginTop: 20,
		marginLeft: 0,
	},
}))
