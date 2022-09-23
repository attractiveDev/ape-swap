/** @jsxImportSource theme-ui */
import { Flex, Svg, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { Link } from 'react-router-dom'
import { textUnderlineHover } from '../styles'

const MyPositions: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Flex
      sx={{
        margin: '0px 0px 40px 0px',
        width: 'fit-content',
        alignItems: 'center',
        position: 'relative',
        ...textUnderlineHover,
      }}
      as={Link}
      to="/liquidity"
    >
      <Svg icon="caret" direction="left" width="7px" />
      <Text size="12px" ml="5px">
        {t('My positions')}
      </Text>
    </Flex>
  )
}

export default React.memo(MyPositions)
