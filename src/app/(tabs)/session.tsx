import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Animated, Easing, Image } from 'react-native';
import { useAuth } from '../../providers/AuthProvider';
import { Link, useNavigation } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

export default function SessionScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCancelPressed, setCancelPressed] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  const handleLogoutPress = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    logout();
  };

  // const handleSaveUserName = async () => {
  //   try {
  //     const { data, error } = await supabase.auth.updateUser({
  //       data: { userName: "KHANH BO DANG YEW" },
  //     });
  //   } catch (err) {
  //     console.error('Unexpected error:', err);
  //   }
  // };
/**
 * 
 *Name: name,
              PhoneNumber: phone,
              BirthDate: birthdate,
              Occuppation: occupation,
              Gender: gender,
 */






  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="../hiddenScreen/editProfile" asChild>
          <TouchableOpacity>
            <View style={{ flex: 1, top: 130, right: -100 }}>
              <Image style={{ zIndex: 1 }} source={require('../../../assets/image.png')} />
            </View>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.iconCircle}>
        <AntDesign name="user" size={50} color="#f43f5e" style={{ bottom: 2 }} />
      </View>





      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <FontAwesome6 name="user-large" size={22} color="#6B6B6B" />
          <Text style={styles.value}>{user.user_metadata.Name || 'User Name'}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <MaterialIcons name="phone" size={24} color="#6B6B6B" />
          <Text style={styles.value}>{user.user_metadata.PhoneNumber || 'Phone Number'}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <MaterialIcons name="cake" size={24} color="#6B6B6B" />
          <Text style={styles.value}>{user.user_metadata.BirthDate || 'Birthday'}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <MaterialIcons name="work" size={24} color="#6B6B6B" />
          <Text style={styles.value}>{user.user_metadata.Occuppation || 'Work'}</Text>
        </View>
        <View style={styles.divider} />


        <View style={styles.row}>
          <MaterialIcons name="work" size={24} color="#6B6B6B" />
          <Text style={styles.value}>{user.user_metadata.Gender || 'Gender'}</Text>
        </View>
        <View style={styles.divider} />

        <View style={styles.row}>
          <MaterialIcons name="email" size={24} color="#6B6B6B" />
          <Text style={styles.value}>{user?.email || 'Email'}</Text>
        </View>
        <View style={styles.divider} />

        {/* <TouchableOpacity onPress={handleSaveUserName}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity> */}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress} activeOpacity={0.3}>
        <Text style={styles.logoutButtonText}>LOG OUT</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.iconContainer}>
              <Text style={styles.exclamationIcon}>⚠️</Text>
            </View>
            <Text style={styles.modalText}>Do you want to log out?</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.cancelButton, isCancelPressed && styles.cancelButtonPressed]}
                onPressIn={() => setCancelPressed(true)}
                onPressOut={() => setCancelPressed(false)}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.confirmButton} onPress={confirmLogout}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#f43f5e',
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    width: 500,
    bottom: -200,
    right: 30,
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
    alignSelf: 'center',
    top: 70, // Tăng giá trị này để đẩy icon xuống
    borderColor: "#f43f5e",
    zIndex: 1000,
    right: 110,
  },
  
infoContainer: {
  backgroundColor: '#FFFFFF',
  padding: 20,
  borderRadius: 30,
  marginBottom: 30,
  borderWidth: 1,
  borderColor: '#E5E5E5',
  top: 20, // Tăng giá trị này để đẩy khung thông tin xuống
  height: '100%',
  width: 412,
  right: 30,
},

//chinh icon/tenance icon
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 30,
    left: -19,
    paddingVertical: 6,
    top:20
  },
  
  value: {
    fontSize: 18,
    color: '#111',
    marginLeft: 10,
  },

  divider: {
    height: 3,
    backgroundColor: '#f43f5e',
    marginVertical: 10,
    width: '100%',
  },

  saveButton: {
    textAlign: 'center',
    color: '#f43f5e',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },

  logoutButton: {
    backgroundColor: '#F43F5E',
    paddingVertical: 15,
    borderRadius: 50,
    bottom: 400,
    alignSelf: 'center',
    width: '80%',
    zIndex: 1000,
    
  },

  logoutButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  iconContainer: {
    backgroundColor: '#FFE0B2',
    borderRadius: 50,
    padding: 10,
    marginBottom: 15,
  },
  exclamationIcon: {
    fontSize: 40,
    color: '#F57C00',
  },
  modalText: {
    fontSize: 18,
    color: '#111',
    marginBottom: 25,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#9E9E9E',
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonPressed: {
    backgroundColor: '#757575',
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#F43F5E',
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
