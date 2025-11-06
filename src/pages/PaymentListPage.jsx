import React, { useEffect, useState, useContext } from 'react';
import { Table, Container } from 'react-bootstrap';
import api from '../services/api';
import FilterBar from '../components/FilterBar';
import HeaderBar from '../components/HeaderBar';
import { AuthContext } from '../contexts/AuthContext';

const PaymentListPage = () => {
  const { state } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get('/payments');
      setPayments(res.data);
      setFiltered(res.data);
    };
    fetch();
  }, []);

  const applyFilters = ({ q, semester, course, sort }) => {
    let arr = [...payments];
    if (q) {
      const qq = q.toLowerCase();
      arr = arr.filter(p => p.semester.toLowerCase().includes(qq) || p.course.toLowerCase().includes(qq));
    }
    if (semester) arr = arr.filter(p => p.semester === semester);
    if (course) arr = arr.filter(p => p.course === course);

    switch (sort) {
      case 'course_asc': arr.sort((a,b) => a.course.localeCompare(b.course)); break;
      case 'course_desc': arr.sort((a,b) => b.course.localeCompare(a.course)); break;
      case 'date_asc': arr.sort((a,b) => new Date(a.date) - new Date(b.date)); break;
      case 'date_desc': arr.sort((a,b) => new Date(b.date) - new Date(a.date)); break;
      case 'amount_asc': arr.sort((a,b) => a.amount - b.amount); break;
      case 'amount_desc': arr.sort((a,b) => b.amount - a.amount); break;
      default: break;
    }

    setFiltered(arr);
  };

  return (
    <>
      <HeaderBar />
      <Container>
        <h4>Payments Dashboard</h4>
        <FilterBar onChange={applyFilters} />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Semester</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.course}</td>
                <td>{p.semester}</td>
                <td>{p.date}</td>
                <td>{p.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default PaymentListPage;
