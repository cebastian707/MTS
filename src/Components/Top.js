import React from "react";


const Top = () =>{
    return(
        <div id="Header">
            <h1>Turing Machine Simulator</h1>
                <div id="IntroText">
                            This is a <a href="http://en.wikipedia.org/wiki/Turing_machine">Turing machine</a> simulator.
                            To use it:<br></br>
                    <ol>
                        
                        <li>
                            Run a program copy input program into text box.Then click save program after that hit reset. Then finally click the run button
                        </li>
                        
                        <li>
                            Enter something in the 'Input' area - this will be written on the tape initially as input to the machine. Click 'Reset' to initialise the machine.
                        </li>
                        
                        <li>
                            Click on 'Run' to start the Turing machine and run it until it halts (if ever).
                            Click on 'Stop' to interrupt the Turing machine while it is running.
                        </li>
                        
                        <li>
                            Click 'Reset' to restore the Turing machine to its initial state so it can be run again.
                        </li>
                    </ol>
                </div>
        </div> 
    );

};

export default Top;