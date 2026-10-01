import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    index: number;
    x: SharedValue<number>;
}

const Dot = ( { index, x }: Props ) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions();
    
    const animatedDotStyle = useAnimatedStyle( () => {
        const widthAnimation = interpolate(
            x.value,
            [
                ( index - 1 ) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
            ],
            [ 10, 20, 10 ],
            Extrapolation.CLAMP
        );

        const opacityAnimation = interpolate(
            x.value,
            [
                ( index - 1 ) * SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH,
            ],
            [ 0.5, 1, 0.5 ],
            Extrapolation.CLAMP
        );
        return {
            width: widthAnimation,
            opacity: opacityAnimation
        };
    })
  return (
      <Animated.View
          className='bg-black mr-3 ml-3 border rounded w-3 h-3'
          style={[animatedDotStyle]}
      />
  )
}

export default Dot

const styles = StyleSheet.create({})