import { useScrollToTop } from 'expo-router';
import { useRef } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';

const Album = () => {
  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <ScrollView ref={ref} contentContainerStyle={styles.scrollContent}>
      <Image
        source={{ uri: 'https://picsum.photos/seed/1/400/400' }}
        style={styles.image}
        key="1"
      />
      <Image
        source={{ uri: 'https://picsum.photos/seed/2/400/400' }}
        style={styles.image}
        key="2"
      />
      <Image
        source={{ uri: 'https://picsum.photos/seed/3/400/400' }}
        style={styles.image}
        key="3"
      />
      <Image
        source={{ uri: 'https://picsum.photos/seed/4/400/400' }}
        style={styles.image}
        key="4"
      />
    </ScrollView>
  );
};

export default Album;

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
      width: 400,
      height: 400,
      marginBottom: 10,
      borderRadius: 20,
  },
});