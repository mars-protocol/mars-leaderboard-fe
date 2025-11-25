'use client'

import { useChain } from '@cosmos-kit/react'

import Card from 'components/common/Card'
import { FormattedNumber } from 'components/common/FormattedNumber'
import Text from 'components/common/Text'
import chainConfig from 'config/chain'
import useFragmentLeaderboardByAddress from 'hooks/leaderboard/useFragmentLeaderboardByAddress'
import { BN } from 'utils/helpers'

export default function UserRankingCard() {
  const chainName = chainConfig.name
  const { isWalletConnected, address } = useChain(chainName)
  const { data: userEntry, isLoading } = useFragmentLeaderboardByAddress(address)

  if (!isWalletConnected || !address) {
    return null
  }

  if (isLoading) {
    return (
      <Card className='mb-6' contentClassName='p-6'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-col gap-2'>
            <Text size='sm' className='text-white/60 uppercase tracking-wide'>
              Your Ranking
            </Text>
            <Text size='2xl' className='text-white font-bold'>
              -
            </Text>
          </div>
          <div className='flex flex-col gap-2'>
            <Text size='sm' className='text-white/60 uppercase tracking-wide'>
              Wallet Address
            </Text>
            <Text size='base' className='text-white font-mono break-all'>
              {address}
            </Text>
          </div>
          <div className='flex flex-col gap-2'>
            <Text size='sm' className='text-white/60 uppercase tracking-wide'>
              Total Fragments
            </Text>
            <Text size='xl' className='text-white font-semibold'>
              -
            </Text>
          </div>
        </div>
      </Card>
    )
  }

  if (!userEntry) {
    return null
  }

  const fragments = BN(userEntry.total_fragments).toNumber()
  const formattedRank = userEntry.rank.toString().padStart(2, '0')

  return (
    <Card className='mb-6 border border-white/10 bg-surface rounded-sm' contentClassName='p-6'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-col gap-2'>
          <Text size='sm' className='text-white/60 uppercase tracking-wide'>
            Your Ranking
          </Text>
          <Text size='2xl' className='text-white font-bold'>
            #{formattedRank}
          </Text>
        </div>

        <div className='flex flex-col gap-2'>
          <Text size='sm' className='text-white/60 uppercase tracking-wide'>
            Wallet Address
          </Text>
          <Text size='base' className='text-white font-mono break-all'>
            {address}
          </Text>
        </div>

        <div className='flex flex-col gap-2'>
          <Text size='sm' className='text-white/60 uppercase tracking-wide'>
            Your Fragments
          </Text>
          <FormattedNumber
            amount={fragments}
            options={{
              minDecimals: 0,
              maxDecimals: 0,
              thousandSeparator: true,
            }}
            className='text-white text-xl font-semibold'
          />
        </div>
      </div>
    </Card>
  )
}
