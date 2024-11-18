import { View, Text, StyleSheet } from 'react-native';
import Account from '../model/Account';
import { withObservables } from '@nozbe/watermelondb/react';
import { AntDesign } from '@expo/vector-icons';
import database from '../db';
import { supabase } from '../lib/supabase';

type AccountListItemProps = {
  account: Account;
};

function AccountListItem({ account }: AccountListItemProps) {
  const onDelete = async () => {
    try {
      await database.write(async () => {
        await account.markAsDeleted();
      });
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const onEdit = async () => {
    try {
      await database.write(async () => {
        // First update local database
        await account.update(record => {
          record.isEdited = true;
          // Add any other fields you want to update
        });

        // Then sync with Supabase
        const { error } = await supabase
          .from('accounts')
          .update({ 
            is_edited: true,
            // Add other fields you want to sync
            updated_at: new Date().toISOString()
          })
          .eq('id', account.id);

        if (error) {
          throw new Error(`Supabase update failed: ${error.message}`);
        }
      });
    } catch (error) {
      console.error('Error during editing:', error);
      // Optionally revert local changes if Supabase sync fails
      await database.write(async () => {
        await account.update(record => {
          record.isEdited = false;
        });
      });
    }
  };

  // If you need to show edit status in UI
  const editStatus = account.isEdited ? '(Edited)' : '';

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {account.name} {editStatus}
      </Text>
      <Text style={styles.percentage}>{account.cap}%</Text>
      <Text style={[styles.percentage, { right: 35 }]}>{account.tap}%</Text>
      <AntDesign 
        name="edit" 
        size={18} 
        color="gray" 
        style={styles.editIcon} 
        onPress={onEdit}
      />
      <AntDesign 
        name="delete" 
        size={18} 
        color="gray" 
        onPress={onDelete} 
      />
    </View>
  );
}

// Update the enhance function with proper typing
const enhance = withObservables(['account'], ({ account }: AccountListItemProps) => ({
  account,
}));

export default enhance(AccountListItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 2,
    top: 10,
    flexWrap: 'wrap',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    marginRight: 90,
  },
  percentage: {
    flex: 1,
    right: 70,
  },
  editIcon: {
    marginRight: 15,
  },
});