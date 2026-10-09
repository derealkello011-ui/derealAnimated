import Album from '@/components/Album'
import DerealContainer from '@/components/DerealContainer'
import { StyleSheet, Text } from 'react-native'

const HomeScreen = () => {
  return (
      <DerealContainer>
          <Text> Home Screen </Text>
          <Album />
      </DerealContainer>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})