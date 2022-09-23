import React, { useState } from 'react'
import { Flex, Modal, Text } from '@apeswapfinance/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { Bills } from 'state/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import getTimePeriods from 'utils/getTimePeriods'
import ReactPlayer from 'react-player'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import {
  ActionButtonsContainer,
  BillDescriptionContainer,
  BillsImage,
  BillTitleContainer,
  BillValueContainer,
  ModalBodyContainer,
  StyledExit,
  StyledHeadingText,
  TopDescriptionText,
  TextWrapper,
} from './styles'
import Actions from '../Actions'
import UserBillModalView from './UserBillModalView'
import { getFirstNonZeroDigits } from 'utils/roundNumber'

interface BillModalProps {
  onDismiss: () => void
  bill: Bills
}

const BuyBillModalView: React.FC<BillModalProps> = ({ onDismiss, bill }) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const {
    token,
    quoteToken,
    earnToken,
    billType,
    lpToken,
    price,
    userData,
    contractAddress,
    index,
    discount,
    earnTokenPrice,
    maxTotalPayOut,
    totalPayoutGiven,
    lpPrice,
  } = bill
  const discountEarnTokenPrice = earnTokenPrice - earnTokenPrice * (parseFloat(discount) / 100)
  const [value, setValue] = useState('')
  const [billId, setBillId] = useState('')
  const [loading, setLoading] = useState(false)
  const bigValue = new BigNumber(value).times(new BigNumber(10).pow(18))
  const vestingTime = getTimePeriods(parseInt(bill.vestingTime), true)
  const billValue = bigValue.div(new BigNumber(price))?.toString()

  const available = new BigNumber(maxTotalPayOut)
    ?.minus(new BigNumber(totalPayoutGiven))
    ?.div(new BigNumber(10).pow(earnToken.decimals))
  // threshold equals to 2 usd in earned tokens (banana or jungle token)
  const threshold = new BigNumber(2).div(earnTokenPrice)
  const safeAvailable = available.minus(threshold)

  const onHandleValueChange = (val: string) => {
    const bigVal = new BigNumber(val).times(new BigNumber(10).pow(18))
    const billVal = bigVal.div(new BigNumber(price))
    if (billVal.gte(safeAvailable)) {
      const strSafeAvailable = safeAvailable.times(new BigNumber(price)).div(new BigNumber(10).pow(18)).toFixed(8, 1)
      setValue(strSafeAvailable)
    } else setValue(val)
  }
  const onHandleReturnedBillId = async (id: string) => {
    setBillId(id)
  }

  return (
    <Modal onDismiss={onDismiss} maxWidth="1200px">
      {billId ? (
        <UserBillModalView bill={bill} billId={billId} onDismiss={onDismiss} />
      ) : (
        <ModalBodyContainer>
          <StyledExit onClick={onDismiss}>x</StyledExit>
          <Flex alignItems="center" justifyContent="center">
            {loading && !billId ? (
              <BillsImage>
                <ReactPlayer playing muted loop url="videos/bills-video.mp4" height="100%" width="100%" playsInline />
              </BillsImage>
            ) : (
              <BillsImage image="images/hidden-bill.png" />
            )}
          </Flex>
          <BillDescriptionContainer p="20px 0px" minHeight={450}>
            <Flex flexDirection="column">
              <BillTitleContainer>
                <TopDescriptionText>{billType}</TopDescriptionText>
                <Flex alignItems="center">
                  <ServiceTokenDisplay
                    token1={token.symbol}
                    token2={quoteToken.symbol}
                    token3={earnToken.symbol}
                    billArrow
                    stakeLp
                  />
                  <Flex flexDirection="column">
                    <StyledHeadingText ml="10px" bold>
                      {lpToken.symbol}
                    </StyledHeadingText>
                    <TopDescriptionText ml="12px">
                      {t('Vesting Term')}: {`${vestingTime.days}d, ${vestingTime.minutes}h, ${vestingTime.seconds}m`}
                    </TopDescriptionText>
                  </Flex>
                </Flex>
              </BillTitleContainer>
              <Flex flexDirection="column" mt={25}>
                <Flex style={{ width: '250px' }}>
                  <TopDescriptionText>
                    {earnToken.symbol} {t('Market Price')}{' '}
                    <span style={{ textDecoration: 'line-through' }}>${getFirstNonZeroDigits(earnTokenPrice)}</span>
                  </TopDescriptionText>
                </Flex>
                <Flex alignItems="center">
                  <ServiceTokenDisplay token1={earnToken.symbol} />
                  <StyledHeadingText ml="10px" bold>
                    ${getFirstNonZeroDigits(discountEarnTokenPrice)} ({discount}% Discount)
                  </StyledHeadingText>
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <ActionButtonsContainer>
                <Actions
                  price={price}
                  token={token}
                  quoteToken={quoteToken}
                  lpToken={lpToken}
                  userLpValue={userData?.stakingTokenBalance}
                  allowance={userData?.allowance}
                  billAddress={contractAddress[chainId]}
                  billIndex={index}
                  disabled={
                    billValue === 'NaN' ||
                    parseFloat(billValue) < 0.01 ||
                    parseFloat(billValue) > safeAvailable.toNumber()
                  }
                  onValueChange={onHandleValueChange}
                  value={value}
                  onBillId={onHandleReturnedBillId}
                  onTransactionSubmited={(trxSent) => setLoading(trxSent)}
                  lpPrice={lpPrice}
                />
              </ActionButtonsContainer>
              {new BigNumber(userData?.allowance).gt(0) && (
                <BillValueContainer>
                  <TextWrapper>
                    <Text fontSize="14px" pr={1}>
                      {t('Bill Value')}:{' '}
                      <span style={{ fontWeight: 700 }}>
                        {billValue === 'NaN' ? '0' : parseFloat(billValue).toFixed(3)} {earnToken?.symbol}
                      </span>
                    </Text>
                  </TextWrapper>
                  <TextWrapper>
                    <Text fontSize="14px">
                      {t('Available')}:{' '}
                      <span style={{ fontWeight: 700 }}>
                        {!available ? '0' : safeAvailable.toFixed(3)} {earnToken?.symbol}
                      </span>
                    </Text>
                  </TextWrapper>
                </BillValueContainer>
              )}
            </Flex>
          </BillDescriptionContainer>
        </ModalBodyContainer>
      )}
    </Modal>
  )
}

export default React.memo(BuyBillModalView)
