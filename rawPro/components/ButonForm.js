import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ButonForm({name, onPress}) {
    
    const navigation = useNavigation();

    return(
       
        <View style={styles.outerContainer}>
          <Pressable style={({pressed}) => pressed? [styles.innerContainer, styles.pressed]: styles.innerContainer} 
                     onPress={onPress} android_ripple={{color: '#F9F5EB'}}>
           <Text style={styles.text} >{name}</Text>
          </Pressable>
        </View>
      
    )
}

export default ButonForm; 

const styles = StyleSheet.create({
    outerContainer: {
      borderRadius: 30, 
      borderWidth: 0.75,
      borderColor: '#FFFFDE',
      overflow: 'hidden',
      marginVertical: 15, 
     
    },
    innerContainer: {
        backgroundColor: '#9EB23B',
        elevation: 5,
        shadowColor: 'black', //for elevation on IOS
        shadowRadius: 6, 
        shadowOpacity: 0.25, 
        shadowOffset: {width: 0, height: 2}
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      paddingVertical: 15,
      paddingHorizontal: 50,
    }, 
    pressed: {
      opacity: 0.75
    }
  });