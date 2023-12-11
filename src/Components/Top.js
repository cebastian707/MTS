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
                            First write a program following the syntax at the bottom into turing machine program area. Then click load program.
                        </li>
                        
                        <li>
                            Next enter something in the Tape 'Input' area - this will be written on the tape initially as input to the machine. Click 'Reset' to initialise the machine.
                        </li>
                        
                        <li>
                            Finally click on the 'Run' button to start the Turing machine, it will run until it halts (if ever) or if you click on 'Stop' to pause the Turing machine while it is running. Click 'Run Full Speed' if you'd like to run the Turing machine at full speed.
                            
                        </li>
                        
                        <li>
                            Remember to click the 'Reset' button to restore the Turing machine to its initial state so it can be run again.
                        </li>
                    </ol>
                </div>
        </div> 
    );

};

export default Top;