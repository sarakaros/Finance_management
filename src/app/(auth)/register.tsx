import React, { useState, useLayoutEffect } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { router, useNavigation } from 'expo-router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function signUpWithEmail() {
    if (!isValidEmail(email)) {
      Alert.alert('Error:', 'Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error:', 'The two passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const { data: { session }, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            
              Name: "",
              PhoneNumber: "",
              BirthDate: "",
              Occuppation: "",
              Gender: "",
              

            
          },
        },
    });

      if (error) {
        console.error('Error during sign up:', error);
        Alert.alert('Error during sign up');
      } else {
        console.log('Sign up successful:', session);
        if (!session) {
          Alert.alert('Please check your inbox for email verification!');
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>
      <Text style={styles.subheading}>Sign up to get started!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter Email"
          placeholderTextColor="#A3A3A3"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Enter Password"
          placeholderTextColor="#A3A3A3"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
          placeholder="Confirm Password"
          placeholderTextColor="#A3A3A3"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={signUpWithEmail}
        disabled={loading}
      >
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* Link to Sign In */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.signInText}>
          Already have an account? <Text style={styles.signInLink}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#111',
  },
  subheading: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#6B6B6B',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  signUpButton: {
    backgroundColor: '#F43F5E',
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    textAlign: 'center',
    color: '#6B6B6B',
  },
  signInLink: {
    color: '#000',
    fontWeight: 'bold',
  },
});
