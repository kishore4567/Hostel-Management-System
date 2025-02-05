import React from "react";
import { Table } from "antd";
import "./styles.css"; // Assuming you're using a separate CSS file for styling

// Table Columns (adjust these based on your requirements)
const columns = [
  { title: "Name", dataIndex: "name" },
  { title: "Roll Number", dataIndex: "rollnumber", sorter: (a, b) => a.rollnumber - b.rollnumber },
  { title: "Email", dataIndex: "hostel"},
  { title: "Commants", dataIndex: "commants" },
  { title: "Improvements", dataIndex: "improvements" },
];

// Dummy data
const data = [
    {
      key: "1",
      name: "John Brown",
      rollnumber: 1023,
      hostel: "Dheeran Mens Hostel",
      commants: "N/A",     
      improvements: "None",
    },
  ];

// onChange function for the table
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

// Search component
function Search() {
  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." className="search-input" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-search"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  );
}

// OutPass Component
const Feedback = () => (
  <div className="container">
    <Search />
    <Table columns={columns} dataSource={data} onChange={onChange} />
  </div>
);

export default Feedback ;
