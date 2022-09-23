import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { CenterContainer, StyledUnlockButton } from './styles'
import ApprovalAction from './ApprovalAction'
import StakeAction from './StakeActions'

// Changed props to type string because BigNumbers cause re-renders

interface CardActionProps {
  allowance: string
  stakingTokenBalance: string
  stakedTokenSymbol: string
  stakedBalance: string
  stakeTokenValueUsd: number
  stakeTokenAddress: string
  withdrawFee: string
  pid: number
  vaultVersion: 'V1' | 'V2'
}

const Actions: React.FC<CardActionProps> = ({
  allowance,
  stakingTokenBalance,
  stakedTokenSymbol,
  stakedBalance,
  stakeTokenValueUsd,
  stakeTokenAddress,
  withdrawFee,
  pid,
  vaultVersion,
}) => {
  const { account } = useActiveWeb3React()
  const actionToRender = () => {
    if (!account) {
      return (
        <CenterContainer>
          <StyledUnlockButton />
        </CenterContainer>
      )
    }
    if (!new BigNumber(allowance)?.gt(0)) {
      return (
        <CenterContainer>
          <ApprovalAction stakingTokenContractAddress={stakeTokenAddress} vaultVersion={vaultVersion} pid={pid} />
        </CenterContainer>
      )
    }
    return (
      <StakeAction
        stakedBalance={stakedBalance}
        stakedTokenSymbol={stakedTokenSymbol}
        stakingTokenBalance={stakingTokenBalance}
        stakeTokenValueUsd={stakeTokenValueUsd}
        withdrawFee={withdrawFee}
        pid={pid}
        vaultVersion={vaultVersion}
      />
    )
  }
  return actionToRender()
}

export default React.memo(Actions)
