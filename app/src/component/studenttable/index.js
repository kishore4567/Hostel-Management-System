import React from "react";
import { Table } from "antd";
import "./styles.css"; // Assuming you're using a separate CSS file for styling

// Table Columns
const columns = [
  { title: "S.NO", dataIndex: "sno" },
  { title: "Name", dataIndex: "name" },
  { title: "Roll number", dataIndex: "rollnumber", sorter: (a, b) => a.rollnumber - b.rollnumber },
  { title: "Mobile", dataIndex: "mobile" },
  { title: "Parent Mobile", dataIndex: "parentmobile" },
  { title: "Email", dataIndex: "email" },
  { title: "Year", dataIndex: "year" },
  { title: "Hostel name", dataIndex: "hostelname" },
  { title: "Room No", dataIndex: "roomno" },
];

// Table data
const data = [
  { key: "1", sno: 1, name: "John Brown", rollnumber: 1023, mobile: "123-456-7890", parentmobile: "123-456-7899", email: "john.brown@example.com", year: "2nd Year", hostelname: "Dheeran Mens Hostel", roomno: 101 },
  { key: "2", sno: 2, name: "Jim Green", rollnumber: 1045, mobile: "234-567-8901", parentmobile: "234-567-8909", email: "jim.green@example.com", year: "1st Year", hostelname: "Valluvar Mens Hostel", roomno: 102 },
  { key: "3", sno: 3, name: "Joe Black", rollnumber: 1010, mobile: "345-678-9012", parentmobile: "345-678-9019", email: "joe.black@example.com", year: "3rd Year", hostelname: "Ilango Mens Hostel", roomno: 103 },
  { key: "4", sno: 4, name: "Jim Red", rollnumber: 1032, mobile: "456-789-0123", parentmobile: "456-789-0129", email: "jim.red@example.com", year: "4th Year", hostelname: "Bharathi Mens Hostel", roomno: 104 },
];

// onChange function for table
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

// Main StudentDetails component with container
const Studentdetails = () => (
  <div className="container">
    <Search />
    <Table columns={columns} dataSource={data} onChange={onChange} />
  </div>
);

export default Studentdetails;
