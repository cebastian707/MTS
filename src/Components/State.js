import React from "react";


const State = ({state}) =>{

    return (
        <div id="MachineStateContainer" className="MachineStatusContainer" title="This is the Turing machine's current state" aria-live="polite">
            <div className="BoxTitle">Current State</div>
            <div id="MachineState" className="MachineStateBox">{state}</div>
        </div>
    );
}

export default State;