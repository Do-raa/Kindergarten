import React from "react";
import i18n from "i18n-js";
import { I18nManager } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates'; 

const defaultContext = {
    user : null,
    lang :'fr', 
    changeLang: () => {}, 
    onLogin: () => {}, 
    onLogout: () => {}  
} 

export const AppContext = React.createContext(defaultContext)

export class AppState extends React.Component {
    
    state = defaultContext
   
    changeLang = (lang) => {
        i18n.locale = lang
        if(lang !=='ar') {
            I18nManager.forceRTL(false);
            this.setState({lang}, ()=> AsyncStorage.setItem('lang',lang) )
        } else {
            I18nManager.forceRTL(true);
            this.setState({lang}, ()=> AsyncStorage.setItem('lang',lang) )
        }
        //Updates.reloadAsync()
    }

    onLogin = (user, rememberMe) => {
        this.setState({user}, ()=> {
            if (rememberMe) AsyncStorage.setItem('user', JSON.stringify(this.state.user))
        })
    }

    onLogout = () => {
        this.setState({user: null}, ()=> AsyncStorage.removeItem('user') )
    }

    render () {
        return (
            <AppContext.Provider 
                value = {{
                    user : this.state.user,
                    lang : this.state.lang,
                    changeLang : this.changeLang, 
                    onLogin: this.onLogin, 
                    onLogout: this.onLogout
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        )
    }

}