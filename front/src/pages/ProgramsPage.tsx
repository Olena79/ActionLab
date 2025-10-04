import React, { useEffect, useState } from 'react'
import { Box, MenuItem, Select, styled, Typography } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { getSeminars, Seminar } from '../actions/seminarActions'
import { formatDate } from '../components/formatDate'
import ModulesSectionElem from '../components/ModulesSectionElem'
import { InfoMessage, ISeminar } from '../types/seminar'
import SeminarRegModal from '../components/auth/SeminarRegModal'
import ConfirmModal from '../components/ConfirmModal'

const colors = ['#ff6b6b', '#4ecdc4', '#ff9f1c', '#6c82fdff', '#1a535c']

const ProgramsPage: React.FC = () => {
	const [seminars, setSeminars] = useState<Seminar[]>([])
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0)

	const [openModal, setOpenModal] = useState(false)
	const [selectedSeminar, setSelectedSeminar] = useState<ISeminar | null>(null)
	const [infoMsg, setInfoMsg] = useState<InfoMessage | null>(null)

	const [showConfirm, setShowConfirm] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getSeminars()
				const sorted = [...data].sort((a, b) => a._id.localeCompare(b._id))
				setSeminars(sorted)
				if (sorted.length > 0) {
					setActiveIndex(0)
					setSelectedDateIndex(0)
					setSelectedSeminar({ ...sorted[0], selectedDate: sorted[0].dates[0] })
				}
			} catch (error) {
				console.error(error)
			}
		}
		fetchData()
	}, [])

	const handleTabClick = (index: number) => {
		setActiveIndex(index)
		setSelectedDateIndex(0)
		setSelectedSeminar({
			...seminars[index],
			selectedDate: seminars[index].dates[0],
		})
	}

	const handleDateChange = (dateIndex: number) => {
		setSelectedDateIndex(dateIndex)
		if (activeIndex !== null) {
			setSelectedSeminar({
				...seminars[activeIndex],
				selectedDate: seminars[activeIndex].dates[dateIndex],
			})
		}
	}

	const handleRegisterClick = () => {
		if (!selectedSeminar) return
		setOpenModal(true)
	}

	const handleSuccess = (info: InfoMessage) => {
		setInfoMsg(info)
		setShowConfirm(true)
		setOpenModal(false)
	}

	return (
		<PageWrapper>
			<Typography
				sx={{ textAlign: 'center', color: '#6C6D6F', fontWeight: 500 }}
			>
				Сценічний рух — це мистецтво вираження персонажа через пластику, жести
				та динаміку тіла. На семінарі ви опануєте техніки розкріпачення,
				координації та інтеграції руху в акторську гру.
			</Typography>
			<Box
				sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}
			>
				<p style={{ color: '#6C6D6F', fontWeight: 600, textAlign: 'center' }}>
					Обирайте зручну дату, переглядайте деталі та записуйтеся на незабутній
					досвід!
				</p>
			</Box>
			<FolderContainer>
				<TabsContainer>
					{seminars.map((seminar, index) => (
						<Tab
							key={seminar._id}
							onClick={() => handleTabClick(index)}
							style={{
								backgroundColor: colors[index % colors.length],
								zIndex: activeIndex === index ? 10 : 9 - index,
								transform:
									activeIndex === index ? 'translateY(-5px)' : 'translateY(0)',
							}}
							className={activeIndex === index ? 'active' : ''}
						>
							<TabLabel>{seminar.title}</TabLabel>
						</Tab>
					))}
				</TabsContainer>

				<FolderContent>
					<AnimatePresence mode='wait'>
						{activeIndex !== null && seminars[activeIndex] && (
							<motion.div
								key={activeIndex}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								style={{ width: '100%', height: '100%' }}
							>
								<ContentWrapper>
									<ContentHeader>
										<ContentTitle>{seminars[activeIndex].title}</ContentTitle>
										<ContentSubtitle>
											{seminars[activeIndex].description}
										</ContentSubtitle>
									</ContentHeader>

									<ContentBody>
										<InfoSection>
											<InfoItem>
												<InfoLabel
													sx={{
														color: colors[(activeIndex % colors.length) + 1],
													}}
												>
													Оберіть дату проведення:
												</InfoLabel>
												<Select
													value={selectedDateIndex}
													onChange={e =>
														handleDateChange(Number(e.target.value))
													}
													sx={{
														color: colors[activeIndex % colors.length],
														fontWeight: 700,
														'.MuiOutlinedInput-notchedOutline': {
															borderColor: colors[activeIndex % colors.length],
														},
														marginLeft: '-10px',
														minWidth: '220px',
														backgroundColor: 'white',
													}}
													MenuProps={{
														PaperProps: {
															sx: {
																backgroundColor: 'white', // фон для меню
															},
														},
													}}
												>
													{seminars[activeIndex].dates.map((d, i) => (
														<MenuItem
															sx={{ backgroundColor: 'white' }}
															key={i}
															value={i}
														>
															{formatDate(d.date)} - {formatDate(d.date2)}
														</MenuItem>
													))}
												</Select>
											</InfoItem>
											<InfoItem>
												<InfoLabel>Тривалість:</InfoLabel>
												<InfoValue>{seminars[activeIndex].duration}</InfoValue>
											</InfoItem>
											<InfoItem>
												<InfoLabel>Викладач:</InfoLabel>
												<InfoValue>
													{seminars[activeIndex].instructor}
												</InfoValue>
											</InfoItem>
										</InfoSection>

										{/* <DescriptionSection>
											<DescriptionText>
												{seminars[activeIndex].fullDescription}
											</DescriptionText>
										</DescriptionSection> */}

										<InfoItem>
											<InfoLabel>Специфіка програми:</InfoLabel>
											<InfoValue>{seminars[activeIndex].resultInfo}</InfoValue>
										</InfoItem>

										<ModulesSection>
											<SectionTitle>Модулі курсу</SectionTitle>
											<ModulesSectionElem
												modules={seminars[activeIndex]?.modules || []}
											/>
										</ModulesSection>
									</ContentBody>

									<ContentFooter>
										<PriceTag>{seminars[activeIndex].price} ₴</PriceTag>
										<Box sx={{ display: 'flex', justifyContent: 'center' }}>
											<RegisterButton
												style={{
													backgroundColor: colors[activeIndex % colors.length],
													width: 'fit-content',
													padding: '12px 62px',
												}}
												onClick={handleRegisterClick}
											>
												Записатися
											</RegisterButton>
										</Box>
									</ContentFooter>
								</ContentWrapper>
							</motion.div>
						)}
					</AnimatePresence>
				</FolderContent>
			</FolderContainer>

			{openModal && selectedSeminar && (
				<SeminarRegModal
					seminar={selectedSeminar}
					onClose={() => setOpenModal(false)}
					onSuccess={handleSuccess}
				/>
			)}

			<ConfirmModal
				open={Boolean(infoMsg) && showConfirm}
				title={infoMsg?.title ?? ''}
				message1={infoMsg?.message1 ?? ''}
				message2={infoMsg?.message2 ?? ''}
				showPayButton={infoMsg?.showPayButton ?? false}
				onClose={() => setShowConfirm(false)}
				userData={infoMsg?.userData}
				seminarData={infoMsg?.seminarData}
				userId={infoMsg?.userId}
			/>
		</PageWrapper>
	)
}

