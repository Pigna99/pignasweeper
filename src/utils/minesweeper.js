
//init matrix
//0 is no bombs in range
//1-2-3-4-5 etc are the bombs in range
// -1 is the bomb.
//-2 could be the press point



function generate_matrix(righe, colonne, bombe, vuota, n_start, m_start){

    let matrice_full = [];//init matrix
    for(let i=0; i<righe; i++) {
        matrice_full[i] = [];
        for(let j=0; j<colonne; j++) {
            matrice_full[i][j] = 0;
        }
    }
    if(vuota){return matrice_full};
    //insert bombs
    let counter = 0;
    while(counter<bombe){
        let random1,random2;
        random1 = random(righe);
        random2 = random(colonne);
        //console.log(random1,random2, n_start, m_start)
        if(matrice_full[random1][random2]!== '-1'){
            //not bombs around the start
            if(
                (random1 === n_start-1 && random2 === m_start-1)||
                (random1 === n_start-1 && random2 === m_start)||
                (random1 === n_start-1 && random2 === m_start+1)||
                (random1 === n_start && random2 === m_start-1)||
                (random1 === n_start && random2 === m_start)||
                (random1 === n_start && random2 === m_start+1)||
                (random1 === n_start+1 && random2 === m_start-1)||
                (random1 === n_start+1 && random2 === m_start)||
                (random1 === n_start+1 && random2 === m_start+1)
            ){
                console.log("ABBOMVAZZA");
            }else{
                
                matrice_full[random1][random2]= -1;
                counter++;
            }
        }
    }

    //inspect all the matrix and fill with 1, 2, 3, 4 etc

    for(let i=0; i<righe; i++) {
        for(let j=0; j<colonne; j++) {
            if( matrice_full[i][j] !== -1){
                let numero_bombe = 0;
                if(j>0){//sinistri
                    if(i>0){if(matrice_full[i-1][j-1]=== -1){numero_bombe++}};
                    if(matrice_full[i][j-1]=== -1){numero_bombe++};
                    if(i<righe-1){if(matrice_full[i+1][j-1]=== -1){numero_bombe++}};
                }
                if(j<colonne-1){//destri
                    if(i>0){if(matrice_full[i-1][j+1]=== -1){numero_bombe++}};
                    if(matrice_full[i][j+1]=== -1){numero_bombe++};
                    if(i<righe-1){if(matrice_full[i+1][j+1]=== -1){numero_bombe++}};
                }
                //sotto
                if(i>0){
                    if(matrice_full[i-1][j]=== -1){numero_bombe++}
                }
                //sopra
                if(i<righe-1){
                    if(matrice_full[i+1][j]=== -1){numero_bombe++} 
                }
                matrice_full[i][j]= numero_bombe;
            }
        }
    }







    return matrice_full;
}


function random(number){
    return Math.floor(Math.random()*number);
}

const calcolaFlag = (matrix, value)=>{
    let num=0;
    matrix.forEach(riga => {
        riga.forEach(val=>{
            if(val===value){num++;}
        })
    });
    return num;
}

export {generate_matrix, calcolaFlag};