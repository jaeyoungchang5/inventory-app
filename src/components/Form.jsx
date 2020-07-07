import React, {useState} from "react";
import CSVReader from "react-csv-reader";
import {CSVLink} from "react-csv";

function Form(){
    const [showResults, setShowResults] = useState(false);
    const papaparseOptions = {
        header: true
    }
     let headers = [
         "PART_NUMBER", "SERIAL_NUMBER", "INVENTORY_DESCRIPTION", "CONDITION_CODE", "QUANTITY", "LIST_PRICE", "WAREHOUSE_NAME", "ADDRESS", "CITY", "STATE", "COUNTRY", "BIN", "LOT", "QUANTITY_RESERVED", "APPLICATION_CODE", "GROUP_CODE"
    ];
    let final = [];

    /* Test */
    /*
    what shouldn't merge:
        same part #, different serial #, same condition code, same warehouse
        same part #, same serial #, different condition code, same warehouse
        same part #, same serial #, same condition code, different warehouse

    what should merge:
        same part #, same serial #, same condition code
    */
    function readFile(file){
        const notApplicable = ["NSN", "N/S/N", "N/A", "NV"];
        for (let i = 0; i < file.length; i++) {
            /* set variables */
            let isFound = false;
            file[i].QUANTITY = +file[i].QUANTITY; // unary operator used to transform string into number

            /* check if serial number is not applicable */
            if (notApplicable.includes(file[i].SERIAL_NUMBER)){
                file[i].SERIAL_NUMBER = "";
            }
            
            /* iterate through file and merge entries */
            for (let e = 0; e < final.length; e++) {
                if (file[i].PART_NUMBER === final[e].PART_NUMBER 
                        && file[i].SERIAL_NUMBER === final[e].SERIAL_NUMBER 
                        && file[i].CONDITION_CODE === final[e].CONDITION_CODE 
                        && file[i].WAREHOUSE_NAME === final[e].WAREHOUSE_NAME) {
                    final[e].QUANTITY += file[i].QUANTITY;
                    isFound = true;
                } 
            }

            /* insert entry into final array */
            if (!isFound) {
                final.push(file[i]);
            }
        }
        setShowResults(true);
        console.log(final);
    }

    // let data = [
    //     {PART_NUMBER: final[0].PART_NUMBER},
    // ]

    function failed(){
        console.log("fail");
    }

    const Results = () => (
        <div id="results">
            <CSVLink
                data={final}
                headers={headers}
                filename={"test" + 1 + ".csv"}
            >
                Download me
            </CSVLink>
        </div>
    )

    return (
        <div>
            <p>Submit the inventory file</p>
            <CSVReader
                accept=".csv"
                onFileLoaded = {readFile}
                onError = {failed}
                parserOptions = {papaparseOptions}
                inputId = "inventory"
                inputStyle = {{color: 'red'}}
            />
            {showResults ? <Results /> : null}
        </div>
    );
}

export default Form;