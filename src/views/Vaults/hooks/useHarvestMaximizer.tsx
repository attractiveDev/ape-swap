import { useCallback } from 'react'
import { useVaultApeV2 } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { harvestMaximizer } from 'utils/callHelpers'
import track from 'utils/track'

const useHarvestMaximizer = (pid: number) => {
  const { chainId } = useActiveWeb3React()
  const vaultApeContractV2 = useVaultApeV2()

  const handleHarvest = useCallback(async () => {
    try {
      const txHash = await harvestMaximizer(vaultApeContractV2, pid)
      track({
        event: 'vault',
        chain: chainId,
        data: {
          cat: 'harvest',
          pid,
        },
      })
      console.info(txHash)
      return txHash
    } catch (e) {
      console.error(e)
    }
    return null
  }, [vaultApeContractV2, pid, chainId])

  return { onHarvest: handleHarvest }
}

export default useHarvestMaximizer
