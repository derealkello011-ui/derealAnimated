import CustomButton from '@/components/CustomButton';
import Pagination from '@/components/Pagination';
import RenderItem from '@/components/RenderItem';
import data, { OnboardingData } from '@/data/data';
import { useCallback, useState } from 'react';
import { FlatList, useWindowDimensions, View, ViewToken } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Module-level so its identity never changes (FlatList doesn't allow that)
const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 50 };

const COLORS = data.map( ( item ) => item.textColor );

export default function Index() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue( 0 ); // horizontal scroll offset, drives every animation
  const flatlistIndex = useSharedValue( 0 ); // current slide, read by the button
  const [ activeIndex, setActiveIndex ] = useState( 0 ); // current slide, read by the Lottie players

  const onViewableItemsChanged = useCallback(
    ( { viewableItems }: { viewableItems: ViewToken[] } ) => {
      const index = viewableItems[ 0 ]?.index; // the list can be empty mid-swipe
      if ( index != null ) {
        flatlistIndex.set( index );
        setActiveIndex( index );
      }
    },
    [ flatlistIndex ],
  );

  const onScroll = useAnimatedScrollHandler( ( event ) => {
    x.set( event.contentOffset.x );
  } );

  const handleFinish = () => {
    // TODO: replace with router.replace('/(tabs)') once that route exists
    console.log( 'NAVIGATE TO NEXT SCREEN' );
  };

  return (
    <View className='flex-1'>
      <Animated.FlatList
        ref={flatlistRef}
        data={data}
        extraData={activeIndex}
        keyExtractor={( item ) => String( item.id )}
        renderItem={( { item, index } ) => (
          <RenderItem item={item} index={index} x={x} isActive={index === activeIndex} />
        )}
        getItemLayout={( _, index ) => ( {
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        } )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
      />

      <View
        className='right-0 bottom-0 left-0 absolute flex-row justify-between items-center px-7 pt-7'
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <Pagination data={data} x={x} />
        <CustomButton
          flatlistRef={flatlistRef}
          flatlistIndex={flatlistIndex}
          dataLength={data.length}
          colors={COLORS}
          x={x}
          onFinish={handleFinish}
        />
      </View>
    </View>
  );
}
