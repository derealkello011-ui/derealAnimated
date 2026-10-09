import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface ContainerProps {
    children: ReactNode,
}

const DerealContainer = ( { children }: ContainerProps ) => {
    const inset = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container, {top: inset.top, bottom: inset.bottom, left: inset.left, right: inset.right}]} edges={['left', 'right', 'bottom']}>
          <View style={styles.content}>
              {children}
          </View>    
    </SafeAreaView>
  )
}

export default DerealContainer

const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    content: {
        padding: 10,
    }
})