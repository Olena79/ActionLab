import React from 'react'
import ReactPlayer from 'react-player/youtube'

type YouTubePlayerProps = {
	videoUrl: string
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoUrl }) => {
	return (
		<div
			style={{
				position: 'relative',
				paddingTop: '56.25%', // 16:9
			}}
		>
			<ReactPlayer
				url={videoUrl}
				width='100%'
				height='100%'
				maxHeight={300}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
				}}
				controls
			/>
		</div>
	)
}

export default YouTubePlayer
