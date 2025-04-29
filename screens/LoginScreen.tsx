import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { RootStackParamList } from '../App';
import Toast from 'react-native-toast-message'; 

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');

  const sendOtp = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your email.',
      });
      return;
    }
  
    try {
      const url = `https://notifications.sajilni-staging.events/api/otp/send?whitelabelId=cma0o93f20000oz2510s5fjot&identifier=${encodeURIComponent(email)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept-Language': 'ar' },
        redirect: 'follow', 

      });
  
      const responseText = await response.text();
      console.log('Raw Response:', responseText);
  
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'OTP Sent!',
          text2: 'Check your email for the OTP.',
        });
        navigation.navigate('Verify', { email });
      } else {
        let errorMessage = responseText || 'Something went wrong.';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage,
        });
      navigation.navigate('Verify', { email });

      }
    } catch (error) {
      console.error('Network Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong.',
      });

    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/Splash.png')}
        style={styles.BackgroundImage}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Enter your email</Text>

            <View style={styles.inputContainer}>
              <Feather name="mail" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={sendOtp}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.guestButton}>
              <Text style={styles.guestButtonText}>Continue as a guest</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.supportButton}>
              <Feather name="headphones" size={18} color="#333" />
              <Text style={styles.supportText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  BackgroundImage: {
    flex: 1,
   paddingTop: 165,
     marginBottom: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  formContainer: {
    width: '100%',
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
     alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#2B3B69',
    height: 50,
      borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  nextButtonText: {
    color: '#fff',
     fontSize:  16,
    fontWeight: '600',
  },
  guestButton: {
    height: 50,
    marginBottom: 180,
    justifyContent: 'center',
     alignItems: 'center',
  },
  guestButtonText: {
    color: '#2B3B69',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
