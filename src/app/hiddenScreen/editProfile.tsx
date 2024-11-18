import { router, useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';





const EditProfileScreen = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [occupation, setOccupation] = useState('');
  const [gender, setGender] = useState('');

  const navigation = useNavigation();


  const handleSaveUserName = async () => {
    
    // router.navigate('/session');

    
    //   const { data, error } = await supabase.auth.updateUser({
    //     data: { 
          
    //           Name: name,
    //           PhoneNumber: phone,
    //           BirthDate: birthdate,
    //           Occuppation: occupation,
    //           Gender: gender,



    //     },
    //   });



// Điều hướng về trang session
router.navigate('/session');
    ////////
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          Name: name,
          PhoneNumber: phone,
          BirthDate: birthdate,
          Occuppation: occupation,
          Gender: gender,
        },
      });
  
      if (error) {
        console.error('Error updating user:', error.message);
      } else {
        console.log('User updated successfully:', data);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  
    
    //////
    


    // try {
    //   const { data, error } = await supabase.auth.updateUser({
    //     data: { 
          
    //           Name: name,
    //           PhoneNumber: phone,
    //           BirthDate: birthdate,
    //           Occuppation: occupation,
    //           Gender: gender,



    //     },
    //   });
    // } catch (err) {
    //   console.error('Unexpected error:', err);
    // }

    
  };



  //nút quay lại
 useLayoutEffect(() => {
  navigation.setOptions({
    headerShown: true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" style={{ marginLeft: -5, marginRight: 20 }} />
      </TouchableOpacity>
    ),

    headerTitle: () => 
      <View style={styles.customHeader}>
        <Text style={styles.welcomeText}>
          Edit Your Profile
        </Text>
      </View>
    
    
  });
}, [navigation]);




  
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleSave = () => {
    // Save action here
    // router.back();
    router.navigate('/session');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <></>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <View style={styles.profileCircle}>
          <Image
            source={{ uri: 'https://example.com/profile.jpg' }}
            style={styles.profilePicture}
          />
        </View>
        <TouchableOpacity style={styles.cameraIconContainer}>
          <Icon name="add" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={user.user_metadata.Name || 'User Name'}
        />
        <Icon name="edit" size={20} color="#333333" style={styles.editIcon} />
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder={user.user_metadata.PhoneNumber || 'Phone Number'}
          keyboardType="phone-pad"
        />
        <Icon name="edit" size={20} color="#333333" style={styles.editIcon} />
      </View>

      {/* Birthdate Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={birthdate}
          onChangeText={setBirthdate}
          placeholder={user.user_metadata.BirthDate || 'Birthday'}
        />
        <Icon name="edit" size={20} color="#333333" style={styles.editIcon} />
      </View>

      {/* Occupation Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={occupation}
          onChangeText={setOccupation}
          placeholder={user.user_metadata.Occuppation || 'Work'}
        />
        <Icon name="edit" size={20} color="#333333" style={styles.editIcon} />
      </View>

      {/* Gender Selection */}
      <View style={styles.genderContainer}>
        <TouchableOpacity onPress={() => handleGenderSelect('Male')} style={styles.genderOption}>
          <View
            style={[
              styles.radioCircle,
              gender === 'Male' && styles.selectedCircle,
              gender === 'Male' && { borderWidth: 0 }, // Loại bỏ border khi chọn
            ]}
          >
            {gender === 'Male' && <Icon name="check" size={14} color="#FFFFFF" />}
          </View>
          <Text style={styles.genderLabel}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGenderSelect('Female')} style={styles.genderOption}>
          <View
            style={[
              styles.radioCircle,
              gender === 'Female' && styles.selectedCircle,
              gender === 'Female' && { borderWidth: 0 }, // Loại bỏ border khi chọn
            ]}
          >
            {gender === 'Female' && <Icon name="check" size={14} color="#FFFFFF" />}
          </View>
          <Text style={styles.genderLabel}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveUserName}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    top: 95,
    right: 115,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f43f5e',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileCircle: {
    width: 85,
    height: 85,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#f43f5e',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    right: 120,
    bottom: 40,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 35,
    backgroundColor: '#f43f5e',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    padding: 4,
    left: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  editIcon: {
    marginLeft: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedCircle: {
    backgroundColor: '#f43f5e',
  },
  genderLabel: {
    fontSize: 16,
    color: '#333333',
  },
  saveButton: {
    backgroundColor: '#f43f5e',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    bottom:-50
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  customHeader: {
    paddingHorizontal: 1,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111827', // Dark text color for welcome message
    right: 15,
    bottom: 3,
  },
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f43f5e',
  },
});





