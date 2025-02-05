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
];

// Table data
const data = [
  { key: "1", sno: 1, name: "John Brown", rollnumber: 1023, mobile: "123-456-7890", parentmobile: "123-456-7899", email: "john.brown@example.com", year: "2nd Year"},
  { key: "2", sno: 2, name: "Jim Green", rollnumber: 1045, mobile: "234-567-8901", parentmobile: "234-567-8909", email: "jim.green@example.com", year: "1st Year"},
  { key: "3", sno: 3, name: "Joe Black", rollnumber: 1010, mobile: "345-678-9012", parentmobile: "345-678-9019", email: "joe.black@example.com", year: "3rd Year"},
  { key: "4", sno: 4, name: "Jim Red", rollnumber: 1032, mobile: "456-789-0123", parentmobile: "456-789-0129", email: "jim.red@example.com", year: "4th Year"},
];

// onChange function for table
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};


const R101 = () => (
  <div className="container">
    <Table columns={columns} dataSource={data} onChange={onChange} />
  </div>
);

export default R101;
