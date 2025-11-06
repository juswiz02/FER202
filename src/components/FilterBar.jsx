import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <Row className="gy-2">
        <Col md={4}>
          <Form.Control
            placeholder="Search by semester or course name"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={filters.semester}
            onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
          >
            <option value="">All Semesters</option>
            <option>Fall 2024</option>
            <option>Spring 2025</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={filters.course}
            onChange={(e) => setFilters({ ...filters, course: e.target.value })}
          >
            <option value="">All Courses</option>
            <option>Math</option>
            <option>Science</option>
            <option>English</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="">Sort by</option>
            <option value="name-asc">Course A→Z</option>
            <option value="name-desc">Course Z→A</option>
            <option value="date-asc">Date ↑</option>
            <option value="date-desc">Date ↓</option>
            <option value="amount-asc">Amount ↑</option>
            <option value="amount-desc">Amount ↓</option>
          </Form.Select>
        </Col>
      </Row>
    </div>
  );
}