// /////////////////////////
// // import { Stack, router, useNavigation } from 'expo-router';
// // import { useLayoutEffect, useState } from 'react';
// // import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
// // import database, {
// //   accountAllocationCollection,
// //   accountsCollection,
// //   allocationsCollection,
// // } from '../../db';
// // import { withObservables } from '@nozbe/watermelondb/react';
// // import Account from '../../model/Account';
// // import { useAuth } from '../../providers/AuthProvider';
// // import { mySync } from '../../db/sync';


// // function NewAllocationScreen({ accounts }: { accounts: Account[] }) {
// //   const [income, setIncome] = useState('0');

// //   const { user } = useAuth();

// //   const navigation = useNavigation();

// //   // Hide the header for this screen
// //   useLayoutEffect(() => {
// //     navigation.setOptions({
// //       headerShown: true,
// //       headerTitle: () => 
// //         <View style={styles.customHeader}>
// //           <Text style={styles.welcomeText}>
// //             Add Allocations
// //           </Text>
// //         </View>
// //     })
// //   }, [navigation]);

// //   const save = async () => {
// //     await database.write(async () => {
// //       const allocation = await allocationsCollection.create((newAllocation) => {
// //         newAllocation.income = Number.parseFloat(income);
// //         newAllocation.userId = user?.id;
// //       });

// //       await Promise.all(
// //         accounts.map((account) =>
// //           accountAllocationCollection.create((item) => {
// //             item.account.set(account);
// //             item.allocation.set(allocation);
// //             item.cap = account.cap;
// //             item.amount = (allocation.income * account.cap) / 100;
// //             item.userId = user?.id;
// //           })
// //         )
// //       );
// //     });
// //     await mySync();
// //     setIncome('');
// //     router.back();
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Stack.Screen options={{ title: 'New Allocation' }} />

// //       <View style={styles.inputRow}>
// //         <Text style={styles.label}>Income</Text>
// //         <TextInput
// //           value={income}
// //           onChangeText={setIncome}
// //           placeholder="123 VND"  // Updated placeholder
// //           style={styles.input}
// //           keyboardType="numeric"
// //         />
// //       </View>

// //       {/* Wrap the list in a ScrollView to make it scrollable */}
// //       <ScrollView style={styles.scrollContainer}>
// //         {accounts.map((account) => (
// //           <View key={account.id} style={[styles.inputRow, { borderRadius: 50, marginBottom: 8 }]}>
// //             <Text style={styles.accountText}>
// //               {account.name}: {account.cap}%
// //             </Text>
// //             <Text style={styles.amount}>
// //               {(Number.parseFloat(income) * account.cap / 100).toFixed(2)} VNĐ
// //             </Text>
// //           </View>
// //         ))}
// //       </ScrollView>

// //       <TouchableOpacity style={styles.button} onPress={save}>
// //         <Text style={styles.buttonText}>Save</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const enhance = withObservables([], () => ({
// //   accounts: accountsCollection.query(),
// // }));

// // export default enhance(NewAllocationScreen);

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 15,
// //     backgroundColor: '#F9FAFB', // Light background for modern look
// //     flex: 1,
// //     paddingBottom: 120,
// //   },
// //   label: {
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //     color: '#374151', // Dark gray for a modern text color
// //     width: 100,
// //   },

// //   inputRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: 'white',
// //     padding: 15,
// //     borderRadius: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //     elevation: 3, // Shadow for floating effect
// //     marginBottom: 2,
// //     top: 10,
// //   },
  
// //   input: {
// //     flex: 1,
// //     paddingVertical: 10,
// //     paddingHorizontal: 15,
// //     backgroundColor: '#F3F4F6', // Off-white background for input
// //     borderRadius: 8,
// //     borderColor: '#D1D5DB', // Light gray border
// //     borderWidth: 1,
// //   },
// //   accountText: {
// //     flex: 1,
// //     fontSize: 16,
// //     color: '#374151', // Modern dark text color
// //   },
// //   amount: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: '#F43F5E', // Red to match the design accent
// //   },
// //   button: {
// //     backgroundColor: '#F43F5E', // Red button for save action
// //     borderRadius: 50,
// //     paddingVertical: 15,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //     elevation: 3, // Floating button effect
// //     top: 30,
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontWeight: 'bold',
// //     fontSize: 18,
// //   },
// //   customHeader: {
// //     paddingHorizontal: 1,
// //     paddingTop: 20,
// //     paddingBottom: 10,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     bottom: 5,
// //   },
// //   welcomeText: {
// //     fontSize: 25,
// //     fontWeight: '800',
// //     color: '#111827', // Dark text color for welcome message
// //     right: 15,
// //     bottom: 3,
// //   },
// //   scrollContainer: {
// //     flex: 1,
// //     marginTop: 10,
// //   },
// // });