export default ProgramsPage

// ===================== STYLES =====================

const PageWrapper = styled(Box)(() => ({
	width: '100%',
	minHeight: '100vh',
	padding: '40px 20px',
	backgroundColor: '#f5f7fa',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'flex-start',
	gap: 16,
}))

const FolderContainer = styled(Box)(() => ({
	position: 'relative',
	width: '100%',
	maxWidth: '1200px',
	margin: '0 auto',
}))

const TabsContainer = styled(Box)(() => ({
	display: 'flex',
	gap: '4px',
	marginBottom: '-1px',
	paddingLeft: '20px',
	'@media (max-width: 768px)': {
		flexWrap: 'wrap',
		gap: '2px',
		paddingLeft: '10px',
	},
}))

const Tab = styled(Box)(() => ({
	padding: '12px 24px 16px 24px',
	borderRadius: '12px 12px 0 0',
	cursor: 'pointer',
	transition: 'all 0.3s ease',
	position: 'relative',
	minWidth: '120px',
	boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
	border: '2px solid rgba(255,255,255,0.2)',
	borderBottom: 'none',

	'&:hover': {
		transform: 'translateY(-3px) !important',
		boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
	},

	'&.active': {
		boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
		'&::after': {
			content: '""',
			position: 'absolute',
			bottom: '-2px',
			left: '0',
			right: '0',
			height: '4px',
			backgroundColor: 'inherit',
		},
	},

	'@media (max-width: 768px)': {
		padding: '8px 16px 12px 16px',
		minWidth: '100px',
	},
}))

