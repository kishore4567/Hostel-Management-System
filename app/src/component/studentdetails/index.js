
import React from "react";
import "./styles.css"; // Assuming you create a separate CSS file for the navbar styles

import Search from "../studenttable";
import Cards from "../cards";

function Studentdetails() {
    return (
        <>
        <Search />
        <Cards />
        </>
    );
}

export default Studentdetails;
