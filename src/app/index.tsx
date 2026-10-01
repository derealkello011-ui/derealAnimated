import RenderItem from "@/components/RenderItem";
import data, { OnboardingData } from "@/data/data";
import { FlatList, View, ViewToken } from "react-native";
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import "../global.css";
import Pagination from "@/components/Pagination";

export default function Index() {
  const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue( 0 );
  const flatlistIndex = useSharedValue( 0 );

  const onViewableItemsChanged = (
    {
      viewableItems
    }: {
      viewableItems: ViewToken[]
      } ) => { 
    if ( viewableItems[ 0 ].index !== null ) {
      flatlistIndex.value = viewableItems[ 0 ].index;
    }
     }

  const onScroll = useAnimatedScrollHandler( {
    onScroll: event => {
      x.value = event.contentOffset.x;
    }
  })

  return (
    <View className="flex-1">
      <Animated.FlatList
        ref={flatlistRef}
        onScroll={onScroll}
        data={data}
        renderItem={( { item, index } ) => {
          return <RenderItem item={item} index={index} x={x} />
        }}
        keyExtractor={((item) => item.id)}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10
        }}
      />
      <View className="right-0 bottom-0 left-0 absolute mr-7 ml-7 pt-7 pb-7">
        <Pagination data={data} x={x} />
      </View>
    </View>
  );
}

