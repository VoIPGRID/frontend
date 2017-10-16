```jsx
const columns = [
  {
    accessor: 'description',
    Header: 'Description'
  },
  {
    accessor: 'account_id',
    Header: 'Account ID'
  }
];

data = [{
    'description': 'First description',
    'account_id': 1
},{
    'description': 'Second description',
    'account_id': 2
}];

<Table columns={columns} data={data} />
```
