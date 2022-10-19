import SignIn from '../screens/SignInScreen';
import SignUp from '../screens/SignUpScreen';
import ForgottenPassword from '../screens/PasswordForgottenScreen';

import UserProfil from '../screens/ProfilScreen'; // to delete 

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'; 
import { useEffect, useCallback,  useContext } from "react";
import {AppContext} from '../context/AppState';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => { 
   
  const ctx = useContext(AppContext); 
    const [loaded] = useFonts({
        dynaPuff: require('../assets/fonts/DynaPuff.ttf'),
        roboto : require('../assets/fonts/Roboto.ttf'),
        dmSerif: require('../assets/fonts/DMSerif.ttf'), 
        acme: require('../assets/fonts/Acme-Regular.ttf'),
         });
    
      
         useEffect(() => {
          async function prepare() { 
            await SplashScreen.preventAutoHideAsync();
          }
          prepare();
        }, []); 

        const onLayoutRootView = useCallback(async () => {
          if (loaded) {
            await SplashScreen.hideAsync();
          }
        }, [loaded]);

        if (!loaded) {
          return null; 
        } 
        
    return(
        <SafeAreaView style={{flex: 1}} onLayout={onLayoutRootView}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="signin" screenOptions={{headerShown: false}} > 
            {ctx.user !== null ? <Stack.Screen name="profil" component={UserProfil} />  :
            <Stack.Screen name="signin"  component={SignIn} /> }
            <Stack.Screen name="signup" component={SignUp} />   
            <Stack.Screen name="forgottenpass" component={ForgottenPassword} />
        </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaView>
    )
}
export default AuthNavigator;