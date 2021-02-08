import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView,Dimensions,Image,Button,TouchableOpacity} from 'react-native';
import { registration } from '../API/firebaseMethods';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { StatusBar } from 'expo-status-bar'
import Button2 from '../shared/button_2'


const DeviceHeight = Dimensions.get('screen').height;

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [studentCode, setCode] = useState('');

  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setCode('');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    }else if (!studentCode) {
        Alert.alert('Confirm code field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else {
      registration(
        email,
        password,
        lastName,
        firstName,
        studentCode
      );
      navigation.navigate('Loading');
      emptyState();

      
    }
  };

  return (
    <KeyboardAwareScrollView>

      <View style={styles.container}>
                <StatusBar style="auto"/>
                <View style={styles.image_view}>  
                        <Image 
                        source={require("../assets/images/dcuhub_logo.png")}
                        resizeMode="contain"
                        resizeMode="center"
                        style={styles.image_style}>
                        </Image>
                    </View> 

                    <View style={{
                        alignSelf: 'center',
                        marginTop: -50,
                        marginBottom: 50
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 17,
                            color: '#696868'
                        }}>{'Welcome to DCU Hub! \nSign up to get started.'} </Text>
                    </View>
     
    
          <View style={styles.top_placeholder}>
                <TextInput 
              style={styles.textInput}
              placeholder="First name*"
              value={firstName}
              onChangeText={(name) => setFirstName(name)}
                ></TextInput>
                 </View>

            
      

        < View style={styles.top_placeholder}>  
                        <TextInput 
                         style={styles.textInput}
                         placeholder="Last name"
                         value={lastName}
                         onChangeText={(name) => setLastName(name)}
                            ></TextInput>
                    </View>

    
            <View style={styles.placeholder_style}>
                        <TextInput 
                             style={styles.textInput}
                             placeholder="Enter your email*"
                             value={email}
                             onChangeText={(email) => setEmail(email)}
                             keyboardType="email-address"
                             autoCapitalize="none"
                            ></TextInput>
                    </View>

<View style={styles.placeholder_style}>
                        <TextInput 
                            style={styles.placeholder_text}
                            placeholder="Enter your password*"
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={true}
                            
                            ></TextInput>
                    </View>

   <View style={styles.placeholder_style}>
                        <TextInput 
                            style={styles.placeholder_text}
                            placeholder="Retype your password to confirm*"
                            value={confirmPassword}
                            onChangeText={(password2) => setConfirmPassword(password2)}
                            secureTextEntry={true}
                            ></TextInput>
                    </View>

<               View style={styles.placeholder_style}>
                        <TextInput 
                            style={styles.placeholder_text}
                            placeholder="Course Code" autoCapitalize="none" onChangeText={Code=> setCode({Code})}
                            value={studentCode}
                            ></TextInput>
                    </View>

            {/* THIS ALSO USES FIREBASE AUTHENTICATION
                        ONCED SIGNED UP, IT SHOULD TAKE THE USER TO THE
                        CREATE PROFILE SECTION/SCREEN */}
                    <View>
                        <Button2 text='SIGN UP' onPress={handlePress}/>
                    </View>


    

          
          <View style={styles.to_signin}>
                    <Text style={{fontSize: 18}}> Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Sign in')}>
                        <Text style={{color: "#d40059", fontSize: 18}}>Sign In</Text>
                    </TouchableOpacity>
                    </View>
      
     </View>
    </KeyboardAwareScrollView>
  );
  
}


const styles = StyleSheet.create({
    container : {
        height: DeviceHeight,
        backgroundColor: "white"
    },
    placeholder_style: {
        marginHorizontal: 40,
        borderWidth: 1.5,
        marginTop:15,
        paddingHorizontal:10,
        borderColor:"#25afcd",
        borderRadius:10,
        paddingVertical: 10// size of the placeholder
    }, 

    top_placeholder: {
        marginHorizontal: 40,
        borderWidth: 1.5,
        marginTop: -10,
        paddingHorizontal:10,
        borderColor:"#25afcd",
        borderRadius: 10,
        paddingVertical: 10
    },

    placeholder_text: {
        paddingHorizontal:10
    }, 
    errorMessage: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
        marginTop: -20,
        marginBottom: 30
    },
    error:{
        color: "#d40059",
        fontSize: 15,
        fontWeight: "600",
        textAlign: "center"
    },
    image_style: {
        width: Dimensions.get('screen').width, 
        height: Dimensions.get('screen').height / 2
    },

    image_view: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: -40
    },

    to_signin: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent: "center",
        marginTop: 10,
    }
})