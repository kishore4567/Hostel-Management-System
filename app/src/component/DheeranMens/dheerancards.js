import React from "react";
import { Card, Row } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Dheerancards() {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle navigation
  const handleVisit = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Row className="my-row" gutter={16}>
        <Card
          bordered={true}
          className="my-card"
          style={{ width: 240, cursor: "pointer" }}
          onClick={() => handleVisit("/Studentdetails/dheeran-mens-hostel/101")}
        >
          <h2>101</h2>
        </Card>

        <Card
          bordered={true}
          className="my-card"
          style={{ width: 240, cursor: "pointer" }}
          onClick={() => handleVisit("/Studentdetails/dheeran-mens-hostel/102")}
        >
          <h2>102</h2>
        </Card>

        <Card
          bordered={true}
          className="my-card"
          style={{ width: 240, cursor: "pointer" }}
          onClick={() => handleVisit("/Studentdetails/dheeran-mens-hostel/103")}
        >
          <h2>103</h2>
        </Card>

        <Card
          bordered={true}
          className="my-card"
          style={{ width: 240, cursor: "pointer" }}
          onClick={() => handleVisit("/Studentdetails/dheeran-mens-hostel/104")}
        >
          <h2>104</h2>
        </Card>

        <Card
          bordered={true}
          className="my-card"
          style={{ width: 240, cursor: "pointer" }}
          onClick={() => handleVisit("/Studentdetails/dheeran-mens-hostel/105")}
        >
          <h2>105</h2>
        </Card>

        <Card
          bordered={true}
          className="my-card"
          style={{ width: 240, cursor: "pointer" }}
          onClick={() => handleVisit("/Studentdetails/dheeran-mens-hostel/106")}
        >
          <h2>106</h2>
        </Card>

        <Card
          bordered={true}
          className="my-card"
          style={{ width: 240, cursor: "pointer" }}
          onClick={() => handleVisit("/Studentdetails/dheeran-mens-hostel/107")}
        >
          <h2>107</h2>
        </Card>
      </Row>
    </div>
  );
}

export default Dheerancards;
