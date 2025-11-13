import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterCategory } from '../redux/expenseSlice';
import { getUniqueCategories } from '../services/expenseService';

const FilterCard = () => {
  const dispatch = useDispatch();
  const allExpenses = useSelector((state) => state.expenses.items);
  const filterCategory = useSelector((state) => state.expenses.filterCategory);
  
  const categories = getUniqueCategories(allExpenses); 

  const handleFilterChange = (e) => {
    dispatch(setFilterCategory(e.target.value)); 
  };

  return (
    <Card className="mb-4 shadow">
      <Card.Body>
        <Card.Title>Filter</Card.Title>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select value={filterCategory} onChange={handleFilterChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default FilterCard;