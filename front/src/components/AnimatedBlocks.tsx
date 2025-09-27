import { styled, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '../translation/TranslationContext'

function throttle<T extends (...args: any[]) => void>(func: T, limit: number) {
	let inThrottle = false
	return function (this: any, ...args: Parameters<T>) {
		if (!inThrottle) {
			func.apply(this, args)
			inThrottle = true
			setTimeout(() => (inThrottle = false), limit)
		}
	}
}

const ScrollAnimatedBlocks: React.FC = () => {
	const { t } = useTranslation()
	const [scrollPercent, setScrollPercent] = useState(0)
	const isMobile = useMediaQuery('(max-width:600px)')

	useEffect(() => {
		const handleScroll = throttle(() => {
			const scrollHeight =
				document.documentElement.scrollHeight - window.innerHeight
			const percent =
				scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0
			setScrollPercent(percent)
		}, 16)

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const blocks = [
		{
			text: 'slogan.text1',
			text1: 'slogan.text11',
			startPercent: isMobile ? 3 : 7,
			img: 'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758030024/fghfhsz_pavzjt.png',
		},
		{
			text: 'slogan.text2',
			text1: 'slogan.text22',
			startPercent: 10,
			img: 'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758028612/fghfhsz_uhuoci.png',
		},
		{
			text: 'slogan.text3',
			text1: 'slogan.text33',
			startPercent: 13,
			img: 'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758027828/wrestlingpng_def7pe.png',
		},
		{
			text: 'slogan.text4',
			text1: 'slogan.text44',
			startPercent: 16,
			img: 'https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758032094/%D1%81%D0%B0%D0%BC%D0%BF%D0%B8%D1%80_p8oorr.png',
		},
	]

	const animationRange = 10 // на скільки % скролу триває анімація

	return (
		<Wrapper>
			{blocks.map((block, index) => {
				// рахуємо прогрес для кожного блоку
				const progress = Math.max(
					0,
					Math.min(1, (scrollPercent - block.startPercent) / animationRange)
				)

				// різні напрямки руху
				const translateY = -100 + progress * 100

				return (
					<BoxItem
						key={index}
						style={{
							transform: `translateY(${translateY}vh)`,
							opacity: progress,
							willChange: 'transform, opacity',
						}}
					>
						<BoxInfo
							sx={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
						>
							<IconWrapper>
								<img src={block.img} alt='Icon' height={70} />
							</IconWrapper>
							<TextBox>
								<TextWrapper>{t(block.text)}</TextWrapper>
								<TextWrapper>{t(block.text1)}</TextWrapper>
							</TextBox>
						</BoxInfo>
					</BoxItem>
				)
			})}
		</Wrapper>
	)
}

export default ScrollAnimatedBlocks

// ===================== STYLES =====================

const Wrapper = styled('div')({
	marginTop: 30,
	padding: '40px 20px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '40px',
	backgroundImage:
		'url(https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758026016/fon_qsmvid.png)',
	backgroundSize: 'cover', // Покриває всю область
	backgroundPosition: 'center', // Центрує зображення
	backgroundRepeat: 'no-repeat', // Не повторює зображення
	width: '100%',
	overflowX: 'hidden',
})

const BoxItem = styled('div')(({ theme }) => ({
	padding: '12px 20px',
	border: `5px solid ${theme.palette.primary.main}`,
	borderRadius: '12px',
	backgroundColor: theme.palette.background.paper,
	width: '80%',
	fontSize: '20px',
	fontWeight: 'bold',
	color: theme.palette.primary.main,
	transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
	'@media (max-width: 600px)': {
		fontSize: '13px',
		maxWidth: 400,
	},
}))

const BoxInfo = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 12,
	width: '100%',
	border: `3px solid ${theme.palette.secondary.main}`,
	padding: '12px 20px',
	borderRadius: '8px',
}))

const IconWrapper = styled('div')(({ theme }) => ({}))

const TextWrapper = styled('div')({
	textAlign: 'center',
})

const TextBox = styled('div')(() => ({
	display: 'flex',
	gap: 2,
	'@media (max-width: 850px)': {
		flexDirection: 'column',
	},
}))
