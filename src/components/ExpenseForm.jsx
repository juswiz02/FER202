import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ userId, fetchExpenses }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !category || amount <= 0) return;

        await axios.post('http://localhost:5000/expenses', {
            userId,
            name,
            amount: Number(amount),
            category,
            date,
        });

        fetchExpenses();
        setName('');
        setAmount('');
        setCategory('');
        setDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <input type="text" className="form-control mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="number" className="form-control mb-2" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <input type="text" className="form-control mb-2" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
            <input type="date" className="form-control mb-2" value={date} onChange={(e) => setDate(e.target.value)} />
            <button type="submit" className="btn btn-primary">Add Expense</button>
        </form>
    );
};

export default ExpenseForm;