import React from "react";


const Tape = () => {
    
    return(
        <div>
            {/*This is the tape code*/}
            <div className="BoxTitle">Tape</div>
                <div id="MachineTape" className="MachineStatusBox" title="This is the Turing machine's tape. The head position is indicated by the highlighted cell and arrow.">
                        <div id="RunningTapeDisplay" aria-live="polite"><div id="TapeValues">
                                <pre id="LeftTape" class="tape"></pre>
                        <div id="ActiveTapeArea"><pre id="ActiveTape" class="tape">1</pre><div id="MachineHead"><div class="HeadTop"></div><div class="HeadBody">Head</div></div></div><pre id="RightTape" class="tape">1001</pre></div></div>            
                </div>
        </div>
    );
};

export default Tape;