import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'accounts',
            columns: [
                { name: 'is_edited', type: 'boolean' },
                { name: 'name', type: 'string' },
                { name: 'cap', type: 'number' },
                { name: 'tap', type: 'number' },
                { name: 'user_id', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'account_allocations',
            columns: [
                { name: 'cap', type: 'number' },
                { name: 'amount', type: 'number' },
                { name: 'user_id', type: 'string' },
                { name: 'account_id', type: 'string', isIndexed: true },
                { name: 'allocation_id', type: 'string', isIndexed: true },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'allocations',
            columns: [
                { name: 'income', type: 'number' },
                { name: 'user_id', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ]
        }),
    ]
});