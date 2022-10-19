import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import AppContextProvider from './context/index';
import ScreenNavigation from './screens/ScreenNavigation';
import { NavigationContainer } from '@react-navigation/native'; 
import * as SplashScreen from 'expo-splash-screen'; 
import { useEffect, useCallback } from "react";



export default function App() { 

 const [loaded] = useFonts({
        dynaPuff: require('./assets/fonts/DynaPuff.ttf'),
        roboto : require('./assets/fonts/Roboto.ttf'),
        dmSerif: require('./assets/fonts/DMSerif.ttf'), 
        acme: require('./assets/fonts/Acme-Regular.ttf'),
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
          return null 
        }
        
  
  return (
  
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>  
  
       <AppContextProvider> 
        <NavigationContainer>
            <StatusBar style="auto" /> 
            <ScreenNavigation/> 
        </NavigationContainer> 
      </AppContextProvider>
     
    </SafeAreaView> 
 
    
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    color: 'black',
    fontSize: 16,
    marginBottom: 12,
  },
});


