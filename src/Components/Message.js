import React from "react";


const Message = () =>{
    return(            
            <div id="MachineStatusMsgWrapper" aria-live="polite">
                <pre id="MachineStatusMsgText">Load or write a Turing Machine Program and click Run!</pre>
                    <div id="MachineStatusMsgText"></div>
            </div>
    );
};

export default Message;