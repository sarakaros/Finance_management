import { View, Text, StyleSheet } from 'react-native';
import Allocation from '../model/Allocation';
import { withObservables } from '@nozbe/watermelondb/react';
import AccountAllocation from '../model/AccountAllocation';
import AccountAllocationItem from './AccountAllocationItem';
import { Ionicons } from '@expo/vector-icons';


type AllocationListItem = {
  allocation: Allocation;
  accountAllocations: AccountAllocation[];
};

const AllocationListItem = ({
  allocation,
  accountAllocations,
}: AllocationListItem) => {
  // Tính tổng giá trị của tất cả các AccountAllocationItems
  const totalAmount = accountAllocations.reduce((sum, item) => sum + item.amount, 0);

  // Tính giá trị còn lại sau khi trừ totalAmount khỏi income
  const remaining = allocation.income - totalAmount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>
          {allocation.createdAt.toLocaleDateString()}
        </Text>
        <Text style={styles.income}>{allocation.income} VNĐ</Text>
      </View>

      <View style={{ gap: 10, padding: 10, shadowOpacity: 0.9 }}>
        {accountAllocations.map((item) => (
          <AccountAllocationItem key={item.id} accountAllocation={item} />
        ))}
      </View>

      {/* Hiển thị tổng giá trị */}
      <View style={styles.footer}>
        <View style={styles.remainingContainer}>
          <Ionicons name="cash-outline" size={20} color="#E11D48" />
          <Text style={styles.remainingText}>Remaining Balance: {remaining.toFixed(2)} VNĐ</Text>
        </View>
      </View>
    </View>
  );
};

const enhance = withObservables(
  ['allocation'],
  ({ allocation }: { allocation: Allocation }) => ({
    allocation,
    accountAllocations: allocation.accountAllocations,
  })
);

export default enhance(AllocationListItem);

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fad7da',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F43F5E',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  income: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  date: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  remainingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    padding: 8,
    borderRadius: 10,
    marginTop: 5,
  },

  remainingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E11D48', // Màu đỏ cho sự nhất quán
    marginLeft: 5,
  },
});