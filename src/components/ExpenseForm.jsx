// ExpenseForm.jsx
import React, { useState } from 'react';


function ExpenseForm ({ onAddExpense })  {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

 function handleAddExpense  ()  {
    if (category && amount && date) {
      onAddExpense({ category,amount,date });
      setCategory('');
      setAmount('');
      setDate('');
//       formRef.current.reset();
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input
        type="number" placeholder="Amount" value={amount}
        onChange={(e) => setAmount(e.target.value)} />
      <input type="date" value={date}
        onChange={(e) => setDate(e.target.value)}/>

      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
};

export default ExpenseForm;
