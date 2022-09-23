import { MenuEntry } from '@ape.swap/uikit'
import { ChainId } from '@apeswapfinance/sdk'
import { NETWORK_INFO_LINK } from 'config/constants/chains'
import { ContextApi } from '../../../contexts/Localization/types'

const maticConfig: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Exchange'),
    lightIcon: 'ExchangeLightImage',
    darkIcon: 'ExchangeDarkImage',
    items: [
      {
        label: t('Swap'),
        href: '/swap',
        isNew: false,
      },
      {
        label: t('Liquidity'),
        href: '/add-liquidity',
        isNew: false,
      },
      {
        label: t('Pro Trading'),
        href: 'https://pro.apeswap.finance',
        isNew: true,
      },
    ],
  },
  {
    label: t('Farms'),
    href: '/banana-farms',
    isNew: false,
  },
  {
    label: t('Explore'),
    lightIcon: 'MoreLightImage',
    darkIcon: 'MoreDarkImage',
    items: [
      {
        label: t('ApeStats'),
        href: '/apestats',
        isNew: true,
      },
      {
        label: t('Dashboard'),
        href: 'protocol-dashboard',
        isNew: true,
      },
      {
        label: t('Documentation'),
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
        isNew: false,
      },
      {
        label: t('Charts'),
        href: NETWORK_INFO_LINK[ChainId.MATIC],
        isNew: false,
      },
      {
        label: t('Governance'),
        href: 'https://discuss.apeswap.finance',
        isNew: false,
      },
    ],
  },
]

export default maticConfig
