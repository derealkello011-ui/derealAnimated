import { OnboardingData } from '@/data/data';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, useWindowDimensions } from 'react-native';
import Animated, {
    AnimatedRef,
    interpolateColor,
    SharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

interface Props {
  flatlistRef: AnimatedRef<FlatList<OnboardingData>>;
  flatlistIndex: SharedValue<number>;
  dataLength: number;
  colors: string[]; // one color per slide, in slide order
  x: SharedValue<number>;
  onFinish: () => void;
}

const CustomButton = ( { flatlistRef, flatlistIndex, dataLength, colors, x, onFinish }: Props ) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const colorRange = colors.map( ( _, i ) => i * SCREEN_WIDTH );

  // The button itself: grows into a pill on the last slide and follows the slide color
  const buttonStyle = useAnimatedStyle( () => {
    const isLast = flatlistIndex.get() === dataLength - 1;
    return {
      width: withSpring( isLast ? 140 : 60 ),
      height: 60,
      backgroundColor: interpolateColor( x.get(), colorRange, colors ),
    };
  } );

  // "Get Started" slides in on the last slide
  const textStyle = useAnimatedStyle( () => {
    const isLast = flatlistIndex.get() === dataLength - 1;
    return {
      opacity: withTiming( isLast ? 1 : 0 ),
      transform: [ { translateX: withTiming( isLast ? 0 : -100 ) } ],
    };
  } );

  // The arrow slides out on the last slide
  const arrowStyle = useAnimatedStyle( () => {
    const isLast = flatlistIndex.get() === dataLength - 1;
    return {
      opacity: withTiming( isLast ? 0 : 1 ),
      transform: [ { translateX: withTiming( isLast ? 100 : 0 ) } ],
    };
  } );

  const handlePress = () => {
    const current = flatlistIndex.get();

    if ( current < dataLength - 1 ) {
      flatlistRef.current?.scrollToIndex( { index: current + 1 } );
    } else {
      onFinish();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole='button'
      accessibilityLabel='Next'
    >
      <Animated.View
        className='justify-center items-center rounded-full overflow-hidden'
        style={buttonStyle}
      >
        <Animated.Text
          numberOfLines={1}
          className='absolute font-semibold text-white text-lg'
          style={textStyle}
        >
          Get Started
        </Animated.Text>
        <Animated.View className='absolute' style={arrowStyle}>
          <Ionicons name='arrow-forward-sharp' size={30} color='white' />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default CustomButton;
