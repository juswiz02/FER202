import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createExpense, modifyExpense, setEditingExpense } from '../redux/expenseSlice';
import { getUniqueCategories } from '../services/expenseService';

const initialState = {
  name: '',
  amount: '',
  category: '',
  // Dùng toLocaleDateString('en-CA') để đảm bảo format YYYY-MM-DD cho input type="date"
  date: new Date().toLocaleDateString('en-CA'), 
};

const AddEditExpenseForm = () => {
  const dispatch = useDispatch();
  const editingExpense = useSelector(state => state.expenses.editingExpense);
  const allExpenses = useSelector((state) => state.expenses.items);
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  
  const uniqueCategories = getUniqueCategories(allExpenses).filter(c => c && c !== 'All categories');
  
  const isEditing = !!editingExpense;

  // Cập nhật form khi chọn Edit
  useEffect(() => {
    if (editingExpense) {
      // Dữ liệu db.json và input date đều dùng YYYY-MM-DD, không cần chuyển đổi phức tạp
      setFormData({
        name: editingExpense.name,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date, // YYYYY-MM-DD
      });
    } else {
      setFormData(initialState);
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    setError('');
    const { name, amount, category } = formData;
    
    // Validation rules: Name and Category must not be empty (0.25 mark)
    if (!name.trim() || !category.trim()) {
      setError('Name and Category are required.');
      return false;
    }

    // Validation rules: Amount must be a valid number greater than 0 (0.25 mark)
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Amount must be a valid number greater than 0.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // FIXED: Submission sử dụng định dạng YYYY-MM-DD (format của HTML date input)
    const expensePayload = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: formData.date, // Lưu trữ YYYY-MM-DD vào db.json
      userId: user.id,
    };

    if (isEditing) {
      dispatch(modifyExpense({ id: editingExpense.id, updatedExpense: expensePayload }));
    } else {
      dispatch(createExpense(expensePayload)); 
      handleReset(); 
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    setError('');
    dispatch(setEditingExpense(null));
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      {/* Name */}
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
      </Form.Group>

      <Row className="mb-3">
        {/* Amount */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0" />
          </Form.Group>
        </Col>
        
        {/* Category */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select name="category" value={formData.category} onChange={handleChange}>
              <option value="" disabled>Select category</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              {/* Thêm option để chọn giá trị hiện tại nếu nó không có trong danh sách unique */}
              {!uniqueCategories.includes(formData.category) && formData.category && !isEditing && (
                 <option value={formData.category}>{formData.category} (New)</option>
              )}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      {/* Date */}
      <Form.Group className="mb-4">
        <Form.Label>Date</Form.Label>
        <Form.Control 
          type="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
        />
      </Form.Group>

      {/* Buttons */}
      <div className="d-flex justify-content-end">
        {isEditing && (
            <Button variant="secondary" onClick={handleReset} className="me-2">
                Cancel Edit
            </Button>
        )}
        <Button variant="primary" type="submit">
          {isEditing ? 'Save Changes' : 'Add expense'}
        </Button>
      </div>
    </Form>
  );
};

export default AddEditExpenseForm;