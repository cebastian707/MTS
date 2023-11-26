import React from "react";



const Steps = () =>{

    return(
        <div id="MachineStepsContainer" className="MachineStatusContainer" title="This is the number of steps executed by the Machine Since Starting" aria-live="polite">
            <div class="BoxTitle">Steps</div>
            <div id="MachineSteps" class="MachineStateBox">0</div>
        </div>
    );

};


export default Steps;