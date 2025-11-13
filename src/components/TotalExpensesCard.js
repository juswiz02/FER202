import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { formatVND } from '../services/expenseService';

const TotalExpensesCard = () => {
  const expenses = useSelector((state) => state.expenses.items);

  // Tính tổng chi tiêu
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0); 

  return (
    <Card className="mb-4 bg-info bg-opacity-10 border-info">
      <Card.Body>
        <Card.Title className="text-info">Total of Expenses</Card.Title>
        <h4 className="text-primary fw-bold">{formatVND(total)}</h4>
      </Card.Body>
    </Card>
  );
};

export default TotalExpensesCard;