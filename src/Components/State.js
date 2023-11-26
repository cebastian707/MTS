import React from "react";


const State = () =>{

    return (
        <div id="MachineStateContainer" class="MachineStatusContainer" title="This is the Turing machine's current state" aria-live="polite">
            <div class="BoxTitle">Current State</div>
            <div id="MachineState" class="MachineStateBox">0</div>
        </div>
    );
}

export default State;