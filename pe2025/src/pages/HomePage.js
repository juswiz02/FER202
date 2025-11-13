import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [expenses, setExpenses] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [newExpense, setNewExpense] = useState({
        id: null,
        name: '',
        amount: '',
        category: '',
        date: ''
    });
    const [filter, setFilter] = useState('All categories');
    const [editingId, setEditingId] = useState(null);

    // Fetch expenses from JSON server
    useEffect(() => {
        const fetchExpenses = async () => {
            const response = await axios.get('http://localhost:5000/expenses');
            setExpenses(response.data);
            setTotalExpenses(response.data.reduce((acc, expense) => acc + expense.amount, 0));
        };
        fetchExpenses();
    }, []);

    const handleAddOrEditExpense = async (e) => {
        e.preventDefault();
        if (!newExpense.name || !newExpense.category || newExpense.amount <= 0) return;

        const requestData = {
            ...newExpense,
            amount: Number(newExpense.amount),
        };

        if (editingId) {
            // Update existing expense
            await axios.put(`http://localhost:5000/expenses/${editingId}`, requestData);
        } else {
            // Add new expense
            await axios.post('http://localhost:5000/expenses', {
                ...requestData,
                id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
            });
        }

        setNewExpense({ id: null, name: '', amount: '', category: '', date: '' }); // Reset form
        setEditingId(null);
        fetchExpenses(); // Refresh expense list
    };

    const handleEditExpense = (expense) => {
        setNewExpense(expense);
        setEditingId(expense.id);
    };

    const handleDeleteExpense = async (id) => {
        await axios.delete(`http://localhost:5000/expenses/${id}`);
        fetchExpenses(); // Refresh the list after deletion
    };

    // Filter expenses
    const filteredExpenses = filter === 'All categories' ? expenses : expenses.filter(exp => exp.category === filter);

    return (
        <div className="container mt-5">
            <h1>PersonalBudget</h1>
            <h2>Total Expenses: {totalExpenses.toLocaleString()} ₫</h2>
            <div className="mb-3">
                <label>Filter</label>
                <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option>All categories</option>
                    {Array.from(new Set(expenses.map(exp => exp.category))).map(category => (
                        <option key={category}>{category}</option>
                    ))}
                </select>
            </div>
            
            <form onSubmit={handleAddOrEditExpense}>
                <div className="row mb-3">
                    <div className="col">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={newExpense.name} 
                            onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })} 
                            placeholder="Name"
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="number" 
                            className="form-control" 
                            value={newExpense.amount} 
                            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} 
                            placeholder="Amount"
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={newExpense.category} 
                            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} 
                            placeholder="Category"
                        />
                    </div>
                    <div className="col">
                        <input 
                            type="date" 
                            className="form-control" 
                            value={newExpense.date} 
                            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} 
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Add'} Expense</button>
                {editingId && <button type="button" className="btn btn-danger ms-2" onClick={() => { setNewExpense({ id: null, name: '', amount: '', category: '', date: '' }); setEditingId(null); }}>Cancel</button>}
            </form>

            <h3 className="mt-4">Expense Management</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpenses.map(expense => (
                        <tr key={expense.id}>
                            <td>{expense.name}</td>
                            <td>{expense.amount.toLocaleString()} ₫</td>
                            <td>{expense.category}</td>
                            <td>{new Date(expense.date).toLocaleDateString("en-CA")}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEditExpense(expense)}>Edit</button>
                                <button className="btn btn-danger ms-2" onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomePage;