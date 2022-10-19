import { View, StyleSheet } from "react-native";
import {AppContext} from '../context/AppState'; 
import { useContext } from "react";
import { Fontisto } from '@expo/vector-icons';
import {Picker } from  "@react-native-picker/picker";


function LanguageOptions(){ 

    const ctx = useContext(AppContext); 
    
    return( 
        <View style={styles.container}> 
           <Fontisto name="earth" size={20} color="black" />
            <View>
            <Picker 
                mode= {'dropdown'}
                style={{ height: 50, width: 130}}
                selectedValue={ctx.lang}
                onValueChange={(lang)=>ctx.changeLang(lang)}
            >   
            <Picker.Item label="Anglais" value="en" /> 
            <Picker.Item label="Arabe" value="ar" /> 
            <Picker.Item label="Français" value="fr" />
           </Picker>
            </View>   
        </View> 
       
    )
} 

export default LanguageOptions; 

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', 
      alignItems: 'center',
      marginTop: 70, 
      marginLeft: 15,
    } 
})