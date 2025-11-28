'use client'

import { useChain } from '@cosmos-kit/react'

import { Divider } from 'components/common/Divider'
import { StatCard } from 'components/common/StatCard'
import Text from 'components/common/Text'
import chainConfig from 'config/chain'
import useFragmentLeaderboardByAddress from 'hooks/leaderboard/useFragmentLeaderboardByAddress'
import { useEstimatedMarsRewards } from 'hooks/leaderboard/useTotalFragments'
import { formatValue } from 'utils/formatters'
import { BN } from 'utils/helpers'

export default function UserRankingCard() {
  const chainName = chainConfig.name
  const { isWalletConnected, address, isWalletConnecting } = useChain(chainName)
  const { data: userEntry, isLoading } = useFragmentLeaderboardByAddress(address)

  const userFragments = userEntry ? BN(userEntry.total_fragments).toNumber() : null
  const totalFragments = 45_000_000
  const estimatedRewards = useEstimatedMarsRewards(userFragments, totalFragments)

  const showLoading = Boolean(isWalletConnecting || (address && (isLoading || !userEntry)))

  if (!isWalletConnected && !isWalletConnecting && !address) {
    return (
      <section className='relative py-8'>
        <div className='container mx-auto max-w-screen-xl px-4'>
          <div className='flex flex-col items-center justify-center gap-6 py-4 md:flex-row md:items-start md:gap-12'>
            <div className='absolute inset-0 m-1 border border-white/10 -skew-x-25' />
            <Text size='sm' className='text-white/60'>
              Connect your wallet to see your ranking
            </Text>
          </div>
        </div>
      </section>
    )
  }

  const fragments = userEntry ? BN(userEntry.total_fragments).toNumber() : null
  const formattedRank = userEntry ? userEntry.rank.toString().padStart(2, '0') : null
  const truncatedAddress = address ? `${address.slice(0, 8)}...${address.slice(-6)}` : null

  return (
    <section className='relative py-8'>
      <div className='container mx-auto max-w-screen-xl px-4'>
        <div className='flex flex-col items-center justify-center gap-6 py-4 md:flex-row md:items-start md:gap-12'>
          <div className='absolute inset-0 m-1 border border-white/10 -skew-x-25' />
          <StatCard
            value={formattedRank ? `#${formattedRank}` : ''}
            label='Your Ranking'
            isLoading={showLoading}
          />
          <Divider />
          <StatCard
            value={truncatedAddress || ''}
            label='Wallet Address'
            size='text-sm mt-6'
            isLoading={showLoading}
          />
          <Divider />
          <StatCard
            value={
              fragments !== null
                ? formatValue(fragments, {
                    minDecimals: 0,
                    maxDecimals: 0,
                    thousandSeparator: true,
                  })
                : ''
            }
            label='Your Fragments'
            isLoading={showLoading}
          />
          <Divider />
          <StatCard
            value={
              estimatedRewards !== null
                ? formatValue(estimatedRewards, {
                    minDecimals: 0,
                    maxDecimals: 0,
                    thousandSeparator: true,
                    abbreviated: true,
                  })
                : '-'
            }
            label='Est. MARS Reward'
            isLoading={showLoading}
          />
        </div>
      </div>
    </section>
  )
}
