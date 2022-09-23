import React from 'react'
import { Vault } from 'state/types'

export interface ListViewProps {
  onHandleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSetSortOption: (value: string) => void
  onSetVaultType: (value: string) => void
  onSetStake: (value: boolean) => void
  stakedOnly: boolean
  activeOption?: string
  activeVaultType?: string
  query: string
  harvestAll?: React.ReactNode
  vaults?: Vault[]
}
