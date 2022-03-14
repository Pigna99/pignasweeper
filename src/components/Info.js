import React from 'react'
import { useGlobalContext } from '../context'

function Info() {
    const {numFlags} = useGlobalContext()

    return (
        <div  className="settings">
            <div className="option timer">
                <label>Timer</label>
            </div>
            <div className="option flags">
                <label>Flags</label>
                <div className='flag'>{numFlags}</div>
            </div>
        </div>
    )
}

export default Info