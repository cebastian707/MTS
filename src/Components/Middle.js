import React from "react";
import Tape from "./Tape";
import Message from "./Message";
import State from "./State";
import Steps from "./Steps";
import Box from "./Box";
import Control from "./Control";

const Middle = () =>{

    return(
        <div id="Machine">
            <div id="MachineTapeContainer">
                <Tape/>
            </div>
            <div id="MachineMiddleSection">
                <Message/>
                <State/>
                <Steps/>
            </div>
            <div className="cleardiv"></div>
            <div id="MachineLowerSection">
                <div id="MachineLowerSection2">
                        <Box/>
                        <Control/>
                </div>
            </div>
        </div>
    );

};


export default Middle;