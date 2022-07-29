import React , {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import { RadioButton } from "react-native-paper";

import image1 from '../assets/images/Payment1.png';
import image2 from '../assets/images/Payment2.png';
import image3 from '../assets/images/Payment3.png';
import Credit from "../assets/images/Visa.png";
import PayPal from "../assets/images/PayPal.png";
import ApplePay from "../assets/images/ApplePay.png";

const Payment = () => {
    const [checked, setChecked] = useState('Credit');

    return(
        <View>
            
            <View style={{ height:hp(15), marginHorizontal: wp(1), flexDirection:'row', alignItems:'center', justifyContent: "center"}}>
                <View style={styles.topView1}>
                    <Image
                        source={image1}
                        style={{ height: hp(5), width: wp(8)}}
                    />
                    <Text style={{ color:'#51C3FE', marginTop: hp(1)}}>Review</Text>
                </View>
                <Text style={{ color:'#51C3FE', marginTop: hp(-4), textAlign:'center'}}>--------------------</Text>
                <View style={styles.topView1}>
                    <Image
                        source={image2}
                        style={{ height: hp(5), width: wp(9)}}
                    />
                    <Text style={{ color:'#51C3FE', marginTop: hp(1)}}>Payment Method</Text>
                </View>
                <Text style={{ color:'grey', marginTop: hp(-4)}}>-----------------</Text>
                <View style={styles.topView1}>
                    <Image
                        source={image3}
                        style={{ height: hp(5), width: wp(7)}}
                    />
                    <Text style={{ color:'grey', marginTop: hp(1)}}>Payment</Text>
                </View>
            </View>


            <View style={styles.optionsView}>
                <Text style={{...styles.txtMedium, textAlign:'left'}}>
                    Payment Method
                </Text>

                <View style={{ height: hp(4)}}/>

                <View style={{ flexDirection:"column"}}>
                    <View style={styles.payOptionsView}>
                        <View style={{ flexDirection:"row", }}>
                            <RadioButton
                                value="Credit"
                                color="#00BFFF"
                                status={ checked === 'Credit' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('Credit')}
                            />
                            <Text style={styles.txtPayOptions}>Credit Card</Text>
                        </View>
                        <Image
                            source={Credit}
                            style={{ height: hp(4),width: wp(25), alignItems:'flex-end'}}/>
                    </View>

                    <View style={{ height: hp(2)}}/>

                    <View  style={styles.payOptionsView}>
                        <View style={{ flexDirection:"row", }}>
                            <RadioButton
                                value="PayPal"
                                color="#00BFFF"
                                status={ checked === 'PayPal' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('PayPal')}
                            />
                            <Text  style={styles.txtPayOptions}>PayPal</Text>
                        </View>
                        <Image
                            source={PayPal}
                            style={{ height: hp(4),width: wp(20)}}/>
                    </View>

                    <View style={{ height: hp(2)}}/>
                    
                    <View  style={styles.payOptionsView}>
                        <View style={{ flexDirection:"row", }}>
                            <RadioButton
                                value="Apple"
                                color="#00BFFF"
                                status={ checked === 'Apple' ? 'checked' : 'unchecked' }
                                onPress={() => setChecked('Apple')}
                            />
                            <Text style={styles.txtPayOptions}>Apple Pay</Text>
                        </View>
                        <Image
                            source={ApplePay}
                            style={{ height: hp(5),width: wp(20)}}/>
                    </View>
                </View>
            </View>
            
            
            <View style={{ height:hp(15), flexDirection:'row', alignItems:'center', paddingHorizontal:wp(5)}}>
                <View style={{ flexDirection:"column", alignItems:'flex-start', marginRight: wp(10)}}>
                    <Text style={styles.txtSmall}>Purchase Date</Text>
                    <Text style={{marginTop: hp(1)}}>01/09/2020</Text>
                </View>
                <View style={{ flexDirection:"column", alignItems:'flex-start', marginRight: wp(10)}}>
                    <Text style={styles.txtSmall}>Price</Text>
                    <Text style={{marginTop: hp(1)}}>$240</Text>
                </View>
                <View style={{ flexDirection:"column", alignItems:'flex-start'}}>
                    <Text style={styles.txtSmall}>Discount</Text>
                    <Text style={{marginTop: hp(1)}}>-$120 <Text style={{ color: "blue"}}>(50%)</Text></Text>
                </View>
            </View>

            <View style={{ height:hp(15), flexDirection:'row', alignItems:'center', justifyContent:'center', borderTopWidth: 1, borderBottomWidth: 1, borderColor:'lightgrey'}}>
                <Text style={styles.txtSmall}>Total Price</Text>
                <Text>  -------------------  </Text>
                <Text style={styles.txtLarge}>$120</Text>
                <TouchableOpacity
                    style={{...styles.btnCheckout, alignSelf: "center"}}
                    onPress={() => alert("Proceed to Checkout")}
                >
                    <Text style={styles.txtLabel}>{"Checkout"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Payment;

const styles = StyleSheet.create( {
    txtSmall: {
        fontSize: 14,
        color: '#000',
        // fontWeight:'bold'
    },
    txtMedium:{
        fontSize: 18,
        color: '#000',
        // fontWeight:'bold'
    },
    txtLarge: {
        fontSize: 22,
        color: '#000',
        fontWeight:'bold'
    },
    btnCheckout: {
        backgroundColor: '#51C3FE',
        width: wp(36),
        height: hp(6),
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: hp(3)
      },
      txtLabel: {
        fontSize:14, 
        color: '#FFF', 
        marginHorizontal: wp(6)
    },
    topView1:{
        flexDirection: "column", 
        alignItems:'center'
    },
    optionsView: {
        height:hp(45), 
        flexDirection:'column', 
        borderTopWidth: 1, 
        borderBottomWidth: 1, 
        borderColor:'lightgrey', 
        marginHorizontal: wp(3), 
        paddingVertical: hp(3)
    },
    payOptionsView: {
        flexDirection:"row", 
        // alignItems:"flex-start",
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:1, 
        borderColor: 'lightgrey', 
        height: hp(7)
    },
    txtPayOptions : {
        fontSize: 16, 
        color:"#000", 
        marginTop:hp(0.8)
    }
});