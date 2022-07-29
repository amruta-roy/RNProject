import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity , 
    Image,
    Alert,
    ScrollView,
    StyleSheet
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


const Screen2 = () => {

    return(
        <ScrollView>
            <View style = { styles.container }>
                <View style = { styles.greetingsView }>
                        <Text 
                            style={{ ...styles.txtLarge }}>
                        Hi, Christina</Text>
                    {/* <Image style={ styles.greetingsImg } source={bellIcon}/> */}
                </View>

                <View style={{height: hp(1)}}></View>

                <Text style={ styles.txtMedium }>What do you want to learn today?</Text>
            </View>
        </ScrollView>
    )
}

export default Screen2;

const styles = StyleSheet.create( {
    container : {
        flex: 1 ,
        // backgroundColor: '#FFF', 
        backgroundColor: "#F8F8F8",
        paddingHorizontal: wp(3), 
        paddingVertical: hp(5)
    },
    greetingsView : {
        flexDirection:'row', 
        justifyContent:'space-between', 
        height: hp(7), 
        width: wp(92)
    },
    greetingsImg : {
        height: hp(4), 
        width: wp(6), 
        margin: hp(1)
    },
    searchBox : {
        width: "100%",
        height: hp(6),
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "#323232",
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flexRow : {
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    txtLarge : {
        color: '#000', 
        fontSize: 24, 
    },
    txtMedium : {
        color: '#888888', 
        fontSize: 14 ,
    },
    txtSmall : {
        color: '#fff', 
        fontSize: 18 ,
        color: 'grey'
    }
})