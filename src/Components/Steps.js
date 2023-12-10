import React from "react";



const Steps = ({steps}) =>{

    return(
        <div id="MachineStepsContainer" className="MachineStatusContainer" title="This is the number of steps executed by the Machine Since Starting" aria-live="polite">
            <div className="BoxTitle">Steps</div>
            <div id="MachineSteps" className="MachineStateBox">{steps}</div>
        </div>
    );

};


export default Steps;