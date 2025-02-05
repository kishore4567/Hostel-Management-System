import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/header";
import Studentdetails from "./component/studentdetails";
import Outpass from "./component/outpass";
import Washingmachine from "./component/washingmachine";
import Feedback from "./component/feedback";
import DheeranMens from "./component/DheeranMens";
import Valluvarmens from "./component/ValluvarMens";
import R101 from "./component/DheeranMens/101";

function App() {
    return (
        <div
        style={{
            background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://media.collegedekho.com/media/img/institute/crawled_images/None/DFGJSDGJDTRDGJD.jpg?width=1080') center/cover no-repeat",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
        }}
        
        
        >
            <Router>
                <Header />
                    <Routes>
                        <Route path="/" element={<Studentdetails />} />
                        <Route path="/outpass" element={<Outpass />} />
                        <Route path="/washingmachine" element={<Washingmachine />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/Studentdetails/dheeran-mens-hostel" element={<DheeranMens />} />
                        <Route path="/Studentdetails/valluvar-mens-hostel" element={<Valluvarmens />} />
                        <Route path="/Studentdetails/ilango-mens-hostel" element={<div>Ilango Mens Hostel Page</div>} />
                        <Route path="/Studentdetails/bharathi-mens-hostel" element={<div>Bharathi Mens Hostel Page</div>} />
                        <Route path="/Studentdetails/kamban-mens-hostel" element={<div>Kamban Mens Hostel Page</div>} />
                        <Route path="/Studentdetails/ponnar-mens-hostel" element={<div>Ponnar Mens Hostel Page</div>} />
                        <Route path="/Studentdetails/sankar-mens-hostel" element={<div>Sankar Mens Hostel Page</div>} />
                        <Route path="/Studentdetails/dheeran-mens-hostel/101" element={<R101 />} />
                    </Routes>
            </Router>
        </div>
    );
}

export default App;
