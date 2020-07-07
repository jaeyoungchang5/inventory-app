import React from "react";
import {CSVLink} from "react-csv";

function Download(props) {
    return (
        <div id = "results" >
            <CSVLink data={props.data} filename={"inventory_"+props.startInd+"-"+props.endInd}>
                Download me: inventory # {props.startInd}-{props.endInd}
            </CSVLink> 
        </div>
    );
}

/* Just in case... */
/*
function exportFile(){
    //console.log("returned " + new Date().getSeconds() + ":" + new Date().getMilliseconds());
    for (let i = 0; i < final.length; i++){
        data[i] = {
            PART_NUMBER: final[i].PART_NUMBER, 
            SERIAL_NUMBER: final[i].SERIAL_NUMBER,
            INVENTORY_DESCRIPTION: final[i].INVENTORY_DESCRIPTION,
            CONDITION_CODE: final[i].CONDITION_CODE,
            QUANTITY: final[i].QUANTITY,
            LIST_PRICE: final[i].LIST_PRICE,
            WAREHOUSE_NAME: final[i].WAREHOUSE_NAME
        }
    }
    console.log(data);

    return data;
}
    data = {
        final.map(item => ({
            PART_NUMBER: item.PART_NUMBER,
            SERIAL_NUMBER: item.SERIAL_NUMBER,
            INVENTORY_DESCRIPTION: item.INVENTORY_DESCRIPTION,
            CONDITION_CODE: item.CONDITION_CODE,
            QUANTITY: item.QUANTITY,
            LIST_PRICE: item.LIST_PRICE,
            WAREHOUSE_NAME: item.WAREHOUSE_NAME
        }))
    }
    headers={headers}
    filename = {
        "test" + 1 + ".csv"
    }
*/

export default Download;