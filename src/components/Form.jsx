import React from "react";
import CSVReader from "react-csv-reader";

function Form(props){
    const papaparseOptions = { header: true }

    /* How the program should work: */
    /*
    what shouldn't merge:
        same part #, different serial #, same condition code, same warehouse
        same part #, same serial #, different condition code, same warehouse
        same part #, same serial #, same condition code, different warehouse

    what should merge:
        same part #, same serial #, same condition code
    */

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function readFile(file){
        let final = [];
        let invalidCC= [];
        const validCC = ["SV" , "NE" , "OH" , "FN" , "AR" , "RP" , "NS" , "OR" , "RD" , "EX" , "IN" , "US"];
        const notApplicable = ["NSN", "N/S/N", "N/A", "NV", "N/S/N 1", "N/S/N 2", "N/S/N1", "NOT VISIBLE", "NSN1", "NSN2", "NV", "UMK", "UNK", "Unknown"];
        
        for (let i = 0; i < file.length; i++) {
            /* set variables */
            let isFound = false;
            file[i].QUANTITY = +file[i].QUANTITY; // unary operator used to transform string into number

            /* check if serial number is not applicable */
            if (notApplicable.includes(file[i].SERIAL_NUMBER)){
                file[i].SERIAL_NUMBER = "";
            }

            if (!validCC.includes(file[i].CONDITION_CODE)){
                invalidCC.push(file[i].CONDITION_CODE);
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
        let data = [];
        for (let i = 0; i < final.length; i++) {
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
        console.log(invalidCC.filter(onlyUnique));
        props.onComplete(final);
    }

    function failed(){
        console.log("fail");
    }

    return (
        <div>
            <p>Submit the inventory file</p>
            <CSVReader
                accept=".csv"
                onFileLoaded = {readFile}
                onError = {failed}
                parserOptions = {papaparseOptions}
                inputId = "inventory"
                inputStyle = {{color: 'blue'}}
            />
        </div>
    );
}

export default Form;