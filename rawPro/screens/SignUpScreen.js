import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useState,  useContext } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import TextInputForm from "../components/TextInputForm";
import ButonForm from '../components/ButonForm';
import {Colors} from '../components/Colors';
import {registerUser} from '../api/http';
import i18n from 'i18n-js';
import {AppContext} from '../context/AppState';
import LanguageOptions from "../components/LanguagePicker";
import LoadingOverlay from '../components/LoadingOverlay';


function SignUp({navigation}) {

    const [error, setError] = useState('')
    const [inputValues, setInputValues] = useState({
        firstName: '', 
        lastName: '', 
        email: '',
        phone: '', 
        password: '',
        confirmPassword: ''
    }); 
   
    const [isSecureEntry, setIsSecureEntry] = useState(true);

    async function handleClick (){  
      
      isValidForm(inputValues);
      try{
        await registerUser(inputValues);  
      }catch(error){
     console.log("Unauthorized !!")
      }  
     
   };
    function isShown(){
        setIsSecureEntry((prev) => !prev);
    }
    function inputChangeHandler(inputIdentifier, enteredValue){
         setInputValues((currentValues)=> {
          return{  
            ...currentValues, 
            [inputIdentifier]: enteredValue
         }
         })
    }
    const updateError = (error, stateUpdater) =>{
        stateUpdater(error); 
        setTimeout(() => {
            stateUpdater('');
        }, 5000)
}
const isValidEmail = (value) => {
    const regx = /^([A-Za-z0-9_\-\.])+([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,7})$/;
    return regx.test(value);
}
const isValidForm = () => { 
if(Object.values(inputValues).every(value => value.trim()) == false)
            { return updateError('all fields are required !', setError) }
if(!inputValues.firstName.trim() || inputValues.firstName.length < 3) {return updateError('Invalid name field !', setError)} 
if(!inputValues.lastName.trim() || inputValues.lastName.length < 3) {return updateError('Invalid name field !', setError)} 
if(!inputValues.phone.trim() || inputValues.phone.length < 8){return updateError('Invalid phone number !', setError)}
if(!isValidEmail(inputValues.email)){return updateError('Invalid email field !', setError)} 
if(!inputValues.password.trim() || inputValues.password.length < 8) {return updateError('Password must have at least 8 characters !', setError)} 
if(inputValues.password !== inputValues.confirmPassword) {return updateError('Password does not match !', setError)} 
return true;
}

    
    return(
        <ScrollView>
        <LinearGradient style={{flex: 1}} colors={['#E9DAC1', '#9ED2C6']}> 
            <View>
                <LanguageOptions/>
            </View>
            <View style={styles.container}>
            <View>
                <Text style={styles.title}>{i18n.t('signupScreen.title')}</Text>
                <Text style={styles.text}>{i18n.t('signupScreen.identitySubtitle')}</Text>
            </View> 
            { error ?  (<Text style={{color: 'red', fontSize: 20, textAlign: 'center'}}>{error}</Text>) :  null}
                <View>
                    <View style={styles.identifierContainer}>
                        <Text style={styles.photoIdentifier}>{i18n.t('signupScreen.parent')}</Text> 
                        <Text style={styles.photoIdentifier}>{i18n.t('signupScreen.daycare')}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../assets/images/parent.png')} />
                    <Image style={styles.image} source={require('../assets/images/teacher.jpg')} />
                    </View>
                </View>
                <View>
                <TextInputForm firstIcon={{name: "person", size: 20, color: "black"}} textInputConfig={{
                    placeholder: i18n.t('signupScreen.firstName'), 
                    autoCorrect: false, 
                    onChangeText: inputChangeHandler.bind(this, 'firstName'),
                    value: inputValues.firstName
                 
                }}/>
                 <TextInputForm firstIcon={{name: "person", size: 20, color: "black"}} textInputConfig={{
                    placeholder: i18n.t('signupScreen.lastName'), 
                    autoCorrect: false, 
                    onChangeText: inputChangeHandler.bind(this, 'lastName'),
                    value: inputValues.lastName
                 
                }}/>
                 <TextInputForm fourthIcon={{name: "phone", size: 20, color: "black"}} textInputConfig={{
                    placeholder: i18n.t('signupScreen.phone'), 
                    autoCorrect: false,
                    maxLength: 8, 
                    keyboardType: "phone-pad",
                    onChangeText: inputChangeHandler.bind(this, 'phone'),
                    value: inputValues.phone
                 
                }}/>
                 <TextInputForm thirdIcon={{ name:"email" ,size: 20, color: "black"}} textInputConfig={{
                    placeholder: i18n.t('signupScreen.email'),  
                    autoCorrect: false, 
                    keyboardType: 'email-address',
                    autoCapitalize: "none",
                    value: inputValues.email,
                    onChangeText: inputChangeHandler.bind(this, 'email'),
                   
                 
                }}/>
                <TextInputForm secondIcon={{name: "eye-off", size: 20, color: "black"}} onPress={isShown} 
                textInputConfig={{
                    placeholder: i18n.t('signupScreen.password'),  
                    autoCorrect: false, 
                    secureTextEntry: isSecureEntry,
                    autoCapitalize: "none",
                    onChangeText: inputChangeHandler.bind(this, 'password'),
                    value: inputValues.password
                 
                }}/> 
                <TextInputForm secondIcon={{name: "eye-off", size: 20, color: "black"}} onPress={isShown} 
                textInputConfig={{
                    placeholder: i18n.t('signupScreen.confirmPass'), 
                    autoCorrect: false,
                    secureTextEntry: isSecureEntry,
                    autoCapitalize: "none", 
                    onChangeText: inputChangeHandler.bind(this, 'confirmPassword'),
                    value: inputValues.confirmPassword
                 
                }}/>
                </View>
                <View>
                <ButonForm name={i18n.t('signupScreen.signUpBtn')} onPress={handleClick}/>
                </View>
                <View style={styles.textContainer}>
                <Text style={styles.text}>{i18n.t('signupScreen.checkingForAccountText')} <Text style={{color: '#187498'}}
                        onPress={() => navigation.navigate('signin')}>{i18n.t('signupScreen.signInText')}</Text></Text> 
                </View>     
            </View>   
        </LinearGradient>
        </ScrollView>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        //backgroundColor: Colors.backCol,
        justifyContent: 'center',
        flexDirection: "column",
        alignItems: 'center'
    },
    title: {
        marginTop: 30, 
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: 'acme',
        fontSize: 35, 
        //fontWeight: 'bold',
        color: Colors.titleCol
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        borderRadius: 50, 
        borderColor: '#F9F5EB',
        borderWidth: 6,
        height: 80, 
        width: 80, 
        padding: 15,
        marginHorizontal: 25
    
    }, 
    text: {
        fontSize: 18,
        //fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: "dynaPuff"
       
    },
    textContainer: {
          padding: 15,
          marginBottom: 30
    }, 
    identifierContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
    },
    photoIdentifier: {
        marginVertical: 15, 
        marginHorizontal: 38,
        fontFamily: "dynaPuff",
       // fontWeight: 'bold',
        fontSize: 18
       
    }
  });