import React from "react";
import {CSVLink} from "react-csv";

function Download(props) {
    return (
        <div id = "results" >
            <CSVLink data={props.data} filename={"inventory_"+props.number}>
                Download inventory # {props.number}
            </CSVLink> 
        </div>
    );
}

export default Download;