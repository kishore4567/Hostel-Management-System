import React from "react";
import { Card, Row, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Cards() {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle navigation
  const handleVisit = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Row className="my-row" gutter={16}>
        <Card bordered={true} className="my-card" style={{ width: 240 }}>
          <h2>Dheeran Mens Hostel</h2>
          <Button
            type="primary"
            className="visit-btn"
            onClick={() => handleVisit("/Studentdetails/dheeran-mens-hostel")}
          >
            Visit
          </Button>
        </Card>

        <Card bordered={true} className="my-card" style={{ width: 240 }}>
          <h2>Valluvar Mens Hostel</h2>
          <Button
            type="primary"
            className="visit-btn"
            onClick={() => handleVisit("/Studentdetails/valluvar-mens-hostel")}
          >
            Visit
          </Button>
        </Card>

        <Card bordered={true} className="my-card" style={{ width: 240 }}>
          <h2>Ilango Mens Hostel</h2>
          <Button
            type="primary"
            className="visit-btn"
            onClick={() => handleVisit("/Studentdetails/ilango-mens-hostel")}
          >
            Visit
          </Button>
        </Card>

        <Card bordered={true} className="my-card" style={{ width: 240 }}>
          <h2>Bharathi Mens Hostel</h2>
          <Button
            type="primary"
            className="visit-btn"
            onClick={() => handleVisit("/Studentdetails/bharathi-mens-hostel")}
          >
            Visit
          </Button>
        </Card>

        <Card bordered={true} className="my-card" style={{ width: 240 }}>
          <h2>Kamban Mens Hostel</h2>
          <Button
            type="primary"
            className="visit-btn"
            onClick={() => handleVisit("/Studentdetails/kamban-mens-hostel")}
          >
            Visit
          </Button>
        </Card>

        <Card bordered={true} className="my-card" style={{ width: 240 }}>
          <h2>Ponnar Mens Hostel</h2>
          <Button
            type="primary"
            className="visit-btn"
            onClick={() => handleVisit("/Studentdetails/ponnar-mens-hostel")}
          >
            Visit
          </Button>
        </Card>

        <Card bordered={true} className="my-card" style={{ width: 240 }}>
          <h2>Sankar Mens Hostel</h2>
          <Button
            type="primary"
            className="visit-btn"
            onClick={() => handleVisit("/Studentdetails/sankar-mens-hostel")}
          >
            Visit
          </Button>
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
