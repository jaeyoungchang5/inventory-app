import React, {useState} from "react";
// import Header from "./Header";
import Form from "./Form";
import Download from "./Download";
// import Footer from "./Footer";

function App(){
    const [data, setData] = useState([]);
    

    function addItems(items){
        setData( () => {
            let interval = 960;
            let result = [];
            let l = items.length;
            console.log(l);
            for (let i = 0; i < l; i+=interval){
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
            {data.map((item, index) => {
                return (
                    <Download key={index} data={item} number={index} />
                )
            })}
            {/* <Footer /> */}
        </div>
    );
}

export default App;