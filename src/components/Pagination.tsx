import { OnboardingData } from '@/data/data';
import { View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import Dot from './Dot';

type Props = {
    data: OnboardingData[],
    x: SharedValue<number>;
}

const Pagination = ({data, x}: Props) => {
  return (
    <View className='flex-row justify-center items-center h-9'>
          {data.map( ( _, index ) => {
              return <Dot key={index} index={index} x={x} />
      })}
    </View>
  )
}

export default Pagination