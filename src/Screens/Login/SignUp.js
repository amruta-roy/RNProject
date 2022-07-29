import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import { RadioButton } from "react-native-paper";
import { validateName, validatePassword } from "../../Validator";
import axios from "../../../axios";
import educaImg from "../../assets/images/educaIcon.png";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


  const RadioBtn = (props) => {
    
    let checkValue = props.checked.checked ? props.checked.checked : 'student';
  
    return (
      <View style={{ flexDirection:"row"}}>
        <RadioButton
          value="student"
          color="#00BFFF"
          status={ checkValue === 'student' ? 'checked' : 'unchecked' }
          onPress={() => props.onPress('student')}
        />
        <Text style={{ marginTop:hp(0.8)}}>Student</Text>
        <View style={{ width: wp(8)}}/>
        <RadioButton
          value="teacher"
          color="#00BFFF"
          status={ checkValue === 'teacher' ? 'checked' : 'unchecked' }
          onPress={() => props.onPress('teacher')}
        />
        <Text style={{ marginTop:hp(0.8)}}>Teacher</Text>
      </View>
    );
  };

const SignUp = ({navigation}) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error , setError] = useState('');
    const [checked, setChecked] = useState('');

    // fucntion to validate the user input - UserName, Password and Confirm Password fields
    const validate = () => {
        
        setError('');

        if(!validateName(userName))
            setError("UserName is not in proper format.");
        else if ( !validatePassword(password))
            setError("Password doesn't match the required format");
        else if ( !validatePassword(confirmPassword))
            setError("Password doesn't match the required format");
        else if( password != confirmPassword)
            setError("The two Passwords do not match");
        else
            addUser();
    }

    // Function to check whether entered 'UserName' is already registered
    // If Not - Add User to DB.
    // If Yes - Display error message
    const addUser = async()=> {

        // Check whether userName has already been registered.

        let userFound = false;
        await axios.get('/users.json?orderBy="username"&equalTo="'+userName.toLowerCase()+'"')
        .then( response => {
            console.log("state userName:"+userName+"\tPassword:"+password)

            let users = Object.values(response.data);
            console.log("Users data - ",users.length);
            
            if(users.length == 0)
            userFound =  false;
            else
            userFound = true;
        })
        .catch(error => {
            console.log('DB error - Couldnt fetch users');
            userFound =  false;
        });

        // If not already registered - create a new User
        if(!userFound)
        {
            // Set the User credentials to be passed as JSON
            const userData = {
                username: userName.toLowerCase(),
                password: password
            }

            await axios.post( '/users.json', userData )
                .then( response => {
                    // On successfull account creation - navigate to DashBoard
                    navigation.navigate("DashBoard");
                } )
                .catch( error => {
                    setError("N/W error. Account could not be created.")
                } );
                alert("Account created successfully!!");
        }
        else{   // UserName already Registered - set Error
            setError("UserName already registered !!")
        }   
    }

    return(
        <View style={{ flex:1 }}>
            <View style={{ height: hp(20), flexDirection: "row", alignItems:'center', justifyContent:"center", }}>
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

            <View style={{ height: hp(15), justifyContent: 'center' }}>
                <Text style={ styles.txtWelcome }>Hi, Let's Make a</Text>
                <Text style={ styles.txtWelcome }>Journey with Us</Text>
            </View>

            <View style={{ height: hp(65),backgroundColor: "#FFF" , borderTopLeftRadius: 40, borderTopRightRadius: 40, elevation: 6, paddingTop: hp(4) }}>
                <Text style={{ fontSize: 18, color: "#000", marginHorizontal: hp(3)}}>
                    Register
                </Text>
                
                {/* TextInput for accepting 'UserName' */}
                <View style={styles.outerView}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={"#000"}
                        style={styles.userNameInput}
                        value={userName}
                        onChangeText={(value)=> setUserName(value)}
                    />
                </View>

                {/* TextInput for accepting 'UserName' */}
                <View style={styles.outerView}>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={"#000"}
                        style={styles.userNameInput}
                        // placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(value)=> setPassword(value)}
                    />
                </View>

                {/* TextInput for accepting 'Phone Number' */}
                <View style={styles.outerView}>
                    <TextInput
                        placeholder="Phone Number"
                        placeholderTextColor={"#000"}
                        style={styles.userNameInput}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(value)=> setPassword(value)}
                    />
                </View>

                <View style={{ marginHorizontal: wp(5), marginTop: hp(2) }}>
                    <Text style={{ marginBottom: hp(1), color: '#000', fontSize: 14}}>Register As a?</Text>
                    <RadioBtn checked={checked} onPress={(checked) => setChecked({checked})}/>
                    
                </View>

                { error ? <Text style={{ color: 'red', fontSize: 12, marginLeft: wp(15)}}>{error}</Text> : null}
                
                <TouchableOpacity
                    style={{...styles.btnLogin, alignSelf: "center"}}
                    // onPress={() => validate()}
                    onPress={() => navigation.navigate("BottomTab")}
                >
                    <Text style={styles.txtLabel}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{...styles.txtSignUp, marginTop: hp(3)}}>
                        Have an account ?
                        <Text style={styles.btnSignUp}> Login </Text>
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
        
        // <ScrollView>
        //     {/* Display screen title */}
        //     <Text 
        //         style={ styles.txtTitle}>Sign Up
        //     </Text>

        //     {/* TextInput for accepting 'UserName' */}
        //     <View style={styles.outerView}>
        //         <Text 
        //             style={{ fontSize:14, color: '#000', marginLeft: wp(15)}}>UserName
        //         </Text>
        //         <TextInput
        //             style={styles.userNameInput}
        //             placeholder="UserName"
        //             placeholderTextColor={'grey'}
        //             value={userName}
        //             onChangeText={(value)=> setUserName(value)}
        //         />
        //     </View>

        //     {/* TextInput for accepting 'Password' */}
        //     <View style={ styles.outerView }>
        //         <Text 
        //             style={{ fontSize:14, color: '#000', marginLeft: wp(15)}}>Password
        //         </Text>
        //         <TextInput
        //             style={styles.userNameInput}
        //             placeholder="Password"
        //             secureTextEntry={true}
        //             value={password}
        //             onChangeText={(value)=> setPassword(value)}
        //         />
        //     </View>

        //     {/* TextInput for accepting 'Confirm Password' */}
        //     <View style={ styles.outerView }>
        //         <Text 
        //             style={{ fontSize:14, color: '#000', marginLeft: wp(15)}}>Confirm Password
        //         </Text>
        //         <TextInput
        //             style={styles.userNameInput}
        //             placeholder="Confirm Password"
        //             secureTextEntry={true}
        //             value={confirmPassword}
        //             onChangeText={(value)=> setConfirmPassword(value)}
        //         />
        //     </View>

        //     {/* Display Error text in case of any Error */}
        //     { error.length > 0 ? <Text style={ styles.txtError }>{error}</Text> : null}

        //     {/* Button for submitting "Create Account" request */}
        //     <TouchableOpacity
        //         style={{...styles.btnLogin, alignSelf: "center"}}
        //         onPress={() => validate()}
        //     >
        //         <Text style={styles.txtLabel}>Create Account</Text>
        //     </TouchableOpacity>

        //     {/* Provide the user option to redirect to Login Screen if already registered */}
        //     <TouchableOpacity
        //       onPress={() => navigation.navigate('Login')}
        //     >
        //       <Text style={{...styles.txtSignUp, marginTop: hp(3)}}>
        //         Already an User ? 
        //         <Text style={styles.btnSignUp}> SignIn</Text>
        //       </Text>
        //     </TouchableOpacity>

        //     <View
        //         style={{
        //             flexDirection: "column",
        //             justifyContent: "flex-start",
        //             marginTop: hp(5),
        //             marginHorizontal: wp(10)
        //         }}
        //         >
        //         <Text
        //             style={{ marginBottom: hp(1), fontSize: 16 , fontWeight: 'bold' }}
        //         >UserName may contain the following - </Text>
        //         <Text
        //             style={{ marginBottom: hp(1) }}
        //             >1) Lower case or Upper case letters</Text>
        //         <Text
        //             style={{ marginBottom: hp(1) }}
        //             >2) Digits from 0 - 9</Text>
        //         <Text
        //             style={{ marginBottom: hp(1) }}
        //             >3) Maximum 30 in length</Text>
        //     </View>

        //     <View
        //         style={{
        //             flexDirection: "column",
        //             justifyContent: "flex-start",
        //             marginTop: hp(2),
        //             marginHorizontal: wp(10)
        //         }}
        //         >
        //         <Text
        //             style={{ marginBottom: hp(1), fontSize: 16 , fontWeight: 'bold' }}
        //         >Password must contain the following - </Text>
        //         <Text
        //             style={{ marginBottom: hp(1) }}
        //             >1) At least one upper case letter</Text>
        //         <Text
        //             style={{ marginBottom: hp(1) }}
        //             >2) At least one lower case letter</Text>
        //         <Text
        //             style={{ marginBottom: hp(1)}}
        //             >3) At least one digit</Text>
        //         <Text
        //             style={{ marginBottom: hp(1) }}
        //             >4) At least one special character</Text>
        //         <Text
        //             style={{ marginBottom: hp(1) }}
        //             >5) Minimum 8 in length</Text>
        //     </View>
        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    outerView:{
        marginVertical: hp(2), 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        justifyContent: 'center'
    },
    userNameInput: {
        color:"#000",
        borderColor: 'grey',
        borderBottomWidth: 1, 
        width: wp(90),
        height: hp(5),
        fontSize: 14, 
        marginHorizontal: wp(4), 
        alignSelf: "center"
    },
    txtSignUp: {
        fontSize: 16,
        textAlign: "center",
        marginTop: hp(5),
        color: '#000',
    },
    txtError: {
        color: 'red', 
        fontSize: 16, 
        marginLeft: wp(15)
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
      txtLabel: {
        fontSize:14, 
        color: '#FFF', 
        marginHorizontal: wp(6)
    },
      txtWelcome: {
        fontSize: 24,
        textAlign: "center",
        color: "#000",
      },
      txtTitle: {
        fontFamily: "LilitaOne-Regular",
        fontSize: 24,
        color: "#000",
      },
})

export default SignUp;