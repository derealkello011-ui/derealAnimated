import { OnboardingData } from '@/data/data';
import { View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import Dot from './Dot';

type Props = {
  data: OnboardingData[];
  x: SharedValue<number>;
};

const Pagination = ( { data, x }: Props ) => {
  const colors = data.map( ( item ) => item.textColor );

  return (
    <View className='flex-row justify-center items-center h-9'>
      {data.map( ( item, index ) => (
        <Dot key={item.id} index={index} x={x} colors={colors} />
      ) )}
    </View>
  );
};

export default Pagination;
