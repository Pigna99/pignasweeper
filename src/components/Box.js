import React from 'react';


/*document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});*/

function Box({open, coords, value, mostraCasella, flag, toggleFlag, controllaVittoria}) {
    //console.log(open, flag)
    return (
        <div className={"box" + ( open ? "": " box-close ") //colori per i diversi numeri
         + (value=== -1 && open ? " red" : "")
         + (value=== 1 && open ? " green1" : "")
         + (value=== 2 && open ? " green2" : "")
         + (value=== 3 && open ? " green3" : "")
         + (value=== 4 && open ? " yellow1" : "")
         + (value=== 5 && open ? " yellow2" : "")
         + (value=== 6 && open ? " yellow3" : "")
         + (value=== 7 && open ? " yellow4" : "")
         + (value=== 8 && open ? " yellow5" : "")
         } onClick={flag ? null :(!open? ()=>{mostraCasella(coords[0], coords[1]); setTimeout(controllaVittoria, 100);}:null)}
            onContextMenu={(e)=>{e.preventDefault(); if(!open){toggleFlag(coords[0],coords[1])}}}
         >
            {open? ((value=== 0 || value=== -1 ) ? null : value) : null}
            <div className={flag ? "flag" : ""}/>
        </div>
    )
}

export default Box
