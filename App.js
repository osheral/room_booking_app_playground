/**
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  WebView
} from 'react-native';
import firebase from './src/firebase';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import htmlFile from './src/hello.html';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  
  componentDidMount() {
    
  }
  
  signInWithPopup() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.error(error);
    });
  }
  
  signInWithRedirect() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    
    firebase.auth().getRedirectResult().then(function (result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      
      console.log(user);
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      
      console.error(error);
    });
  }
  
  ipAddress() {
    fetch('https://dev-room-booking-proximity.herokuapp.com/api/ipaddress')
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
  }
  
  signInUsingLib() {
    GoogleSignin.hasPlayServices({autoResolve: true})
        .then(() => {
          console.log('configuring');
          // play services are available. can now configure library
          return GoogleSignin.configure({
            scopes: ["https://www.googleapis.com/auth/calendar"],
            iosClientId: '',
            webClientId: '469164708927-9e74868dl5o8o77s8q1bt1ll63b1nmt3.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            forceConsentPrompt: true,
            accountName: ''
          })
        })
        .then(() => {
          console.log('signing in');
          return GoogleSignin.signIn();
        })
        .then((user) => {
          console.log(user);
          // user.scopes.forEach(console.log)
        })
        .catch((err) => {
          console.error("Play services error", err);
        })
  }
  
  render() {
    console.log('hello');
    console.log(htmlFile);
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
          <Button
              onPress={() => {
                {/*this.ipAddress();*/
                }
                {/*this.signIn();*/
                }
                this.signInWithRedirect();
              }}
              title="Sign in"/>
          
          <Button
              title="test"
              onPress={() => {
                console.log(location);
              }}
          />
          
          {/*<WebView*/}
          {/*source={{uri: 'https://facebook.com'}}*/}
          {/*style={{marginTop: 20, height: 100, width :200}}*/}
          {/*/>*/}
          
          <GoogleSigninButton
              style={{width: 48, height: 48}}
              size={GoogleSigninButton.Size.Icon}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signInUsingLib.bind(this)}/>
  
          <Button
              title="re - sign in"
              onPress={() => {
                const user = GoogleSignin.currentUser();
                console.log(user);
              }}
          />
          
          <Button
              title="sign out"
              onPress={() => {
                GoogleSignin.revokeAccess()
              }}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
