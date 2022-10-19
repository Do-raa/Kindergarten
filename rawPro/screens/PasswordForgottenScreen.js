import { StyleSheet, Text, View } from 'react-native';
import TextInputForm from "../components/TextInputForm";
import {Colors} from '../components/Colors';
import ButonForm from '../components/ButonForm';
import { useState,  useContext} from "react";
import { LinearGradient } from 'expo-linear-gradient';
import {AppContext} from '../context/AppState'; 
import i18n from 'i18n-js';
import LanguageOptions from "../components/LanguagePicker";

function ForgottenPassword({navigation}) {
    
    const ctx = useContext(AppContext); 

    const [email, setEmail] = useState(''); 
    const [phone, setPhone] = useState('');
    
    function emailHandler(text){
        setEmail(text);
    }
    function phoneHandler(text){
        setPhone(text);
    }
    
    return(
        <LinearGradient style={{flex: 1}} colors={['#E9DAC1', '#9ED2C6']}>  
            <View>
                <LanguageOptions/>
            </View> 
          <View style={styles.container}>
            <View>
                <Text style={styles.title}>{i18n.t('forgotPassScreen.title')}</Text>
            </View> 
                <View>
                <TextInputForm thirdIcon={{name: "email", size: 20, color: "black"}} textInputConfig={{
                    placeholder: i18n.t('forgotPassScreen.email'), 
                    autoCorrect: false, 
                    keyboardType: 'email-address',
                    autoCapitalize: "none",
                    value: email ,
                    onChangeText: emailHandler 
                }}/> 
                </View> 
                <View>
                    <ButonForm name={i18n.t('forgotPassScreen.changePassBtn')}/>
                </View> 
            <View>
            <Text style={styles.text}>{i18n.t('forgotPassScreen.checkingForAccountText')}<Text style={{color: '#187498'}}
                    onPress={() => navigation.navigate('signup')}>{i18n.t('forgotPassScreen.signUpText')}</Text></Text>
            <Text style={[styles.text,{color: '#187498'}]}
                        onPress={() => navigation.navigate('signin')}>{i18n.t('forgotPassScreen.signInText')}</Text>
            </View>
          </View>
        </LinearGradient>
    )
}

export default ForgottenPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        //backgroundColor: Colors.backCol,
        justifyContent: 'center',
        flexDirection: "column",
        alignItems: 'center',
        marginTop: 0
      },
      title: {
        //marginTop: 100, 
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: 'acme',
        fontSize: 35, 
        marginHorizontal: 8,
        //fontWeight: 'bold',
        color: Colors.titleCol
      }, 
      text: {
        fontSize: 18,
        //fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'dynaPuff'
         
      },
      textContainer: {
            padding: 15
      }
  });
  