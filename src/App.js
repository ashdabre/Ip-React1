// App.jsx
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList'

function App  () {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  function addExpense  (expense)  {
    setExpenses([...expenses, expense]);
    const newTotalExpense = totalExpense + expense.amount;
    setTotalExpense(newTotalExpense);

    
    if (budget > 0 && newTotalExpense >= budget * 0.8) {
      alert("80% of the budget has been utilized");
    }
  };
  const extractAmountFromText = (text) => {
    const match = text.match(/(\d+(\.\d{2})?)/); 
    return match ? parseFloat(match[0]) : 0;
  };

  const handleReceiptUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      Tesseract.recognize(file, 'eng', { logger: m => console.log(m) })
        .then(({ data: { text } }) => {
          const amount = extractAmountFromText(text);
          setTotalExpense(totalExpense + amount); 
          setExpenses([...expenses, { category: "Receipt", amount, date: new Date().toLocaleDateString() }]);
          alert(`Extracted amount: $${amount}`);
        });
    }
  };



  const handleSetBudget = (e) => {
    setBudget(parseFloat(e.target.value) || 0);
  };
  const remainingBudget = Math.max(0, budget - totalExpense);
  return (
    <div>
      <h1>Expense Tracker</h1>

      <div>
        <label>Set Monthly Budget:</label> 
        <input type="number" onChange={handleSetBudget}
          placeholder="Enter monthly budget" />
       
      <p>Remaining Budget: ${remainingBudget}</p>

      </div>

      
      <ExpenseForm onAddExpense={addExpense} />

      
      <ExpenseList expenses={expenses} totalExpense={totalExpense} />
      
      <div className="receipt-upload">
        <label>Upload Receipt:</label>
        <input type="file" onChange={handleReceiptUpload} />
      </div>
    </div>
  );
};

export default App;

