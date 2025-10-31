import React, { useState } from 'react'
import { Box, styled } from '@mui/material'
import ModulesSectionElem from '../components/ModulesSectionElem'
import Block1 from '../components/programPageElem/Block1'
import Block2 from '../components/programPageElem/Block2'
import Block3 from '../components/programPageElem/Block3'
import { BubbleList } from '../components/ExpandableBubble'
import Block4 from '../components/programPageElem/Block4'
import ButtonContained from '../components/ButtonContained'
import RegModal from '../components/auth/RegModal'

// const colors = ['#ff6b6b', '#4ecdc4', '#ff9f1c', '#6c82fdff', '#1a535c']

const ProgramsPage: React.FC = () => {
	const [openModal, setOpenModal] = useState(false)

	const handleRegisterClick = () => {
		setOpenModal(true)
	}

	return (
		<PageWrapper>
			<Block1 />
			<FolderContainer>
				<Block2 onClick={handleRegisterClick} />

				<Block3 />

				<ModulesSection>
					<SectionTitle sx={{ textAlign: 'center' }}>Модулі курсу</SectionTitle>
					<ModulesSectionElem />
				</ModulesSection>

				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
					<ButtonContained
						text='Купити абонемент'
						onClick={handleRegisterClick}
					/>
				</Box>

				<BubbleList />

				<Block4 />

				<ContentFooter>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<ButtonContained
							text='Купити абонемент'
							onClick={handleRegisterClick}
						/>
					</Box>
				</ContentFooter>
			</FolderContainer>

			{openModal && (
				<RegModal open={openModal} onClose={() => setOpenModal(false)} />
			)}
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

const SectionTitle = styled('h3')(() => ({
	fontSize: '20px',
	fontWeight: 600,
	color: '#2c3e50',
	margin: 0,
}))

const ModulesSection = styled(Box)(() => ({
	display: 'flex',
	flexDirection: 'column',
	gap: '16px',
}))

const ContentFooter = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	paddingTop: '20px',
	borderTop: '2px solid #f0f0f0',
}))
