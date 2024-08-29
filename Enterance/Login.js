import { StyleSheet, Text, View, Image,ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import {useState} from 'react'
import { Avatar } from 'react-native-paper';
import { Button } from 'react-native-paper';


function Login(){
    const [text, setText] = useState("");

return(
    <ScrollView>
    <View>
        <View style={styles.avatar}>
        <Avatar.Image size={84} source={require('../assets/icardi.png')} />
        </View>
    <View style={styles.title}>
        <Text style={styles.text}>Login</Text>
        <Text style={styles.text2}>Login to continue using the app </Text>
         </View>
         <View style={styles.textinput}>
         <TextInput
      mode="outlined"
      label="Email"
      placeholder="Enter Your Email"
      //right={<TextInput.Affix text="/100" />}
    />
    <TextInput
      mode="outlined"
      label="Password"
      placeholder="Enter Your Password"
      //right={<TextInput.Affix text="/100" />}
      secureTextEntry
      style={styles.input}
    />
    <Text style={styles.forgot}>Forgot Password?</Text>
    </View>
    <View style={styles.button}>
    <Button mode="contained" style={[styles.button,{backgroundColor: '#0b1ac4'} ]} >
    Login
  </Button>
  </View >
  <View style={{marginTop:0 }}>
  <Text style={{textAlign:'center',fontSize: 20,opacity: 0.5,paddingBottom: 0}}>Or Login With</Text>
  <View style={styles.logoContainer}>
  <Image source={require('../assets/google.png')} style={styles.logo}/>
  <Image source={require('../assets/apple.png')} style={styles.logo}/>
  </View>
  </View>
  <View style ={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
  <Text>Dont have a account? </Text>
  <Text style={{color: '#0b1ac4',fontWeight: 'bold'}}>Register </Text>
  </View>
   </View>
   </ScrollView>

    
)} 

export default Login;

const styles = StyleSheet.create({
   
    title:{
        marginTop: 30,
        margin: 5,
        padding: 24,
        borderColor: '#2e35bc',
    },

    text: {
        fontSize: 25,
        //textAlignVertical: "center",
        textAlign: "left",
        fontWeight: 'bold',
        
    },
    avatar:{
        alignItems: 'center',
        marginTop: 100,
    },
    text2:{
        opacity: 0.5,
    },
    textinput:{
        
        margin: 20,
        height: 70,
        borderRadius: 150,
        padding:10,
        justifyContent:'space-between',
        

    },
    button:{
        borderRadius:40,
        width: 350,
        padding: 10,
        alignSelf: 'center',
        marginTop:90,
        margin: 24,
        
        
    },
    input:{
        marginTop: 40,
    },
    forgot:{
        padding: 3,
        //flexDirection: 'column',
       // marginLeft: 230
       textAlign: 'right',
       fontSize: 15,

    },

    logoContainer:{
        flexDirection: 'row',  // Yatay düzen
        justifyContent: 'center',  // Ortala
        alignItems: 'center',  // Dikeyde ortala
        marginVertical: 20,
           
    },
    logo:{
        width: 50,  
        height: 50,  
    marginHorizontal: 20,
    }

})