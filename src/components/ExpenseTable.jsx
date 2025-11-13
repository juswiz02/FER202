import React, { useState } from 'react';
import { Table, Button, Modal, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeExpense, setEditingExpense } from '../redux/expenseSlice';
import { formatVND, formatDateDisplay } from '../services/expenseService';

const ExpenseTable = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.items);
  const filterCategory = useSelector((state) => state.expenses.filterCategory);
  const status = useSelector((state) => state.expenses.status);
  
  const [showModal, setShowModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  // Lọc chi tiêu
  const filteredExpenses = expenses.filter(expense => 
    filterCategory === 'All categories' || expense.category === filterCategory
  );

  // Xử lý Delete
  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (expenseToDelete) {
      dispatch(removeExpense(expenseToDelete.id));
      setShowModal(false);
      setExpenseToDelete(null);
    }
  };

  // Xử lý Edit
  const handleEditClick = (expense) => {
    dispatch(setEditingExpense(expense));
    // Tùy chọn: Cuộn lên đầu trang để hiển thị form edit
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  if (status === 'loading') return <p>Loading expenses...</p>;
  if (status === 'failed') return <Alert variant="danger">Error loading expenses.</Alert>;

  return (
    <>
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
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
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{formatVND(expense.amount)}</td>
                  <td>{expense.category}</td>
                  <td>{formatDateDisplay(expense.date)}</td>
                  <td style={{ minWidth: '150px' }}>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(expense)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(expense)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
                <tr><td colSpan="5" className="text-center">No expenses found.</td></tr>
            )}
          </tbody>
        </Table>
      </div>
      
      {/* Modal Confirm Delete */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete **{expenseToDelete?.name}**?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExpenseTable;