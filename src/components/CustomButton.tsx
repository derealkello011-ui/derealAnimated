import { OnboardingData } from '@/data/data';
import { FlatList, TouchableWithoutFeedback, useWindowDimensions } from 'react-native';
import Animated, { AnimatedRef, interpolateColor, SharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

interface Props {
    flatlistRef: AnimatedRef<FlatList<OnboardingData>>;
    dataLength: number;
    flatlistIndex: SharedValue<number>;
    x: SharedValue<number>;
}

const CustomButton = ( { 
    dataLength, 
    flatlistIndex, 
    flatlistRef,
    x,
}: Props ) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions();

    const buttonAnimationStyle = useAnimatedStyle( () => {
        return {
            width: flatlistIndex.value === dataLength - 1
                ? withSpring( 140 )
                : withSpring( 60 ),
            height: 60,
        }
    } );

    const textAnimationStyle = useAnimatedStyle( () => { 
        return {
            opacity: flatlistIndex.value === dataLength - 1 
                ? withTiming( 1 ) : withTiming( 0 ),
            transform: [ {
                translateX: flatlistIndex.value === dataLength - 1 
                    ? withTiming( 0 )
                    : withTiming(-100)
            }]
        }
    } );

    const animatedColor = useAnimatedStyle( () => {
        const backgroundColor = interpolateColor(
            x.value,
            [ 0, SCREEN_WIDTH, 2 * SCREEN_WIDTH ],
            [ '#005b4f', '#1e2169', '#f15937' ]
        );
        return {
            backgroundColor: backgroundColor,
        }
    } );

    const arrowAnimationStyle = useAnimatedStyle( () => {
        return {
            width: 30,
            height: 30,
            opacity: flatlistIndex.value === dataLength - 1 ? withTiming( 0 ) : withTiming( 1 ),
            transform: [
                {
                    translateX: flatlistIndex.value === dataLength - 1
                        ? withTiming( 100 ) 
                        : withTiming(0),
                }
            ]
        }
    })

  return (
      <TouchableWithoutFeedback
          onPress={() => {
              if ( flatlistIndex.value < dataLength - 1 ) {
                  flatlistRef.current?.scrollToIndex({index: flatlistIndex.value + 1 })
              }
              else {
                  console.log( "NAVIGATE TO NEXT SCREEN" );
              }
        }}
      >
          <Animated.View
              className='justify-center items-center py-px rounded-full w-13 h-13 overflow-hidden'
              style={[ animatedColor, buttonAnimationStyle, arrowAnimationStyle ]}
          >
              <Animated.Text className='absolute text-white text-lg' style={[textAnimationStyle]}>
                  Get Started
              </Animated.Text>
              <Animated.Image
                  source={require( '@/assets/images/addMessage.png' )}
                    className='absolute w-12 h-12'
              />
              {/* <Ionicons name='arrow-forward-sharp' size={30} color="white"  /> */}
          </Animated.View>
   </TouchableWithoutFeedback>
  )
}

export default CustomButton