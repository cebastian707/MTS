import React from "react";


const Message = ({message}) =>{
    return(            
            <div id="MachineStatusMsgWrapper" aria-live="polite">
                <pre id="MachineStatusMsgText">{message}</pre>
                    <div id="MachineStatusMsgText"></div>
            </div>
    );
};

export default Message;