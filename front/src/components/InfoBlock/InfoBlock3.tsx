import React, { useEffect, useRef } from 'react'
import { Box, styled } from '@mui/material'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '../../translation/TranslationContext'

// Реєструємо ScrollTrigger плагін
gsap.registerPlugin(ScrollTrigger)

const InfoBlock3: React.FC = () => {
	const { t } = useTranslation()

	// Реф для контейнера
	const containerRef = useRef<HTMLDivElement>(null)

	// Рефи для картинок
	const img1Ref = useRef<HTMLImageElement>(null)
	const img2Ref = useRef<HTMLImageElement>(null)
	const img3Ref = useRef<HTMLImageElement>(null)
	const img4Ref = useRef<HTMLImageElement>(null)

	// Рефи для тексту
	const text1Ref = useRef<HTMLDivElement>(null)
	const text2Ref = useRef<HTMLDivElement>(null)
	const text3Ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const ctx = gsap.context(() => {
			// Початкові стани для картинок
			gsap.set(img1Ref.current, { x: 200, opacity: 0 }) // справа
			gsap.set(img2Ref.current, { x: -200, opacity: 0 }) // зліва
			gsap.set(img3Ref.current, { y: 200, opacity: 0 }) // знизу
			gsap.set(img4Ref.current, { scale: 0, opacity: 0 }) // спереду

			// Початкові стани для тексту
			gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
				x: 100,
				opacity: 0,
			})

			// Створюємо timeline з ScrollTrigger
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top 70%',
					end: 'bottom 30%',
					once: true, // анімація спрацьовує тільки один раз
				},
			})

			// Анімації картинок (послідовно)
			tl.to(img1Ref.current, {
				x: 0,
				opacity: 1,
				duration: 0.8,
				ease: 'power2.out',
			})
				.to(
					img2Ref.current,
					{
						x: 0,
						opacity: 1,
						duration: 0.8,
						ease: 'power2.out',
					},
					'-=0.5'
				) // почати на 0.5с раніше від кінця попередньої анімації
				.to(
					img3Ref.current,
					{
						y: 0,
						opacity: 1,
						duration: 0.8,
						ease: 'power2.out',
					},
					'-=0.5'
				)
				.to(
					img4Ref.current,
					{
						scale: 1,
						opacity: 1,
						duration: 0.8,
						ease: 'back.out(1.7)',
					},
					'-=0.5'
				)

				// Анімації тексту (всі справа, з затримками)
				.to(
					text1Ref.current,
					{
						x: 0,
						opacity: 1,
						duration: 0.6,
						ease: 'power2.out',
					},
					'+=0.3'
				) // почати через 0.3с після попередньої анімації
				.to(
					text2Ref.current,
					{
						x: 0,
						opacity: 1,
						duration: 0.6,
						ease: 'power2.out',
					},
					'-=0.4'
				)
				.to(
					text3Ref.current,
					{
						x: 0,
						opacity: 1,
						duration: 0.6,
						ease: 'power2.out',
					},
					'-=0.4'
				)
		}, containerRef)

		// Cleanup функція
		return () => ctx.revert()
	}, [])

	return (
		<StyledBlock3 ref={containerRef}>
			<Box>
				<StyledImg1
					ref={img1Ref}
					src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758124934/Screenshot_2_xqho8d.png'
					alt='Cinema'
				/>
				<StyledImg2
					ref={img2Ref}
					src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758124823/3_eun0ub.png'
					alt='Cinema'
				/>
				<StyledImg3
					ref={img3Ref}
					src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758122830/2_ixxxv4.png'
					alt='Cinema'
				/>
				<StyledImg4
					ref={img4Ref}
					src='https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758122831/1_esdfbb.png'
					alt='Cinema'
				/>
			</Box>

			<StyledDescBox>
				<StyledDesc ref={text1Ref}>{t('infoBlock.block4.text1')}</StyledDesc>
				<StyledDesc ref={text2Ref}>{t('infoBlock.block4.text2')}</StyledDesc>
				<StyledDesc ref={text3Ref}>{t('infoBlock.block4.text3')}</StyledDesc>
			</StyledDescBox>
		</StyledBlock3>
	)
}

export default InfoBlock3

//=======================   STYLES   =====================//

const StyledBlock3 = styled('div')(({ theme }) => ({
	position: 'relative',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	minHeight: 500,
	gap: 2,
	backgroundImage:
		'url(https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758120424/fon3_qpwah1.jpg)',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center bottom',
	'@media (max-width: 900px)': {},
	'@media (max-width: 600px)': {
		backgroundImage:
			'url(https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758121642/istockphoto-1470289068-612x612_j3skmw.jpg)',
	},
}))

const StyledDescBox = styled('div')(({ theme }) => ({
	marginTop: 180,
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	'@media (max-width: 900px) and (min-width: 600px)': {
		marginTop: 200,
	},
	'@media (max-width: 600px)': {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 8,
	},
}))

const StyledDesc = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	color: theme.palette.primary.main,
	height: 'fit-content',
	fontSize: 30,
	fontWeight: 700,
	zIndex: 999,
	'@media (max-width: 900px) and (min-width: 600px)': {},
}))

const StyledImg1 = styled('img')(() => ({
	position: 'absolute',
	left: '30%',
	top: 20,
	width: 200,
	'@media (max-width: 900px) and (min-width: 600px)': {
		left: '26%',
	},
	'@media (max-width: 600px)': {
		width: 130,
		left: '20%',
		top: 40,
	},
}))

const StyledImg2 = styled('img')(() => ({
	position: 'absolute',
	right: '37%',
	top: 20,
	width: 150,
	'@media (max-width: 900px) and (min-width: 600px)': {
		right: '30%',
	},
	'@media (max-width: 600px)': {
		right: '22%',
		width: 120,
		top: 40,
	},
}))

const StyledImg3 = styled('img')(() => ({
	position: 'absolute',
	top: 5,
	left: '40%',
	width: 150,
	'@media (max-width: 900px) and (min-width: 600px)': {
		top: 20,
		left: '38%',
	},
	'@media (max-width: 600px)': {
		left: '34%',
		top: 20,
		width: 140,
	},
}))

const StyledImg4 = styled('img')(() => ({
	position: 'absolute',
	top: 120,
	left: '36%',
	width: 250,
	'@media (max-width: 900px) and (min-width: 600px)': {
		top: 137,
		left: '32%',
	},
	'@media (max-width: 600px)': {
		left: '22%',
		top: 150,
	},
}))
