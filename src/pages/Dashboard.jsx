import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [filters, setFilters] = useState({
    search: "",
    semester: "",
    course: "",
    sort: "",
  });

  const [payments, setPayments] = useState([]);

  // 🟢 Lấy dữ liệu ban đầu từ API
  useEffect(() => {
    fetch("http://localhost:3001/payments")
      .then((res) => res.json())
      .then((data) => setPayments(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 🧠 Dùng useMemo để lọc và sắp xếp khi filters thay đổi
  const filteredPayments = useMemo(() => {
    let data = [...payments];

    // 1️⃣ Tìm kiếm theo tên khoá học hoặc học kỳ
    if (filters.search) {
      const keyword = filters.search.toLowerCase();
      data = data.filter(
        (item) =>
          item.courseName.toLowerCase().includes(keyword) ||
          item.semester.toLowerCase().includes(keyword)
      );
    }

    // 2️⃣ Lọc theo học kỳ
    if (filters.semester) {
      data = data.filter((item) => item.semester === filters.semester);
    }

    // 3️⃣ Lọc theo tên khoá học
    if (filters.course) {
      data = data.filter((item) => item.courseName === filters.course);
    }

    // 4️⃣ Sắp xếp
    if (filters.sort) {
      switch (filters.sort) {
        case "name-asc":
          data.sort((a, b) => a.courseName.localeCompare(b.courseName));
          break;
        case "name-desc":
          data.sort((a, b) => b.courseName.localeCompare(a.courseName));
          break;
        case "date-asc":
          data.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "date-desc":
          data.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "amount-asc":
          data.sort((a, b) => a.amount - b.amount);
          break;
        case "amount-desc":
          data.sort((a, b) => b.amount - a.amount);
          break;
        default:
          break;
      }
    }

    return data;
  }, [payments, filters]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header fullName={user?.fullName || "User"} />

      <main className="p-6 space-y-4">
        {/* Filter & Sort */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Danh sách payments */}
        <div className="grid gap-3 mt-4">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg text-gray-800">
                  {p.courseName}
                </h3>
                <p className="text-sm text-gray-600">{p.semester}</p>
                <p className="text-sm text-gray-500">Date: {p.date}</p>
                <p className="mt-2 font-medium text-blue-600">
                  ${p.amount.toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic text-center mt-10">
              No records found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
