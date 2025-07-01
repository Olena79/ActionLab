import React from 'react'

type UserIconProps = {
	className?: string
	size?: number
}

const UserIcon: React.FC<UserIconProps> = ({ className = '', size = 24 }) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<path
				d='M8.69868 10.6456L8.59473 10.1565'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M13.5896 9.60602L13.4856 9.11694'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M8.5 15.5706C9.75834 15.8859 11.186 15.8861 12.6225 15.5012C14.0591 15.1163 15.2953 14.4023 16.2274 13.5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M12.5874 15.6374L13.0654 16.6112C13.4267 17.3473 14.3123 17.6568 15.0535 17.3059C15.8097 16.9479 16.1268 16.0405 15.7582 15.2894L15.2989 14.3538'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default UserIcon
