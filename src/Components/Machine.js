import React, { useState, useEffect } from 'react';
import Message from "./Message";
import State from "./State";
import Steps from "./Steps";


const Machine = () => {
  
    const [headIdx, setHeadIdx] = useState(0)
    const [runStatus, setRunStatus] = useState(true);
    const [numSteps, setNumSteps] = useState(0);

    const [tape, setTape] = useState("");
    const [runButton, setRunButton] = useState(false);
    const [program, setProgram] = useState("; Load a program from the menu or write your own!")

    const [message, setMessage] = useState("Load or write a Turing Machine Program and click Run!");

    const [currentState, setCurrentState] = useState('0');
    const [rules, setRules] = useState([]);

    const [inputTape, setInputTape] = useState("");

    const [fullspeed,runFullspeed] = useState([100]);
    const [fullSpeedMessage,setSpeedMessage] = useState("Run Full Speed")

    const handleFullspeed =()=>{
        setSpeedMessage("Running at Full Speed");
        runFullspeed(1);
    };

    const handleRunClick = () => {
        setRunButton(true);
    };

    const loadProgram = () => {
        const parsedRules = parseProgram(program);
        setRules(parsedRules);
        // console.log(parsedRules)
        setMessage("Program Loaded")
    }

    const handleStopClick = () => {
        setRunButton(false);
    };


    const handleResetClick = () => {
        setRunButton(false);
        setHeadIdx(0);
        setCurrentState("0");
        setNumSteps(0);
        setTape(inputTape);
        setMessage("Load or write a Turing Machine Program and click Run!");
        runFullspeed(100);
        setSpeedMessage("Run at full speed");
    }

    const parseTape = (string) => {
        if (!string) {
            string = "_";
        }
        return string.split("");
    };

    const handleTapeChange = (event) => {
        setTape(event.target.value);
        setInputTape(event.target.value);
    };


    // this should prob only grab the value from text area when we hit the run button, not everytime something is typed into the textarea. but it works
    const handleProgramChange = (event) => {
        setProgram(event.target.value);
        // console.log(event.target.value);
    };

    const parseProgram = (program) => {
        let rules = []
        const lines = program.split('\n');
        for (let line of lines) {
            if (line.startsWith(';')) {
                continue;
            }
            if (line === '' || line === ' '){
                continue
            }

            let curRule = line.trim().split(" ");
            if (curRule.length < 5) {
                setMessage("Error: All of your directives must have 5 rules in them");
                // console.log(curRule)
                return []
            }
            rules.push(
                {
                    'currentState' : curRule[0],
                    'readSymbol' : curRule[1],
                    'writeSymbol' : curRule[2],
                    'moveDirection' : curRule[3],
                    'nextState' : curRule[4],
                }
            )        
        }
        return rules
    };



    useEffect(() => {
        if (!runButton) {
            return; // Do nothing if the machine is not running
        }

        // TODO: make sure tape is parsed properly when input is empty,

        const step = () => {
            
            setMessage("Running Turing Machine (;");
            let tmInput = parseTape(tape);

            // 
            if (currentState.includes('halt')){
                if (currentState.includes('accept')){
                    setMessage('Machine halted: Accepted.');
                    setRunButton(false); // Halt the machine
                    return;

                }
                else if (currentState.includes('reject')){
                    setMessage('Machine halted: Rejected.');
                    setRunButton(false); // Halt the machine
                    return;
                    
                }
                setMessage("Machine halted.");
                return;
            }


            setNumSteps(numSteps+1);


            // if read symbol is blank space make it a _ for the rule check
            const currentChar = (tmInput[headIdx] === ' ' || tmInput[headIdx] === '') ? '_' : (tmInput[headIdx] || '_');


            let matchedRule = null;
            let wildcardMatch = null; 
            for (let rule of rules) {
                // check for an exact match
                if (rule.currentState === currentState && rule.readSymbol === currentChar) {
                    matchedRule = rule;
                    break; 
                }
                // if no exact match, check for a wildcard match
                else if ((rule.currentState === '*' || rule.currentState === currentState) && 
                         (rule.readSymbol === '*' && wildcardMatch === null)) {
                    wildcardMatch = rule; 
                }
            }
            
            // use the wildcard match if no exact match is found
            matchedRule = matchedRule || wildcardMatch;


            // console.log('Current State',currentState, currentChar);
            // console.log('Rule MATCHED',matchedRule);



            if (matchedRule) {

                if (matchedRule.writeSymbol === "_"){
                    tmInput[headIdx] = " ";
                }
                else {
                    if (matchedRule.writeSymbol === '*'){
                        ; // do nothing on write symbol wildcard
                    }
                    else{
                        tmInput[headIdx] = matchedRule.writeSymbol;
                    }
                }

                
                let newHeadIdx = headIdx;
                if (matchedRule.moveDirection === 'r') newHeadIdx += 1;
                else if (matchedRule.moveDirection === 'l') newHeadIdx -= 1;



                if (newHeadIdx < 0){
                    // prepend
                    tmInput.unshift(" ");
                    newHeadIdx = 0;
                }
                else if (newHeadIdx > tmInput.length){
                    // append
                    tmInput.push(" ");
                }
            

                const newState = matchedRule.nextState === '*' ? currentState : matchedRule.nextState;

                setTape(tmInput.join(''));
                setHeadIdx(newHeadIdx);
                setCurrentState(newState);
            } else {
                setRunButton(false); // Halt the machine
                setMessage('Machine halted: No matching rule found for current state and character. Input not in language');
                return;
            }
        };

        const timer = setTimeout(step,fullspeed); // step based on speed
        return () => clearTimeout(timer); // clear timeout

    }, [runButton, currentState, tape, headIdx, rules]);

    return (
        <div>
            {/* TAPE SECTION */}
            <div className="BoxTitle">Tape</div>
            <div id="MachineTape" className="MachineStatusBox">
                <div id="RunningTapeDisplay" aria-live="polite">
                    <input 
                        type="text" 
                        value={inputTape} 
                        onChange={handleTapeChange}
                        placeholder="Enter tape string"
                    />
                    <div id="TapeValues">
                        {tape.split("").map((char, idx) => (
                            <span 
                                key={idx}
                                className={idx === headIdx ? "highlighted" : ""}
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* CURRENT STATE & STEPS */}
            <div id="MachineMiddleSection">
                <Message message={message}/> 
                <State state={currentState}/>
                <Steps steps={numSteps}/>
            </div>


            <div className="cleardiv"></div>
            <div id="MachineLowerSection">
                <div id="MachineLowerSection2">
                    {/* PROGRAM INPUT AREA */}
                    <div id="MachineProgramContainer">
                        <div className="BoxTitle">Turing machine program</div>
                        <div id="MachineProgramBlock">
                            <div id="MachineProgramBlock2">
                                <div id="SourceContainer">
                                    <div id="SourceBackground">
                                    </div>
                                    <div id="tabackground">

                                            <textarea id="Source" wrap="off" title="This is the Turing machine's program. See documentation below for syntax." value={program} onChange={handleProgramChange}>
                                                            
                                            </textarea>
                                    </div>
                                </div>
                                <div id="SyntaxMsg"></div>
                            </div>
                        </div>
                    </div>
                    {/* CONTROLS */}
                    <div id="MachineControlBlock">
                        <div className="BoxTitle">Controls</div>
                            <div id="MachineButtonsBlock">
                                <button id="RunButton" onClick={handleRunClick} title="Start the machine running">Run</button>
                                    <br/>                                    
                                    <button id="StopButton" title="Stop turing machine program" onClick={handleStopClick}>Stop</button>

                                    <br/>
                                    
                                    <button id="ResetButton" title="Reset turing machine program" onClick={handleResetClick}>Reset</button>  
                                    
                                    <br/>

                                    <button id="FakeStopButton" title="Load turing machine program" onClick={loadProgram}>Load Program</button>

                                    <br/>

                                    <button id='StopButton' title='Run at full speed' onClick={handleFullspeed}>{fullSpeedMessage}</button>
                                    
                                    <br/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Machine;
