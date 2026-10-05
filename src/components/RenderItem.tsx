import { OnboardingData } from '@/data/data';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

interface RenderItemProps {
  item: OnboardingData;
  index: number;
  x: SharedValue<number>;
  isActive: boolean;
}

const BOTTOM_BAR_SPACE = 120; // keeps the text clear of the pagination and button

const RenderItem = ( { item, index, x, isActive }: RenderItemProps ) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const animationRef = useRef<LottieView>( null );

  // Only the visible slide plays. The others rest on their first frame, so
  // one-shot animations (like the check mark) play when you arrive.
  useEffect( () => {
    if ( isActive ) {
      animationRef.current?.play();
    } else {
      animationRef.current?.reset();
    }
  }, [ isActive ] );

  // This slide's position in the scroll: previous, current, next
  const pageRange = [
    ( index - 1 ) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    ( index + 1 ) * SCREEN_WIDTH,
  ];

  const lottieAnimationStyle = useAnimatedStyle( () => ( {
    transform: [
      {
        translateY: interpolate( x.get(), pageRange, [ 200, 0, -200 ], Extrapolation.CLAMP ),
      },
    ],
  } ) );

  const circleAnimation = useAnimatedStyle( () => ( {
    transform: [
      { scale: interpolate( x.get(), pageRange, [ 1, 4, 4 ], Extrapolation.CLAMP ) },
    ],
  } ) );

  const textAnimation = useAnimatedStyle( () => ( {
    opacity: interpolate( x.get(), pageRange, [ 0, 1, 0 ], Extrapolation.CLAMP ),
  } ) );

  return (
    <View
      className='flex-1 justify-around items-center'
      style={{ width: SCREEN_WIDTH, paddingBottom: BOTTOM_BAR_SPACE }}
    >
      <View className='top-0 right-0 bottom-0 left-0 absolute justify-end items-center'>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              backgroundColor: item.backgroundColor,
              borderRadius: SCREEN_WIDTH / 2,
            },
            circleAnimation,
          ]}
        />
      </View>

      <Animated.View style={lottieAnimationStyle}>
        <LottieView
          ref={animationRef}
          source={item.animation}
          loop={item.loop ?? true}
          style={{ width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9 }}
        />
      </Animated.View>

      <Animated.Text
        className='mx-5 font-bold text-3xl text-center'
        style={[ { color: item.textColor }, textAnimation ]}
      >
        {item.text}
      </Animated.Text>
    </View>
  );
};

export default RenderItem;
