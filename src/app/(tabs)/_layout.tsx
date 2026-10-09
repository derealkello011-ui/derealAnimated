import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TabLayout = () => {
    const inset = useSafeAreaInsets();

  return (
      <Tabs screenOptions={{
          headerShown: false,
          tabBarStyle: {
            //   bottom: inset.bottom,
              left: inset.left,
              right: inset.right,
              marginHorizontal: 10,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center'
          },
      }}>
          <Tabs.Screen name='HomeScreen'
              options={{
                  title: 'Home',
                  tabBarIcon: ( { focused, color, size } ) => <Ionicons color={color} size={size} name={ focused ? 'home-sharp' : 'home-outline'} />
              }}
          />
          <Tabs.Screen name='ActivitiesScreen'
              options={{
                  title: 'Activities',
                  tabBarIcon: ( {focused, color, size} ) => <Ionicons color={color} size={size} name={ focused ? 'pie-chart-sharp' : 'pie-chart-outline'} />
                }}
          />
          <Tabs.Screen name='ChatScreen'
              options={{
                  tabBarBadge: 3,
                  title: 'Chat',
                  tabBarIcon: ( { focused, color, size } ) => <Ionicons color={color} size={size} name={focused ? 'git-merge-sharp' : 'git-merge-outline'} />
                }}
          />
          <Tabs.Screen name='ProfileScreen'
              options={{
                  title: 'Profile',
                  tabBarIcon: ( { focused, color, size } ) => <Ionicons color={color} size={size} name={focused ? 'person-sharp' : 'person-outline'} />
                }}
          />
    </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})