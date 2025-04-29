import React, { useState, useRef, useEffect } from 'react';
import { verifyOtp, resendOtp } from '../utils/otpApi';

import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  StatusBar,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Toast from 'react-native-toast-message';

interface OtpInputRef {
  focus: () => void;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Verify'>;

const VerifyOtpScreen = ({ route, navigation }: Props) => {

  const email = route.params?.email || 'email@example.com';
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState<number>(59);
  const inputRefs = useRef<OtpInputRef[]>([]);


  const isOtpComplete = (): boolean => {
    return otp.every(digit => digit.length > 0);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleOtpChange = (text: string, index: number): void => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  
const handleVerifyOtp = async (): Promise<void> => {
  if (!isOtpComplete()) return;
  const { success, message } = await verifyOtp(email, otp);

  if (success) {
    Toast.show({
      type: 'success',
      text1: 'OTP Verified',
      text2: message,
    });
  } else {
    Toast.show({
      type: 'error',
      text1: 'Verification Failed',
      text2: message,
    });
  }
};

const handleResendCode = async (): Promise<void> => {
  if (timeLeft > 0) return;

  const { success, message } = await resendOtp(email);

  if (success) {
    Toast.show({
      type: 'success',
      text1: 'OTP Sent',
      text2: message,
    });
    setTimeLeft(59);
  } else {
    Toast.show({
      type: 'error',
      text1: 'Failed to Resend',
      text2: message,
    });
  }
};

  return (
    <SafeAreaView style={[styles.container, { paddingTop: -50 }]}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={require('../assets/Splash.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>

          <View style={styles.headerContainer}>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Confirm OTP</Text>
            
            <View style={styles.otpContainer}>
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref: any) => (inputRefs.current[index] = ref)}
                  style={styles.otpInput}
                  value={otp[index]}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              ))}
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                <Feather name="info" size={16} color="#666" /> We sent code to {email}
              </Text>
            </View>

            <TouchableOpacity 
              style={[
                styles.nextButton, 
                isOtpComplete() ? styles.nextButtonActive : {}
              ]}
              onPress={handleVerifyOtp}
              disabled={!isOtpComplete()}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
            
            <View style={styles.helperRow}>
              <TouchableOpacity>
                <Text style={styles.didntReceiveText}>Didn't receive it?</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={handleResendCode} disabled={timeLeft > 0}>
                <Text style={styles.resendText}>
                  Send it again in {timeLeft} sec
                </Text>
              </TouchableOpacity>
            </View>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    paddingTop: 155,
    marginBottom: 200,
    resizeMode: "cover"
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
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    color: '#666',
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: '#D3D9E1',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  nextButtonActive: {
    backgroundColor: '#2B3B69',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  helperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 180,
  },
  didntReceiveText: {
    color: '#333',
    fontSize: 14,
  },
  resendText: {
    color: '#2B3B69',
    fontWeight: '500',
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 0,
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

export default VerifyOtpScreen;
