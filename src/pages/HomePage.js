import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TotalExpensesCard from '../components/TotalExpensesCard';
import FilterCard from '../components/FilterCard';
import AddEditExpenseForm from '../components/AddEditExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import { getExpenses } from '../redux/expenseSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isEditing = useSelector(state => state.expenses.editingExpense);

  // Load dữ liệu khi user đã có ID
  useEffect(() => {
    if (user && user.id) {
      dispatch(getExpenses(user.id)); 
    }
  }, [dispatch, user]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header /> 

      <Container fluid className="mt-4 flex-grow-1">
        <Row>
          {/* Cột trái */}
          <Col md={4} className="order-md-1 order-2">
            <TotalExpensesCard /> 

            <Card className="mb-4 shadow">
              <Card.Body>
                <Card.Title>{isEditing ? 'Edit Expense' : 'Add Expense'}</Card.Title>
                <AddEditExpenseForm />
              </Card.Body>
            </Card>
          </Col>

          {/* Cột phải */}
          <Col md={8} className="order-md-2 order-1">
            <FilterCard /> 

            <Card className="shadow">
              <Card.Body>
                <Card.Title>Expense Management</Card.Title>
                <ExpenseTable />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default HomePage;