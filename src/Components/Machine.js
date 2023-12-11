import React, { useState, useEffect } from 'react';
import Message from "./Message";
import State from "./State";
import Steps from "./Steps";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import palindrome from '../machines/palindrome.txt';
import bin_to_dec from '../machines/bin2dec.txt';
import binaryadd from '../machines/binaryadd.txt';
import binarymult from '../machines/binarymult.txt';
import primetest from '../machines/primetest.txt';
import rpb from '../machines/reversepolishboolean.txt';
import universal from '../machines/universal.txt';
import parenthesis from '../machines/parentheses.txt';
import turingsequence from '../machines/turingsequence.txt';
import four_state_beaver from '../machines/4statebeaver.txt';

const program_array = [palindrome,binaryadd,binarymult,bin_to_dec,turingsequence,parenthesis,rpb,primetest,four_state_beaver,universal];
const initial_input = ['1001001','110110 101011','1101 11010','10110',' ','12(2+(3^(4-1)))','10~1&|0|','101',' ','[ L+,0R.,1R.!1L+,1L+,0L.:,0L.,1L.:]1011'];
const Load_Message = ['Loaded Palindrome','Loaded Binary Addition','Loaded BintoDec','Loaded Turing Sequence','Loaded parentheses','Loaded RPB','Loaded Prime Test','Loaded 4statebeaver','Loaded Universal Turing Machine'];


const Machine = () => {
    const [headIdx, setHeadIdx] = useState(0)
    const [runStatus, setRunStatus] = useState(true);
    const [numSteps, setNumSteps] = useState(0);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [tape, setTape] = useState("");
    const [runButton, setRunButton] = useState(false);
    const [program, setProgram] = useState("; Load a program from the menu or write your own!")

    const [message, setMessage] = useState("Load or write a Turing Machine Program and click Run!");

    const [currentState, setCurrentState] = useState('0');
    const [rules, setRules] = useState([]);

    const [inputTape, setInputTape] = useState("");

    const [fullspeed,runFullspeed] = useState([100]);
    const [fullSpeedMessage,setSpeedMessage] = useState("Run Full Speed")


    const handleLoadProgram = (event) =>{
        setSelectedProgram(event.target.value);
        fetch(program_array[event.target.value]).then(r => r.text()).then(text =>{
            console.log('Program',text);
        });

    };

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

    // read text file
    const handleChange = (event) => {
        fetch(program_array[event.target.value])
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {

            setProgram(data); 
            // console.log(data);
            // console.log(data.split('\n'));
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }


    // this should prob only grab the value from text area when we hit the run button, not everytime something is typed into the textarea. but it works
    const handleProgramChange = (event) => {
        setProgram(event.target.value);
        // console.log(event.target.value);
    };

    const parseProgram = (program) => {
        let rules = []
        const lines = program.split('\n').map(str => str.replace(/\r/g, ''));
        console.log(lines);
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
                                    <br/>
                                    {/*Load Example Program*/}
                                    <FormControl id='stopButton' sx={{ m: 1, minWidth: 150 }}>
                                        <InputLabel>Load Program</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="StopButton"
                                                    value={selectedProgram}
                                                    label="Load"
                                                    onChange={handleLoadProgram}>
                                                        <MenuItem value={0}>Palindrome detector</MenuItem>
                                                        <MenuItem value={1}>Binary addition</MenuItem>
                                                        <MenuItem value={2}>Binary multiplication</MenuItem>
                                                        <MenuItem value={3}>Binary to deimal conversion</MenuItem>
                                                        <MenuItem value={4}>Turing's sequence machine</MenuItem>
                                                        <MenuItem value={5}>Parentheses checker</MenuItem>
                                                        <MenuItem value={6}>Reverse Polish Boolean calculator</MenuItem>
                                                        <MenuItem value={7}>Primality test</MenuItem>
                                                        <MenuItem value={8}>4-state busy beaver</MenuItem>
                                                        <MenuItem value={9}>Universal Turing Machine</MenuItem>
                                                </Select>
                                    </FormControl>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Machine;
