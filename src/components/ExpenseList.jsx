// ExpenseList.jsx
import React, { useState } from 'react';


function ExpenseList  ({ expenses, totalExpense })  {
  const [sortBy, setSortBy] = useState('');


  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
    return 0.0;
  });

  return (
    <div>
      <h2>Expenses</h2>
      <p>Total Expense This Month: ${totalExpense}</p>
      
      <label>Sort By: </label>
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="">None</option>
        <option value="amount">Amount</option>
        <option value="category">Category</option>
        <option value="date">Date</option>
      </select>
      
      <ul>
        {sortedExpenses.map((expense, index) => (
          <li key={index}>
            <div>Category: {expense.category}</div>
            <div>Amount: ${expense.amount}</div>
            <div>Date: {new Date(expense.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
