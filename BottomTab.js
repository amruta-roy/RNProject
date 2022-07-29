import * as React from 'react';
import {Text, View, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import EventsScreen from './src/Screens/EventsScreen';
import Screen2 from './src/Screens/Screen2';
import Screen3 from './src/Screens/Payment';

const Tab = createBottomTabNavigator();

function MyTabs({route}) {
  
  return (
    <Tab.Navigator
        initialRouteName={"EventsScreen"}
        screenOptions={{
            headerShown:false,
            tabBarStyle: { backgroundColor: "#fff", height: hp(8.5) },
            tabBarLabelStyle: {fontSize: 14, marginBottom: hp(1), },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor:'#D490C0'
        }}
      
    >
    <Tab.Screen
        name={"EventsScreen"}
         component={EventsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused, color, size = 35}) => (
            <View style={{height: hp(8), marginTop: hp(3), flexDirection:'row'}}>
            <Image
              style={{width: wp(7), height: hp(4), marginTop:hp(2), opacity:focused? 10: 0.4}}
              source={
                focused
                  ? require('./src/assets/images/Home.png')
                  : require('./src/assets/images/HomeSelected.png')
              }
            />
            {focused? <Text style={{color:'#51C3FE', marginTop: hp(3)}}>  Home</Text> : null}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={"Screen2"}
        component={Screen2}
        options={{
            tabBarLabel: '',
            tabBarIcon: ({focused, color, size = 35}) => (
              <View style={{height: hp(8), marginTop: hp(3), flexDirection:'row'}}>
              <Image
                style={{width: wp(7), height: hp(4), marginTop:hp(3), opacity:focused? 10: 0.4}}
                source={
                  focused
                    ? require('./src/assets/images/BookSelected.png')
                    : require('./src/assets/images/Book.png')
                }
              />
              {focused? <Text style={{color:'#51C3FE', marginTop: hp(3)}}>  Books</Text> : null}
              </View>
            ),
          }}
    />

      <Tab.Screen
        name={"Screen3"}
        component={Screen3}
        options={{
            tabBarLabel: '',
            tabBarIcon: ({focused, color, size = 35}) => (
              <View style={{height: hp(8), marginTop: hp(3), flexDirection:'row'}}>
                <Image
                  style={{width: wp(8), height: hp(4), marginTop:hp(2), opacity:focused? 10: 0.4}}
                  source={
                    focused
                      ? require('./src/assets/images/ProfileSelected.png')
                      : require('./src/assets/images/Profile.png')
                  }
                />
                {focused? <Text style={{color:'#51C3FE', marginTop: hp(3)}}>  Account</Text> : null}
              </View>
            ),
          }}
      />

    </Tab.Navigator>
  );
}

export default MyTabs;
