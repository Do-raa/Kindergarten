import { StyleSheet, View, TextInput, TouchableOpacity} from 'react-native'; 
import {Colors} from './Colors';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
 


function TextInputForm({textInputConfig, firstIcon, secondIcon, thirdIcon, fourthIcon, onPress}) {
    
   
    return(
        <View style={styles.container}> 
            <View style={styles.input}>

               { firstIcon?  <Ionicons  style={styles.icon} {...firstIcon} /> :
                 secondIcon? <TouchableOpacity onPress={onPress}><Ionicons style={styles.icon} {...secondIcon} /></TouchableOpacity>:
                 thirdIcon? <MaterialIcons style={styles.icon} {...thirdIcon} /> :
                 <FontAwesome style={styles.icon} {...fourthIcon}/> 
                 }
                
                 
                 <TextInput style={styles.textInput} {...textInputConfig} />
            </View>
        </View>
    )
} 

export default TextInputForm; 

const styles = StyleSheet.create({
    container: {
       
    },
    input: {
        borderRadius: 10,
        borderWidth: 3, 
        borderColor: Colors.bordCol,
        minWidth: '70%',
        elevation: 4, 
        backgroundColor: Colors.inputBackColor,
        margin: 10, 
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 6,
        shadowColor: 'black', //for elevation on IOS
        shadowRadius: 6, 
        shadowOpacity: 0.25, 
        shadowOffset: {width: 0, height: 2}
    },
    textInput:{
       color: Colors.textInputColor,
       fontSize: 15,
       fontWeight: '500',
       minWidth: '60%'
    },
    icon: {
        padding: 6,
    }
  });