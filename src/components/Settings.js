import React from 'react'
import { useGlobalContext } from '../context'

function Settings() {
    const {tableDimension, setRow, setColum, setBombsNumber, bombs, changeSettedValues} = useGlobalContext();
    return (
        <form className="settings">
            <div className="option">
                <label>Numero righe</label>
                <input type="number" value={tableDimension[0]} min={5} className="input" onChange={(el)=>setRow(el)}/>
            </div>
            <div className="option">
                <label>Numero colonne</label>
                <input type="number" value={tableDimension[1]} min={5} className="input" onChange={(el)=>setColum(el)}/>
            </div>
            <div className="option">
            <label>Numero Bombe</label>
                <input type="number" value={bombs} min={1} className="input" onChange={(el)=>setBombsNumber(el)}/>
            </div>
            <div className="option">
                <label>Genera</label>
                <button onClick={(e)=>{changeSettedValues(); e.preventDefault()}}>Genera</button>
            </div>
        </form>
    )
}

export default Settings