const TabLabel = styled('span')(() => ({
	color: 'white',
	fontWeight: 600,
	fontSize: '14px',
	textShadow: '0 1px 2px rgba(0,0,0,0.2)',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',

	'@media (max-width: 768px)': {
		fontSize: '12px',
	},
}))

const FolderContent = styled(Box)(() => ({
	backgroundColor: '#ffffff',
	borderRadius: '0 16px 16px 16px',
	boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
	minHeight: '600px',
	position: 'relative',
	overflow: 'hidden',
	border: '1px solid rgba(0,0,0,0.05)',
}))

const ContentWrapper = styled(Box)(() => ({
	width: '100%',
	height: '100%',
	padding: '32px',
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',

	'@media (max-width: 768px)': {
		padding: '20px',
		gap: '16px',
	},
}))

const ContentHeader = styled(Box)(() => ({
	borderBottom: '2px solid #f0f0f0',
	paddingBottom: '20px',
}))

const ContentTitle = styled('h1')(() => ({
	fontSize: '32px',
	fontWeight: 700,
	color: '#2c3e50',
	margin: '0 0 8px 0',

	'@media (max-width: 768px)': {
		fontSize: '24px',
	},
}))

const ContentSubtitle = styled('p')(() => ({
	fontSize: '16px',
	color: '#7f8c8d',
	margin: 0,
	lineHeight: 1.5,
}))

const ContentBody = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '24px',
	flex: 1,
}))

const InfoSection = styled(Box)(() => ({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
	gap: '16px',
	padding: '20px',
	backgroundColor: '#f8f9fa',
	borderRadius: '12px',
	border: '1px solid #e9ecef',
}))

const InfoItem = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '4px',
}))

const InfoLabel = styled('span')(() => ({
	fontSize: '12px',
	color: '#6c757d',
	fontWeight: 500,
	textTransform: 'uppercase',
	letterSpacing: '0.5px',
}))

const InfoValue = styled('span')(() => ({
	fontSize: '16px',
	color: '#2c3e50',
	fontWeight: 600,
}))

// const DescriptionSection = styled(Box)(() => ({
// 	display: 'flex',
// 	flexDirection: 'column',
// 	gap: '12px',
// }))

const SectionTitle = styled('h3')(() => ({
	fontSize: '20px',
	fontWeight: 600,
	color: '#2c3e50',
	margin: 0,
}))

// const DescriptionText = styled('p')(() => ({
// 	fontSize: '14px',
// 	color: '#495057',
// 	lineHeight: 1.6,
// 	margin: 0,
// }))

const ModulesSection = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
}))

const ContentFooter = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingTop: '20px',
	borderTop: '2px solid #f0f0f0',

	'@media (max-width: 768px)': {
		flexDirection: 'column',
		gap: '16px',
		alignItems: 'stretch',
	},
}))

const PriceTag = styled('div')(() => ({
	fontSize: '28px',
	fontWeight: 700,
	color: '#27ae60',

	'@media (max-width: 768px)': {
		textAlign: 'center',
		fontSize: '24px',
	},
}))

const RegisterButton = styled('button')(() => ({
	//
	border: 'none',
	color: 'white',
	fontSize: '16px',
	fontWeight: 600,
	cursor: 'pointer',
	transition: 'all 0.2s ease',
	textTransform: 'uppercase',
	letterSpacing: '0.5px',
	borderRadius: 26,

	'&:hover': {
		transform: 'translateY(-2px)',
		boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
	},

	'&:active': {
		transform: 'translateY(0)',
	},

	'@media (max-width: 768px)': {
		width: '100%',
		padding: '16px',
	},
}))
