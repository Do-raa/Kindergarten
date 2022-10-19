import { View, Text,  StyleSheet } from "react-native";
import Checkbox from 'expo-checkbox';
import TextInputForm from "../components/TextInputForm";
import {Colors} from '../components/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useState,  useContext, useEffect } from "react";
import ButonForm from '../components/ButonForm';
import {loginUser} from '../api/http';
import {AppContext} from '../context/AppState';
import i18n from 'i18n-js';
import LanguageOptions from "../components/LanguagePicker";
import LoadingOverlay from '../components/LoadingOverlay';

function SignIn({navigation}) {

    const ctx = useContext(AppContext); 

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const [isChecked, setChecked] = useState(false);


    async function handleClick ({email, password}){ 
       try{
        await loginUser(email, password);
        ctx.onLogin({email, password}, isChecked); 
        navigation.navigate('profil');
       }catch(error){
        console.log("Unauthorized !")
       }   
   };
    function emailHandler(text){
        setEmail(text);
    }
    function passwordHandler(text){
        setPassword(text);
    }
    function isShown(){
        setIsSecureEntry((prev) => !prev);
    } 
    
    /*if(appCtx.isLoading){
        return <LoadingOverlay message="Loading..."/>
    }*/

    return(

        <LinearGradient style= {{flex: 1}} colors={['#E9DAC1', '#9ED2C6']}>  
                
                 <LanguageOptions/>
            
            <View style={styles.container}> 
            <View> 
                <Text style={styles.title}>{i18n.t('signinScreen.title')}</Text> 
            </View> 
                <View>
                <TextInputForm thirdIcon={{name: "email", size: 20, color: "black"}} textInputConfig={{
                    placeholder: i18n.t('signinScreen.email'), 
                    autoCorrect: false, 
                    onChangeText: emailHandler,
                    value: email, 
                    keyboardType: 'email-address',
                    autoCapitalize: "none",
                }}/> 
                <TextInputForm secondIcon={{name: "eye-off", size: 20, color: "black"}} onPress={isShown} 
                textInputConfig={{
                    placeholder: i18n.t('signinScreen.password'), 
                    autoCorrect: false, 
                    secureTextEntry: isSecureEntry,
                    autoCapitalize: "none",
                    onChangeText: passwordHandler,
                    value: password,
                 
                }}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked}
                              color={isChecked ? '#FFD8A9' : undefined}/>
                     <Text style={styles.paragraph}>Remember mee ...</Text>
                </View>
                <View>
                    <ButonForm name={i18n.t('signinScreen.signInBtn')} onPress={handleClick}/>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{i18n.t('signinScreen.checkingForAccountText')} <Text style={{color: '#187498'}}
                        onPress={() => navigation.navigate('signup')}>{i18n.t('signinScreen.signUpText')}</Text>
                  </Text> 
                  <Text style={[styles.text, {color: '#187498'}]}  onPress={() => 
                        navigation.navigate('forgottenpass')}>{i18n.t('signinScreen.forgotPassText')}
                  </Text>
                </View>
            </View>
        </LinearGradient>
    )
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      //backgroundColor: Colors.backCol,
      //justifyContent: 'center',
      flexDirection: "column",
      alignItems: 'center'
     
    },
    title: {
        marginTop: 100, 
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: 'acme',
        fontSize: 35, 
        color: Colors.titleCol
    }, 
    text: {
        fontSize: 18,
        //fontWeight: '700',
        textAlign: 'center',
        fontFamily: 'dynaPuff'
       
    },
    textContainer: {
          padding: 15
    }, 
    checkbox: {
        margin: 8,
        borderWidth: 4, 
        borderColor: '#FFD8A9'
      },
    paragraph: {
       color: 'black', 
       fontSize: 17,
       fontFamily: 'acme'
    }
  });