import React from 'react'

type NoIconProps = {
	className?: string
	width?: number
	height?: number
}

const NoIcon: React.FC<NoIconProps> = ({
	className = '',
	width = 16,
	height = 16,
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<g clipPath='url(#clip0_2497_25965)'>
				<path
					d='M7 7L17 17M7 17L17 7'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</g>
			<defs>
				<clipPath id='clip0_2497_25965'>
					<rect width={width} height={height} fill='none' />
				</clipPath>
			</defs>
		</svg>
	)
}

export default NoIcon
