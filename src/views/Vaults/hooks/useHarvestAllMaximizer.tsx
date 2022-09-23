import { useCallback } from 'react'
import { useVaultApeV2 } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { harvestMaximizer } from 'utils/callHelpers'
import track from 'utils/track'

const useHarvestAllMaximizer = (pids: number[]) => {
  const { chainId } = useActiveWeb3React()
  const vaultApeContractV2 = useVaultApeV2()

  const handleHarvestAll = useCallback(async () => {
    try {
      const harvestPromises = pids.map((pid) => {
        return harvestMaximizer(vaultApeContractV2, pid)
      })

      track({
        event: 'vault',
        chain: chainId,
        data: {
          cat: 'harvestAll',
        },
      })
      return Promise.all(harvestPromises)
    } catch (e) {
      console.error(e)
    }
    return null
  }, [vaultApeContractV2, pids, chainId])

  return { onHarvestAll: handleHarvestAll }
}

export default useHarvestAllMaximizer
