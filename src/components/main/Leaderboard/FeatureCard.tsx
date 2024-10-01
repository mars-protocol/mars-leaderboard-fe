import Text from 'components/common/Text'
import { ReactElement } from 'react'

interface Props {
  title: string
  description: string
  image: ReactElement
}

export default function FeatureCard(props: Props) {
  const { title, description, image } = props
  return (
    <div className='relative flex flex-col items-center max-w-xs w-full md:pl-2'>
      <div className='absolute bottom-0 z-10'>
        <Text className='text-white/80 mb-2'>{title}</Text>
        <Text size='xs' className='text-white/40'>
          {description}
        </Text>
      </div>
      <span className='w-full h-full object-cover'>{image}</span>
    </div>
  )
}
