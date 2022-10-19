import React from "react";
import AppNavigator from './navigation/AuthNavigator'
import {AppState} from './context/AppState'
import {initTranslate} from './helpers/translate'
import { View, StyleSheet } from "react-native";


initTranslate();

export default function App() {
    return (
        <AppState>
            <View style={styles.container} > 
                <AppNavigator /> 
            </View>
        </AppState>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})