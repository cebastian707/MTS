import React from "react";



const Bottom = () =>{

    return(
        <div id="SyntaxInfo">Syntax:
        <ul>
         <li>Each line should contain one tuple of the form '<code>&lt;current state&gt; &lt;current symbol&gt; &lt;new symbol&gt; &lt;direction&gt; &lt;new state&gt;</code>'.</li>
         <li>You can use any number or word for <code>&lt;current state&gt;</code> and <code>&lt;new state&gt;</code>, eg. <code>10, a, state1</code>. State labels are case-sensitive.</li>
         <li>You can use almost any character for <code>&lt;current symbol&gt;</code> and <code>&lt;new symbol&gt;</code>, or '<code>_</code>' to represent blank (space). Symbols are case-sensitive.
           <br/>
           You can't use '<code>;</code>', '<code>*</code>', '<code>_</code>' or whitespace as symbols.
         </li>
         <li><code>&lt;direction&gt;</code> should be '<code>l</code>', '<code>r</code>' or '<code>*</code>', denoting 'move left', 'move right' or 'do not move', respectively.</li>
         <li>Anything after a '<code>;</code>' is a comment and is ignored.</li>
         <li>The machine halts when it reaches any state starting with '<code>halt</code>', eg. <code>halt, halt-accept</code>.</li>
        </ul>
        Also:
        <ul>
         <li>'<code>*</code>' can be used as a wildcard in <code>&lt;current symbol&gt;</code> or <code>&lt;current state&gt;</code> to match any character or state.</li>
         <li>'<code>*</code>' can be used in <code>&lt;new symbol&gt;</code> or <code>&lt;new state&gt;</code> to mean 'no change'.</li>
         <li>'<code>!</code>' can be used at the end of a line to set a breakpoint, eg '<code>1 a b r 2 !</code>'. The machine will automatically pause after executing this line.</li>
         <li>You can specify the starting position for the head using '<code>*</code>' in the initial input.</li>
        </ul>
       </div>
    );

};



export default Bottom;