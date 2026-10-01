import { OnboardingData } from '@/data/data';
import LottieView from 'lottie-react-native';
import { Text, useWindowDimensions, View } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface RenderItemsProps {
    item: OnboardingData;
    index: number;
    x: SharedValue<number>; 
}

const RenderItem = ({item, index, x}: RenderItemsProps) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions();

    const lottieAnimationStyle = useAnimatedStyle( () => {
        const translateYAnimation = interpolate(
            x.value,
            [
                ( index - 1 ) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                ( index + 1 ) * SCREEN_WIDTH
            ],
            [ 200, 0, -200 ],
            Extrapolation.CLAMP,
        );
        return {
            transform: [{translateY: translateYAnimation}]
        }
    })

    const circleAnimation = useAnimatedStyle( () => {
        const scale = interpolate(
            x.value,
            [
                ( index - 1 ) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                ( index + 1 ) * SCREEN_WIDTH
            ],
            [ 1, 4, 4 ],
            Extrapolation.CLAMP,
        );
        return {
            transform: [ { scale: scale } ],
        };
    })

    return (
        <View className='flex-1 justify-around items-center mb-12' >
            <View className='top-0 right-0 bottom-0 left-0 absolute justify-end items-center'>
                <Animated.View style={[{ 
                    width: SCREEN_WIDTH ,
                    height: SCREEN_WIDTH,
                    backgroundColor: item.backgroundColor,
                    borderRadius: SCREEN_WIDTH / 2,
                    },
                    circleAnimation, ]} />
            </View>
            <Animated.View
                style={lottieAnimationStyle}
            >
              <LottieView
                    source={item.animation}
                    style={{
                        width: SCREEN_WIDTH * 0.9,
                        height: SCREEN_WIDTH * 0.9
                    }}
                    autoPlay
                    loop
              />
            </Animated.View>
            <Text className='items-center mr-5 ml-5 font-bold text-3xl' style={{color: item.text}} >
                {item.text}
            </Text>
    </View>
  )
}

export default RenderItem