import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Box, styled } from '@mui/material'
import { useTranslation } from '../translation/TranslationContext'

const AnimatedTexts: React.FC = () => {
	const { t } = useTranslation()
	const titleRef = useRef<HTMLDivElement>(null)
	const descRef = useRef<HTMLDivElement>(null)
	const subDesc1Ref = useRef<HTMLDivElement>(null)
	const subDesc2Ref = useRef<HTMLDivElement>(null)
	const subDesc3Ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const tl = gsap.timeline()

		if (titleRef.current) {
			tl.fromTo(
				titleRef.current,
				{ y: -200, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1 }
			)
		}

		if (descRef.current) {
			tl.fromTo(descRef.current, { opacity: 0 }, { opacity: 1, duration: 2 })
		}

		if (subDesc1Ref.current) {
			tl.fromTo(
				subDesc1Ref.current,
				{ y: 200, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1 }
			)
		}

		if (subDesc2Ref.current) {
			tl.fromTo(
				subDesc2Ref.current,
				{ y: 200, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1 }
			)
		}

		if (subDesc3Ref.current) {
			tl.fromTo(
				subDesc3Ref.current,
				{ y: 200, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1 }
			)
		}
	}, [])

	return (
		<Wrapper>
			<Text1 ref={titleRef}>{t('mainTitle')}</Text1>
			<Text2 ref={descRef}>{t('mainTitle2')}</Text2>
			<BoxGap>
				<BoxGrid>
					<Text3 ref={subDesc1Ref}>{t('mainDesc01')}</Text3>
					<span> </span>
					<span> </span>
				</BoxGrid>

				<BoxGrid>
					<span> </span>
					<Text3 ref={subDesc2Ref}>{t('mainDesc02')}</Text3>
					<span> </span>
				</BoxGrid>

				<BoxGrid>
					<span> </span>
					<span> </span>
					<Text3 ref={subDesc3Ref}>{t('mainDesc03')}</Text3>
				</BoxGrid>
			</BoxGap>
		</Wrapper>
	)
}

export default AnimatedTexts

// ===================== STYLES =====================
const Wrapper = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: 32,
	fontWeight: 600,
	backgroundImage:
		'url(https://res.cloudinary.com/dsgqhwqr7/image/upload/v1757667229/photo_2025-09-12_00-08-59_adifid.jpg)',
	backgroundSize: 'cover', // Покриває всю область
	backgroundPosition: 'center', // Центрує зображення
	backgroundRepeat: 'no-repeat', // Не повторює зображення
	width: '100%',
	padding: '160px 30px 80px 30px',
	'@media (max-width: 600px)': {
		backgroundImage:
			'url(https://res.cloudinary.com/dsgqhwqr7/image/upload/v1758258906/sdfg_ldaufp.png)',
	},
}))

const Text1 = styled('div')(({ theme }) => ({
	fontSize: '22px',
	fontWeight: 700,
	color: theme.palette.primary.main,
	backgroundColor: theme.palette.background.paper,
	border: `1px solid ${theme.palette.secondary.main}`,
	padding: '16px 16px 20px 16px',
	borderRadius: 24,
	width: 'fit-content',
	textAlign: 'center',
	'@media (max-width: 600px)': {
		fontSize: '16px',
	},
}))

const Text2 = styled('div')(({ theme }) => ({
	fontSize: '27px',
	fontWeight: 700,
	color: theme.palette.primary.main,
	backgroundColor: theme.palette.secondary.main,
	padding: '6px 16px 10px 16px',
	borderRadius: 24,
	width: 'fit-content',
	textAlign: 'center',
}))

const Text3 = styled('div')(({ theme }) => ({
	fontSize: '20px',
	fontWeight: 600,
	color: theme.palette.secondary.main,
	backgroundColor: theme.palette.primary.main,
	padding: '16px 16px 20px 16px',
	borderRadius: 24,
	width: 'fit-content',
	textAlign: 'center',
	whiteSpace: 'nowrap',
}))

const BoxGap = styled(Box)({
	'@media (max-width: 600px)': {
		display: 'flex',
		flexDirection: 'column',
		gap: 12,
	},
})

const BoxGrid = styled(Box)({
	display: 'grid',
	gridTemplateColumns: '1fr 1fr 1fr',
	justifyItems: 'center',
	'@media (max-width: 600px)': {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
