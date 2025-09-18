import React from 'react'
import { styled } from '@mui/material'
import InfoBlock1 from './InfoBlock1'
import InfoBlock2 from './InfoBlock2'
import InfoBlock3 from './InfoBlock3'

const StyledInfoBlock = styled('div')(() => ({
	width: '100%',
	marginTop: 30,
	display: 'flex',
	flexDirection: 'column',
}))

const InfoBlock: React.FC = () => {
	return (
		<StyledInfoBlock>
			<InfoBlock1 />
			<InfoBlock2 />
			<InfoBlock3 />
		</StyledInfoBlock>
	)
}

export default InfoBlock
