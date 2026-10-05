import { useWindowDimensions } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    interpolateColor,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  index: number;
  x: SharedValue<number>;
  colors: string[]; // one color per slide, in slide order
};

const Dot = ( { index, x, colors }: Props ) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const pageRange = [
    ( index - 1 ) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    ( index + 1 ) * SCREEN_WIDTH,
  ];
  // One stop per slide, so the color follows every slide (not just the first 3)
  const colorRange = colors.map( ( _, i ) => i * SCREEN_WIDTH );

  const animatedDotStyle = useAnimatedStyle( () => ( {
    width: interpolate( x.get(), pageRange, [ 10, 20, 10 ], Extrapolation.CLAMP ),
    opacity: interpolate( x.get(), pageRange, [ 0.5, 1, 0.5 ], Extrapolation.CLAMP ),
    backgroundColor: interpolateColor( x.get(), colorRange, colors ),
  } ) );

  return <Animated.View className='mx-1.5 rounded-full h-2.5' style={animatedDotStyle} />;
};

export default Dot;
