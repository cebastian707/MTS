import React from "react";


const Box = () =>{

    return(
        <div id="MachineProgramContainer">
            <div class="BoxTitle">Turing machine program</div>
            <div id="MachineProgramBlock">
                    <div id="MachineProgramBlock2">
                        <div id="SourceContainer">
                            <div id="SourceBackground">
                            </div>
                            <div id="tabackground">
                                    <textarea id="Source" wrap="off" oninput="TextareaChanged();" onscroll="UpdateTextareaScroll();" onblur="Compile();" title="This is the Turing machine's program. See documentation below for syntax.">
                                                    ; Load a program from the menu or write your own!
                                    </textarea>
                            </div>
                        </div>
                        <div id="SyntaxMsg"></div>
                    </div>
            </div>
        </div>
    );
};

export default Box;