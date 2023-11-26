import React from "react";


const State = () =>{

    return (
        <div id="MachineStateContainer" className="MachineStatusContainer" title="This is the Turing machine's current state" aria-live="polite">
            <div className="BoxTitle">Current State</div>
            <div id="MachineState" className="MachineStateBox">0</div>
        </div>
    );
}

export default State;