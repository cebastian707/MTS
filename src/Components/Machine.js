import React, { useState, useEffect } from 'react';
import Message from "./Message";
import State from "./State";
import Steps from "./Steps";
// import HeadComponent from './Head';

const Machine = () => {
    // const [tapeString, setTapeString] = useState(initialTapeString);
    // const [headInput, setHeadInput] = useState(initialHeadInput);
    const [headIdx, setHeadIdx] = useState(0)
    const [runStatus, setRunStatus] = useState(true);
    const [numSteps, setNumSteps] = useState(0);

    const [tape, setTape] = useState("");
    const [runButton, setRunButton] = useState(false);
    // const [pauseButton, setPauseButton] = useState(false);
    const [program, setProgram] = useState("; Load a program from the menu or write your own!")

    const [currentState, setCurrentState] = useState('0');
    const [rules, setRules] = useState([]);

    const [inputTape, setInputTape] = useState("")

    const handleRunClick = () => {
        setRunButton(true);
        // stepMachine();
        // Additional logic for running the program can be added here
    };

    const loadProgram = () => {
        const parsedRules = parseProgram(program);
        setRules(parsedRules);
        console.log(parsedRules)
    }

    const handleStopClick = () => {
        setRunButton(false);
        // Additional logic for stopping the program can be added here
    };


    // make reset function here
    // should reset headIdx to 0 and also pause execution
    const handleResetClick = () => {
        setRunButton(false);
        setHeadIdx(0);
        setCurrentState("0");
        setNumSteps(0);
        setTape(inputTape);
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
                alert("Error: All of your directives must have 5 rules in them");
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
    // need a reset function, not just for the button but to reset all state variables after a completed run


    useEffect(() => {
        if (!runButton) {
            return; // Do nothing if the machine is not running
        }

        

        const step = () => {
            

            let tmInput = parseTape(tape);

            // idk if this right, shit is almost working
            // if (tmInput.every(char => char === ' ')) {
            if (currentState.includes('halt')){
                if (currentState.includes('accept')){
                    alert('Machine halted: Accepted.');
                    setRunButton(false); // Halt the machine
                    return;

                }
                else if (currentState.includes('reject')){
                    alert('Machine halted: Rejected.');
                    setRunButton(false); // Halt the machine
                    return;
                    
                }
            }


            setNumSteps(numSteps+1);
            // else{
            //     alert('Machine halted: The entire tape was read.');
            //     setRunButton(false); // Halt the machine

            // }


            // return; // Exit the function
            // }


            const currentChar = (tmInput[headIdx] === ' ') ? '_' : (tmInput[headIdx] || '_');


            let matchedRule = null;
            let wildcardMatch = null; // Store a potential wildcard match

            for (let rule of rules) {
                // Check for an exact match
                if (rule.currentState === currentState && rule.readSymbol === currentChar) {
                    matchedRule = rule;
                    break; // Exit the loop as an exact match is found
                }
                // If no exact match, check for a wildcard match
                else if ((rule.currentState === '*' || rule.currentState === currentState) && 
                         (rule.readSymbol === '*' && wildcardMatch === null)) {
                    wildcardMatch = rule; // Store the first wildcard match
                }
            }
            
            // Use the wildcard match if no exact match is found
            matchedRule = matchedRule || wildcardMatch;

            // NOTE: do something about empty input

            console.log(currentState, currentChar);
            console.log(matchedRule);



            if (matchedRule) {
                if (currentChar !== '_') {
                    if (matchedRule.writeSymbol === "_" && matchedRule.writeSymbol !== '*') {
                        tmInput[headIdx] = " "
                    } else {
                        tmInput[headIdx] = (matchedRule.writeSymbol === '*') ? currentChar : matchedRule.writeSymbol;
                    }
                }
                else {
                    tmInput[headIdx] = " "        
                }
                
                let newHeadIdx = headIdx;
                if (matchedRule.moveDirection === 'r') newHeadIdx += 1;
                else if (matchedRule.moveDirection === 'l') newHeadIdx -= 1;
            

                const newState = matchedRule.nextState === '*' ? currentState : matchedRule.nextState;

                setTape(tmInput.join(''));
                setHeadIdx(newHeadIdx);
                setCurrentState(newState);
            } else {
                setRunButton(false); // Halt the machine
                alert('Machine halted: No matching rule found for current state and character. Input not in language');
            }
        };

        const timer = setTimeout(step, 100); // Schedule the next step
        return () => clearTimeout(timer); // Cleanup on unmount or if dependencies change

    }, [runButton, currentState, tape, headIdx, rules]);

    return (
        <div>
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
            
        
            <div id="MachineMiddleSection">
                <Message/> 
                <State state={currentState}/>
                <Steps steps={numSteps}/>
            </div>
            <div className="cleardiv"></div>
            <div id="MachineLowerSection">
                <div id="MachineLowerSection2">
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
                    <div id="MachineControlBlock">
                        <div className="BoxTitle">Controls</div>
                            <div id="MachineButtonsBlock">
                                <button id="RunButton" onClick={handleRunClick} title="Start the machine running">Run</button>

                    
                                    {/*repurposed this to parse the program*/}
                                    <button id="FakeStopButton" title="Save turing machine program" onClick={loadProgram}>Save Program</button>
                                    
                                    <button id="StopButton" title="Save turing machine program" onClick={handleStopClick}>Stop</button>

                                    <button id="ResetButton" title="Save turing machine program" onClick={handleResetClick}>Reset</button>
                                    
                                    {/*Needs on click button for undo button*/}
                                    
                                    
                                    {/*Need Step Button and go from there */}
                                    <br></br>
                                    <button id="StepButton"  title="Run the machine for a sing step and then pause">Step</button>
                                    <br></br>    
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Machine;
