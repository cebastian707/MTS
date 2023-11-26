import React from "react";
import Top from "./Top";
import Middle from "./Middle";
import Bottom from "./Bottom";

const HomePage = () => {

    return(
        <div>
            <div>
                <Top/>
            </div>
            
            <div>
                <Middle/>
            </div>

            <div>
                <Bottom/>
            </div>
        </div>
    );

};


export default HomePage;