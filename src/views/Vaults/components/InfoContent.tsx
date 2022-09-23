import React from 'react'
import { Flex, Text, LinkExternal } from '@apeswapfinance/uikit'
import { Vault } from 'state/types'
import { BLOCK_EXPLORER } from 'config/constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'

const InfoContent: React.FC<{ vault: Vault }> = ({ vault }) => {
  const { chainId } = useActiveWeb3React()
  const explorerLink = BLOCK_EXPLORER[chainId]
  const contractLink = `${explorerLink}/address/${vault?.stratAddress[chainId]}`
  const { t } = useTranslation()
  return (
    <>
      <Flex alignItems="space-between" justifyContent="space-between" style={{ width: '100%' }}>
        <Text style={{ fontSize: '13px' }}>{t('Withdraw Fee')}: </Text>
        <Text style={{ fontSize: '13px' }} bold>
          {vault?.withdrawFee}%
        </Text>
      </Flex>
      <Flex alignItems="space-between" justifyContent="space-between" style={{ width: '100%' }}>
        <Text style={{ fontSize: '13px' }}>{t('Performance Fee')}: </Text>
        <Text style={{ fontSize: '13px' }} bold>
          {vault?.keeperFee}%
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mt="15px">
        <LinkExternal href={contractLink} style={{ fontSize: '13px' }}>
          {t('View Vault Contract')}
        </LinkExternal>
      </Flex>
    </>
  )
}

export default React.memo(InfoContent)
