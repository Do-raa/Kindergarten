import { View, Text,  StyleSheet, Button } from "react-native"; 
import {AppContext} from '../context/AppState'; 
import { useState,  useContext, useEffect } from "react";

function UserProfil({navigation}){ 

    const ctx = useContext(AppContext); 
    
    function handleLogout() {
        ctx.onLogout();
        navigation.navigate("signin");
    }
    return(
        <View style={styles.container}>
            <Text>
                Welcome to your profil
            </Text>
            <Button onPress={handleLogout} title="Back" />
        </View>
    )
} 

export default UserProfil; 

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      //backgroundColor: Colors.backCol,
      justifyContent: 'center',
      flexDirection: "column",
      alignItems: 'center'
     
    },
})