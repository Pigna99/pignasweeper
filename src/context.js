import {createContext, useContext, useState, useEffect} from 'react'

const AppContext = createContext();

const AppProvider = ({children})=>{
    const [tableDimension, setTableDimension] = useState([15,20]);
    const [bombs, setBombs] = useState(50);
    const [timer, setTimer] = useState(0);
    const [numFlags, setNumFlags] = useState(0);

    const [settedValues, setSettedValues] = useState([15,20,50, false]); //righe, colonne, bombe 



    const addFlag= ()=>{
        setNumFlags(numFlags+1)
    }

    const removeFlag= ()=>{
        setNumFlags(numFlags-1)
    }

    const setRow = (row)=>{
        setTableDimension([parseInt(row.target.value), tableDimension[1]]);
    }

    const setColum = (colum)=>{
        setTableDimension([tableDimension[0], parseInt(colum.target.value)]);
    }

    const setBombsNumber = (bombs)=>{
        if(bombs.target.value > Math.floor((tableDimension[0]*tableDimension[1]/3))){
            setBombs(Math.floor((tableDimension[0]*tableDimension[1]/3)));
        }
        setBombs(parseInt(bombs.target.value));
    }

    const changeSettedValues= ()=>{
        setSettedValues([tableDimension[0], tableDimension[1], bombs, !settedValues[3]]);
        setNumFlags(0);
        console.log(settedValues);
    }

    useEffect(()=>{ //limiti dei valori
        if(bombs > Math.floor((tableDimension[0]*tableDimension[1]/3))){
            setBombs(Math.floor((tableDimension[0]*tableDimension[1]/3)));
        }
        if(tableDimension[0]*tableDimension[1]<25){
            setBombs(1);
        }
        if(tableDimension[0]*tableDimension[1]<10){
            setBombs(0);
        }
        if(tableDimension[0]>100){
            setTableDimension([100, tableDimension[1]])
        }
        if(tableDimension[0]<1){
            setTableDimension([1, tableDimension[1]])
        }
        if(tableDimension[1]>100){
            setTableDimension([tableDimension[0], 100])
        }
        if(tableDimension[1]<1){
            setTableDimension([tableDimension[0], 1])
        }
        //console.log(tableDimension, bombs)
    }, [tableDimension, bombs])

    return <AppContext.Provider value={{
        tableDimension, setRow, setColum, bombs, setBombsNumber, settedValues, changeSettedValues,
        numFlags, addFlag, removeFlag, setNumFlags
    }}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export {AppProvider, useGlobalContext}