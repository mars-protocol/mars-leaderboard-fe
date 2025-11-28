'use client'

import { useChain } from '@cosmos-kit/react'

import { Divider } from 'components/common/Divider'
import { StatCard } from 'components/common/StatCard'
import Text from 'components/common/Text'
import chainConfig from 'config/chain'
import useFragmentLeaderboardByAddress from 'hooks/leaderboard/useFragmentLeaderboardByAddress'
import { useEstimatedMarsRewards, useTotalFragments } from 'hooks/leaderboard/useTotalFragments'
import { formatValue } from 'utils/formatters'
import { BN } from 'utils/helpers'

export default function UserRankingCard() {
  const chainName = chainConfig.name
  const { isWalletConnected, address, isWalletConnecting } = useChain(chainName)
  const { data: userEntry, isLoading } = useFragmentLeaderboardByAddress(address)
  const totalFragments = useTotalFragments()

  const userFragments = userEntry ? BN(userEntry.total_fragments).toNumber() : null
  const estimatedRewards = useEstimatedMarsRewards(userFragments, totalFragments)
  const showLoading = Boolean(isWalletConnecting || (address && isLoading))

  if (!isWalletConnected && !isWalletConnecting && !address) {
    return (
      <section className='relative py-4 md:py-8 md:mb-4'>
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

  const fragments = userEntry ? BN(userEntry.total_fragments).toNumber() : 0
  const formattedRank = userEntry ? userEntry.rank.toString().padStart(2, '0') : null
  const truncatedAddress = address ? `${address.slice(0, 8)}...${address.slice(-6)}` : null
  const hasNoFragments = address && !isLoading && !userEntry

  return (
    <section className='relative py-4 md:py-8 md:mb-4'>
      <div className='container mx-auto max-w-screen-xl px-4'>
        <div className='flex flex-col items-center justify-center gap-2 py-4 md:flex-row md:items-start md:gap-12'>
          <div className='hidden md:block absolute inset-0 m-1 border border-white/10 -skew-x-25' />
          <div className='relative w-full md:w-auto py-4 md:py-0'>
            <div className='absolute inset-0 m-1 border border-white/10 -skew-x-25 md:hidden' />
            <div className='relative z-10'>
              <StatCard
                value={formattedRank ? `#${formattedRank}` : hasNoFragments ? '-' : ''}
                label='Your Ranking'
                isLoading={showLoading}
              />
            </div>
          </div>
          <Divider />
          <div className='relative w-full md:w-auto py-4 md:py-0'>
            <div className='absolute inset-0 m-1 border border-white/10 -skew-x-25 md:hidden' />
            <div className='relative z-10'>
              <StatCard
                value={truncatedAddress || ''}
                label='Wallet Address'
                size='text-sm md:mt-6'
                isLoading={showLoading}
              />
            </div>
          </div>
          <Divider />
          <div className='relative w-full md:w-auto py-4 md:py-0'>
            <div className='absolute inset-0 m-1 border border-white/10 -skew-x-25 md:hidden' />
            <div className='relative z-10'>
              <StatCard
                value={
                  hasNoFragments
                    ? '0'
                    : formatValue(fragments, {
                        minDecimals: 0,
                        maxDecimals: 0,
                        thousandSeparator: true,
                      })
                }
                label='Your Fragments'
                isLoading={showLoading}
              />
            </div>
          </div>
          <Divider />
          <div className='relative w-full md:w-auto py-4 md:py-0'>
            <div className='absolute inset-0 m-1 border border-white/10 -skew-x-25 md:hidden' />
            <div className='relative z-10'>
              <StatCard
                value={
                  hasNoFragments
                    ? '0'
                    : estimatedRewards !== null
                      ? formatValue(estimatedRewards, {
                          minDecimals: 0,
                          maxDecimals: 0,
                          thousandSeparator: true,
                          abbreviated: true,
                        })
                      : '-'
                }
                label='Est. MARS Rewards'
                isLoading={showLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
