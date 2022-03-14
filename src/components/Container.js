import React from 'react'
import Box from './Box'
import {generate_matrix, calcolaFlag} from '../utils/minesweeper'
import { useState , useEffect} from 'react';
import { useGlobalContext } from '../context';

let removed = 0;

function Container() {
    const {settedValues, setNumFlags, numFlags} = useGlobalContext();
    const [tempFlags, setTempFlags] = useState(numFlags);
    const [righe, colonne, bombe] = settedValues;
    let matrix = generate_matrix(righe, colonne, 0, true);
    const [isMatrixToggled, setIsMatrixToggled] = useState(matrix);//matrice per celle nascoste/visibili
    const [isFlag, setIsFlag] = useState(matrix);//matrice per flags

    const [matrix2, setMatrix2] = useState(matrix);//matrice con numeri e bombe
    const [start, setStart] = useState([true,0,0]);


    const toggleFlag = (n,m)=>{ 
        let mat = isFlag;
        if(mat[n][m]===0){
            mat[n][m]=1;
            //addFlag();
            setTempFlags(tempFlags+1);
        }else{
            mat[n][m]=0;
            //removeFlag();
            setTempFlags(tempFlags-1);
        }
        setIsFlag([...mat])
    }

    const mostraCasella = (n,m)=>{
        let appoggio = isMatrixToggled;
        appoggio[n][m]= 1;
        let mat = isFlag;
        if(mat[n][m]===1){//rimuovi la flag se é stata scaperta la casella
            mat[n][m]=0;
            removed++;
            setTempFlags(tempFlags-removed);
            //console.log("removing")
        }
        setIsFlag(mat)
        if(start[0]){//genera la matrice 
            setMatrix2(generate_matrix(righe,colonne,bombe,false, n, m));
            setStart([false, n, m]);
            return;
        }
        //console.log(n, m)
        if(matrix2[n][m]=== 0){
            //se e una casella vuota, scopre tutte le vuote e quelle vicine, ricorsivamente

            
            if(m>0){//sinistri
                if(n>0){if(isMatrixToggled[n-1][m-1]!==1){mostraCasella(n-1, m-1)};};
                if(isMatrixToggled[n][m-1]!==1){mostraCasella(n, m-1)}
                if(n<matrix2.length-1){if(isMatrixToggled[n+1][m-1]!==1){mostraCasella(n+1, m-1);}};
            }
            if(m<matrix2[0].length-1){//destri
                if(n>0){if(isMatrixToggled[n-1][m+1]!==1){mostraCasella(n-1, m+1);}};
                if(isMatrixToggled[n][m+1]!==1){mostraCasella(n, m+1);}
                if(n<matrix2.length-1){if(isMatrixToggled[n+1][m+1]!==1){mostraCasella(n+1, m+1);}};
            }
            if(n>0){
                if(isMatrixToggled[n-1][m]!==1){mostraCasella(n-1, m)};
            }
            //sotto
            if(n<matrix2.length-1){
                if(isMatrixToggled[n+1][m]!==1){mostraCasella(n+1, m)};
            }
        }
        if(matrix2[n][m]=== -1){//HAI PERSO!
            //mostra tutte le bombe
            for(let i=0; i<righe; i++) {
                for(let j=0; j<colonne; j++) {
                    if(matrix2[i][j]===-1){
                        isMatrixToggled[i][j]=1;
                    }
                }
            }
            //MESSAGGIO SCONFITTA!
            alert("PERDUTO")
        }
        
        setIsMatrixToggled([...appoggio]);

    }

    const controllaVittoria= ()=>{
        let numCoperti= calcolaFlag(isMatrixToggled, 0);
        if(numCoperti=== bombe ){
            alert("HAI VINTO!");
        }
        //controlla se hai vinto
    }

    useEffect(()=>{
        if(start[0]=== false){
            mostraCasella(start[1],start[2]);
        }
    }, [start]);

    useEffect(()=>{
        let matrix = generate_matrix(righe, colonne, 0, true);
        setIsMatrixToggled(matrix);
        setIsFlag(generate_matrix(righe, colonne, 0, true));
        setMatrix2(matrix);
        removed=0;
        setTempFlags(0);
        setStart([true,0,0]);
        //console.log(matrix, isFlag)
    }, [settedValues, righe, colonne])

    useEffect(() => {
        //console.log(tempFlags)
        setNumFlags(tempFlags)
        removed=0;
    }, [tempFlags])
    

    

    return (
        <table className="game-container" onContextMenu={(e)=>{e.preventDefault()}}>
            <thead>
                {
                    matrix2.map((el1, index1)=>{
                        return(
                            <tr key={index1}>
                                {
                                    el1.map((el2, index2)=>{
                                        return(
                                            <td key={index1 + " " + index2}>
                                                <Box value={el2} coords={[index1,index2]} open={isMatrixToggled[index1][index2]===1 ? true : false} mostraCasella={mostraCasella}
                                                    flag={isFlag[index1][index2]===1 ? true : false} toggleFlag={toggleFlag} controllaVittoria={controllaVittoria}
                                                />
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </thead>            
        </table>
    )
}

export default Container
