import DerealContainer from '@/components/DerealContainer'
import { StyleSheet, Text } from 'react-native'

const ProfileScreen = () => {
  return (
      <DerealContainer>
          <Text>Profile Screen</Text>
    </DerealContainer>
  )
}

export default ProfileScreen

const styles = StyleSheet.create( {
    container: {
        flex: 1,
    }
})