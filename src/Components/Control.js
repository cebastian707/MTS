import React from "react";


const Control = () =>{

    return(
        <div id="MachineControlBlock">
            <div className="BoxTitle">Controls</div>
                <div id="MachineButtonsBlock">
                    <button id="RunButton" onclick="RunButton();" title="Start the machine running">Run</button>
                
                    <span title="If enabled, runs as fast as yourbrowser &amp:xomputer allow">
                        {/*Needs onclick function to check if it's been clicked */}
                        <input type="checkbox" id="SpeedCheckbox"/>Run at Full Speed
                    </span>
           
                        {/*Needs onlcick function to check it to be stoped */}
                        <button id="StopButton" disabled title="Pause the machine when running">Pause</button>
                        
                        {/*Needs on click button for undo button*/}
                        
                        <button id="UndoButton" title="Undo one machine step" style={{float:'right'}} disabled>Undo</button>
                        
                        {/*Need Step Button and go from there */}
                        <br></br>
                        <button id="StepButton"  title="Run the machine for a sing step and then pause">Step</button>
                        <br></br>
                        <button id="ResetButtom" title="Reset the machine and tape to the initial state">Reset</button>
                        
                        <div id="InitialTapeDisplay" title="This initial data will be loaded on the tape when the machinw starts">
                            Initial Input:<input type="text" id="InitialInput" value={'11001'}/>

                        </div>
                        
                        <div style={{fontSize:'small'}}>
                                {/*Needs AdvancedOptions onclick  */}
                                <a href="javascript:"  title="Show advanced machine options">Advanced options</a>
                        </div>

                        <div id="AdvancedOptions" style={{display:'none',marginTop:'0.25em'}}>
                            <div id="InitialStateDisplay" title="This is the state that the machine will start in" style={{marginBottom:'0.5em'}}>
                                {/*Need on change showresetmeg function */}
                                Initial State:<input type="text" id="InitialState" value={0} />

                            </div>
                            
                            <div title="Choose between the different Turing Machine Variants">
                                Machine Variant
                                {/*Need function to check what the user picked*/}
                                <select id="MachineVariant">
                                    <option value={0}>Standard</option>
                                    <option value={1}>Semi-infinite tape</option>
                                    <option value={2}>None-Deterministic</option>
                                </select>

                                <div id="MachineVariantDescription" style={{fontSize:'small',fontStyle:'italic'}}></div>
                                {/*On click function that hides this  */}
                                <span style={{fontSize:'x-small'}}><a href="javascripit">[Close]</a></span>

                            </div>
                        </div>
                        
                        <div id="ResetMessage">Changes will take effect when the machine is reset.</div>
                        <br/>
                        <br/>
                        <div id="LoadBlock">
                            {/*onclick function to display the load menu */}
                            <a href="javascript:">Load an example program</a>
                            <div id="LoadMenu">
                                <ul>
                                    {/*Add <li><a> list to the programs we cann add */}
                                    <li><a href="javascripit:">Palindrome Dectector</a></li>
                                </ul>
                                {/*OnClick function that hides the load program */}
                                <span style={{fontSize:'x-small'}}><a href="javascripit">[Close]</a></span>
                            </div>
                        </div>
                </div>
        </div>
    );
};



export default Control;