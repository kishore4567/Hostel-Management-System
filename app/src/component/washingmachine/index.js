import React, { useState } from "react";
import { Table } from "antd";
import "./styles.css"; // Assuming you're using a separate CSS file for styling

// Table Columns (adjust these based on your requirements)
const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Roll Number", dataIndex: "rollnumber"},
    { title: "Hostel", dataIndex: "hostel"},
    { title: "Room number", dataIndex: "roomnumber" },
    { title: "Mobile Number", dataIndex: "mobilenumber" },
    {
        title: "Preferred Time slot",
        dataIndex: "time",
        sorter: (a, b) => {
          // Extract the start time (before the " - ")
          const aStartTime = a.time.split(" - ")[0];
          const bStartTime = b.time.split(" - ")[0];
      
          // Convert the start times to a 24-hour format time (HH:MM AM/PM)
          const aTime = new Date("1970-01-01T" + aStartTime);
          const bTime = new Date("1970-01-01T" + bStartTime);
      
          return aTime - bTime;
        }
      }
      
  ];
  
// Dummy data
const data = [
  {
    key: "1",
    name: "John Brown",
    rollnumber: 1023,
    hostel: "Dheeran Mens Hostel",
    roomnumber: 101,
    mobilenumber: "123-456-7890",
    time: "10:00 AM - 12:00 PM",
  },
  {
    key: "2",
    name: "Jim Green",
    rollnumber: 1045,
    hostel: "Valluvar Mens Hostel",
    roomnumber: 102,
    mobilenumber: "234-567-8901",
    time: "2:00 PM - 4:00 PM",
  },
  {
    key: "3",
    name: "Joe Black",
    rollnumber: 1010,
    hostel: "Ilango Mens Hostel",
    roomnumber: 103,
    mobilenumber: "345-678-9012",
    time: "12:00 PM - 2:00 PM",
  },
  {
    key: "4",
    name: "Jim Red",
    rollnumber: 1032,
    hostel: "Bharathi Mens Hostel",
    roomnumber: 104,
    mobilenumber: "456-789-0123",
    time: "4:00 PM - 6:00 PM",
  },
];

// Search functionality
const Washingmachine = () => {
  const [searchText, setSearchText] = useState("");
  
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  
  const filteredData = data.filter((record) => {
    return (
      record.name.toLowerCase().includes(searchText.toLowerCase()) ||
      record.hostel.toLowerCase().includes(searchText.toLowerCase()) ||
      record.mobilenumber.includes(searchText)
    );
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchText}
          onChange={handleSearch}
        />
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
      <Table columns={columns} dataSource={filteredData} onChange={onChange} />
    </div>
  );
};

export default Washingmachine;
