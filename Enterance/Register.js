import { StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import {useState} from 'react'


function Register() {

    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible0, setPasswordVisible0] = useState(false);

    return(
        <>
        <View style={styles.container1}>
        <View style={styles.avatar}>
        <Avatar.Image size={84} source={require('../assets/icardi.png')} />
        </View >
        <View style ={styles.textContainer}>
        <Text style={styles.text}>Register</Text>
        <Text style={styles.text2}>Enter Your Personal İnformation </Text>
        </View>
        <View style={styles.container}>
        <View style = {styles.textInput}>
            <TextInput
      mode="outlined"
      label="Username"
      placeholder="Enter Your Username"
      value={username}
      onChangeText={username => setUsername(username)}
      //right={<TextInput.Affix text="/100" />}
    />
    <TextInput
      mode="outlined"
      label="Email"
      placeholder="Enter Your Email"
      value={text}
      onChangeText={text => setText(text)}
      //right={<TextInput.Affix text="/100" />}
    />
    <TextInput
      mode="outlined"
      label="Password"
      placeholder="Enter Your Password"
      secureTextEntry={!passwordVisible} // Şifre görünürlüğü
        right={
          <TextInput.Icon
            icon={passwordVisible ? "eye-off" : "eye"} // Göz ikonu duruma göre değişir
            onPress={() => setPasswordVisible(!passwordVisible)} // Görünürlüğü değiştirir
          />
        }
      value={password}
      onChangeText={password => setPassword(password)}
      //right={<TextInput.Affix text="/100" />}
    />
    <TextInput
      mode="outlined"
      label="Confirm Password"
      placeholder="Enter confirm password"
      secureTextEntry={!passwordVisible0} // Şifre görünürlüğü
        right={
          <TextInput.Icon
            icon={passwordVisible0 ? "eye-off" : "eye"} // Göz ikonu duruma göre değişir
            onPress={() => setPasswordVisible0(!passwordVisible0)} // Görünürlüğü değiştirir
          />
        }
      value={confirmpassword}
      onChangeText={confirmpassword => setConfirmpassword(confirmpassword)}
      
    />
        </View>
        <Button mode="contained" style={[styles.button,{backgroundColor: '#48bee2'},]} >
        <Text style={{fontSize: 18,}}> Register </Text>
      </Button>
      </View>
      </View>
      </>
    )

}

export default Register;


const styles = StyleSheet.create({

    container1:{
        flex: 1,
    },

    container:{
        //flex: 1,
        //justifyContent : 'center',
        //alignItems: 'center',
        //marginTop: 50,
        paddingTop: 20,
        
    },


    textInput:{
        //marginTop: 100,
        //height:  '70%',
        margin: 20,
        padding: 10,
        gap: 50,
        //flex: 1,
        //justifyContent:'center',

           
    },
    button:{
        borderRadius:40,
        width: 350,   
        padding:10,
        alignSelf: 'center',
        margin: 24,
        marginTop: 50,
    },
    avatar:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    text: {
        fontSize: 25,
        //textAlignVertical: "center",
        //textAlign: "left",
        
        fontWeight: 'bold',
        
    },
    text2: {
        fontSize: 20,
        opacity: 0.5
    },
    textContainer: {
        //justifyContent : 'center',
        //alignItems: 'center'
        marginTop:5,
        gap: 10,
        margin:12,
    },



})