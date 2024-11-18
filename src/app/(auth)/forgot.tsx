
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabasex } from '../SupabaseClient/supabaseClient';
 // Import your Supabase client
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')


export default function ForgetPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    console.log("Sending reset password request for:", email); // Log email before sending request

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      console.error("Error sending reset email:", error); // Log error if there is one
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(
        "Success",
        "A password reset link has been sent to your email address. Please check your inbox."
      );
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>SEND RESET LINK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },

  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 20,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    fontSize: 16,

  },

  button: {
    backgroundColor: '#F43F5E',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});