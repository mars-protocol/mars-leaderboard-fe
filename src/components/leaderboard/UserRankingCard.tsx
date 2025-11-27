'use client'

import { useChain } from '@cosmos-kit/react'

import chainConfig from 'config/chain'
import useFragmentLeaderboardByAddress from 'hooks/leaderboard/useFragmentLeaderboardByAddress'
import { useEstimatedMarsRewards } from 'hooks/leaderboard/useTotalFragments'
import { formatValue } from 'utils/formatters'
import { BN } from 'utils/helpers'

const TOTAL_REWARD_POOL = 45_000_000 // 45M MARS

export default function UserRankingCard() {
  const chainName = chainConfig.name
  const { isWalletConnected, address } = useChain(chainName)
  const { data: userEntry, isLoading } = useFragmentLeaderboardByAddress(address)

  // TODO: Get total fragments from backend API
  // For now, estimated rewards calculation is disabled until we have total fragments
  const userFragments = userEntry ? BN(userEntry.total_fragments).toNumber() : null
  const totalFragments = null // Will be provided by backend API
  const estimatedRewards = useEstimatedMarsRewards(userFragments, totalFragments)

  if (!isWalletConnected || !address) {
    return (
      <section className='relative pb-8 pt-6'>
        <div className='container mx-auto max-w-screen-xl px-4'>
          <div className='relative flex flex-col items-center justify-center gap-6 py-4 md:flex-row md:items-start md:gap-12 md:py-6'>
            <div className='absolute inset-0 m-1 border border-white/10 -skew-x-25' />
            <div className='relative z-10 flex flex-col items-center text-center w-full'>
              <p className='text-sm md:text-base text-white/60'>
                Connect your wallet to see your ranking
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className='relative pb-8 pt-6'>
        <div className='container mx-auto max-w-screen-xl px-4'>
          <div className='relative flex flex-col items-center justify-center gap-6 py-4 md:flex-row md:items-start md:gap-12 md:py-6'>
            <div className='absolute inset-0 m-2 border border-white/10 -skew-x-25' />
            <div className='relative z-10 flex flex-col items-center text-center'>
              <span className='text-4xl font-bold bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent md:text-5xl'>
                -
              </span>
              <p className='text-xs uppercase tracking-wide text-white/40 md:text-sm'>
                Your Ranking
              </p>
            </div>
            <div className='relative z-10 hidden h-px w-12 shrink-0 bg-linear-to-r from-transparent via-white/40 to-transparent md:block md:mt-7' />
            <div className='relative z-10 flex flex-col items-center text-center'>
              <span className='text-sm font-mono text-white/60 break-all max-w-[200px] md:max-w-none'>
                {address}
              </span>
              <p className='text-xs uppercase tracking-wide text-white/40 md:text-sm mt-2'>
                Wallet Address
              </p>
            </div>
            <div className='relative z-10 hidden h-px w-12 shrink-0 bg-linear-to-r from-transparent via-white/40 to-transparent md:block md:mt-7' />
            <div className='relative z-10 flex flex-col items-center text-center'>
              <span className='text-4xl font-bold bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent md:text-5xl'>
                -
              </span>
              <p className='text-xs uppercase tracking-wide text-white/40 md:text-sm'>
                Your Fragments
              </p>
            </div>
            <div className='relative z-10 hidden h-px w-12 shrink-0 bg-linear-to-r from-transparent via-white/40 to-transparent md:block md:mt-7' />
            <div className='relative z-10 flex flex-col items-center text-center'>
              <span className='text-4xl font-bold bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent md:text-5xl'>
                -
              </span>
              <p className='text-xs uppercase tracking-wide text-white/40 md:text-sm'>
                Est. MARS Reward
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!userEntry) {
    return null
  }

  const fragments = BN(userEntry.total_fragments).toNumber()
  const formattedRank = userEntry.rank.toString().padStart(2, '0')
  const truncatedAddress = `${address.slice(0, 8)}...${address.slice(-6)}`

  return (
    <section className='relative pb-8 pt-6'>
      <div className='container mx-auto max-w-screen-xl px-4'>
        <div className='relative flex flex-col items-center justify-center gap-6 py-4 md:flex-row md:items-start md:gap-12 md:py-10'>
          <div className='absolute inset-0 m-1 border border-white/10 -skew-x-25' />
          <div className='relative z-10 flex flex-col items-center text-center'>
            <span className='text-4xl font-bold bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent md:text-5xl'>
              #{formattedRank}
            </span>
            <p className='text-xs uppercase tracking-wide text-white/40 md:text-sm'>Your Ranking</p>
          </div>
          <div className='relative z-10 hidden h-px w-12 shrink-0 bg-linear-to-r from-transparent via-white/40 to-transparent md:block md:mt-7' />
          <div className='relative z-10 flex flex-col items-center text-center mt-4'>
            <span
              className='text-sm font-mono text-white/60 break-all max-w-[200px] md:max-w-none'
              title={address}
            >
              {truncatedAddress}
            </span>
            <p className='text-xs uppercase tracking-wide text-white/40 md:text-sm mt-2'>
              Wallet Address
            </p>
          </div>
          <div className='relative z-10 hidden h-px w-12 shrink-0 bg-linear-to-r from-transparent via-white/40 to-transparent md:block md:mt-7' />
          <div className='relative z-10 flex flex-col items-center text-center'>
            <span className='text-4xl font-bold bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent md:text-5xl'>
              {formatValue(fragments, {
                minDecimals: 0,
                maxDecimals: 0,
                thousandSeparator: true,
              })}
            </span>
            <p className='text-xs uppercase tracking-wide text-white/40 md:text-sm'>
              Your Fragments
            </p>
          </div>
          <div className='relative z-10 hidden h-px w-12 shrink-0 bg-linear-to-r from-transparent via-white/40 to-transparent md:block md:mt-7' />
          <div className='relative z-10 flex flex-col items-center text-center'>
            {estimatedRewards !== null ? (
              <>
                <span className='text-4xl font-bold bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent md:text-5xl'>
                  {formatValue(estimatedRewards, {
                    minDecimals: 0,
                    maxDecimals: 0,
                    thousandSeparator: true,
                    abbreviated: true,
                  })}
                </span>
                <p className='text-xs uppercase tracking-wide text-white/40 md:text-sm'>
                  Est. MARS Reward
                </p>
              </>
            ) : (
              <>
                <span className='text-4xl font-bold bg-linear-to-br from-white via-white to-white/60 bg-clip-text text-transparent md:text-5xl'>
                  -
                </span>
                <p className='text-xs uppercase tracking-wide text-white/40 md:text-sm'>
                  Est. MARS Reward
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
