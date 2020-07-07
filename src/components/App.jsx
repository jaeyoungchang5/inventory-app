import React, {useState} from "react";
// import Header from "./Header";
import Form from "./Form";
import Download from "./Download";
// import Footer from "./Footer";

function App(){
    const [data, setData] = useState([]);
    

    function addItems(items){
        setData( () => {
            let interval = 90;
            let result = [];
            console.log(items.length);
            for (let i = 0; i < items.length; i+=interval){
                console.log(i);
                result.push(items.splice(0, interval));
            }
            console.log(result);
            return result;
        });
        console.log("on the app-level... successfully set the data");
    }

    return (
        <div>
            {/* <Header /> */}
            <Form onComplete={addItems} />
            {data.map((item) => {
                return (
                    <Download data={item} startInd={1} endInd={4} />
                )
            })}
            {/* <Footer /> */}
        </div>
    );
}

export default App;