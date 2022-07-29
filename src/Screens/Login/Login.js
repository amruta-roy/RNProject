import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import { validateName, validatePassword } from "../../Validator";
import axios from "../../../axios";
import {TextInput as TextInput1} from 'react-native-paper';
import { Icon } from "react-native-elements";

import educaImg from "../../assets/images/educaIcon.png";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const Login = ({navigation}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showpass1, setShowpass1] = useState(true);

    const checkLogin = async() => {

        let userCorrect = false, passwordCorrect = false;

        await axios.get('/users.json?orderBy="username"&equalTo="'+userName.toLowerCase()+'"')
        .then( response => {

          let users = Object.values(response.data);
          
          if(users.length == 0){
            setError("User not found");
            return;
          }
          let userFound = [] ;

          users.forEach((ele) => {
                if(ele.username.toString().toUpperCase == userName.toUpperCase){
                    userCorrect = true;
                    if(ele.password == password){
                        userFound.push(ele);
                        passwordCorrect = true;
                    }
                }
             });

          if(userFound.length > 0)
          {
            console.log("user Found - ",userFound.length);
            navigation.navigate("EventsScreen");
          }
          else{
            if(userCorrect == true && passwordCorrect == false){
                setError("Incorrect Password");
            }
            else{
                setError("Account not found");
            }
          }
        })
        .catch(error => {
            setError("Error in connecting to Database");
        });  
    }

    const validate = () => {

        if(!validateName(userName))
        {
            setError("UserName doesn't match the required format.")
        } else if ( !validatePassword(password))
        {
            setError("Password doesn't match the required format");
        }
        else{
            checkLogin();
        }
    }

    return(
        <View style={{ flex: 1,
            // padding: 20,
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column",
            backgroundColor: "#F8F8F8" 
          }}>
            <View style={{ height: hp(20)}}>
                <View style={{ flex: 1, flexDirection: "row", alignItems:'center', justifyContent:"center",}}>
                   <Image 
                    source={educaImg}
                    style={{ height: hp(10), width: wp(22) , }}/>
                    <View style={{ flexDirection: "column", marginLeft: wp(4),}}>
                        <Text 
                            style={ styles.txtTitle}>EDUCA</Text>
                        <Text 
                            style={ styles.txtTitle}>APP</Text>
                    </View>
                </View>

            </View>
            
            <View style={{ height: hp(15), justifyContent: 'center' }}>
                <Text style={ styles.txtWelcome }>Welcome Back,</Text>
                <Text style={ styles.txtWelcome }>Angela Christina</Text>
            </View>

            <View style={{ height: hp(65), backgroundColor: "#FFF" , borderTopLeftRadius: 40, borderTopRightRadius: 40, elevation: 6, paddingTop: hp(4) }}>

                <Text style={{ fontSize: 18, color: "#000", marginHorizontal: hp(3)}}>
                    Login
                </Text>
                            {/* TextInput for accepting 'UserName' */}
                <View style={styles.outerView}>
                    <Text 
                        style={styles.txtMedium}>UserName/Email
                    </Text>
                    <TextInput
                        style={styles.userNameInput}
                        value={userName}
                        onChangeText={(value)=> setUserName(value)}
                    />
                </View>

                {/* TextInput for accepting 'UserName' */}
                <View style={styles.outerView}>
                    <Text 
                        style={ styles.txtMedium}>Password
                    </Text>
                    <TextInput1
                        style={styles.userNameInput}
                        // label="Password"
                        secureTextEntry={showpass1}
                        value={password}
                        onChangeText={(value)=> setPassword(value)}
                        right={
                            <TextInput1.Icon
                              onPress={() => {
                                setShowpass1(!showpass1)
                              }}
                              name={showpass1 ? 'arrow-left':'eye'}
                            />
                          }
                    />
                </View>
                <TouchableOpacity
                    onPress={()=> alert("Forgot Password screen")}
                >
                <Text style={ {...styles.txtMedium, alignSelf: "flex-end"}}>Forgot Password?</Text>
                </TouchableOpacity>

                { error ? <Text style={{ color: 'red', fontSize: 12, marginLeft: wp(6), marginTop:hp(1)}}>{error}</Text> : null}
                
                <TouchableOpacity
                    style={{...styles.btnLogin, alignSelf: "center"}}
                    onPress={() => validate()}
                >
                    <Text style={styles.txtLabel}>{"Login"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={{...styles.txtSignUp, marginTop: hp(3)}}>
                        Don't have an account ?
                        <Text style={styles.btnSignUp}> Register</Text>
                    </Text>
                </TouchableOpacity>

            </View>
          </View>
    )
}

const styles = StyleSheet.create({
    userNameInput: {
        color:"#000",
        borderColor: 'grey',
        borderBottomWidth: 1, 
        width: wp(90),
        height: hp(5),
        fontSize: 14, 
        marginHorizontal: wp(4), 
        alignSelf: "center",
        backgroundColor: '#fff'
    },
    txtLabel: {
        fontSize:14, 
        color: '#FFF', 
        marginHorizontal: wp(6)
    },
    txtSignUp: {
        fontSize: 14,
        textAlign: "center",
        marginTop: hp(5),
        color: '#000',
    },
    btnSignUp: {
        color: '#00BFFF',
        fontWeight: "bold",
    },
    btnLogin: {
        backgroundColor: '#51C3FE',
        width: wp(76),
        height: hp(6),
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp(3)
      },
      txtTitle: {
        fontFamily: "LilitaOne-Regular",
        fontSize: 24,
        color: "blue",
      },
      txtWelcome: {
        fontSize: 24,
        textAlign: "center",
        color: "#000",
      },
      txtMedium:{
        fontSize:14, 
        color: '#000', 
        marginHorizontal: wp(6) 
      },
      outerView:{
        marginVertical: hp(2), 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        justifyContent: 'center',
    },
})

export default Login;