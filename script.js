function FillEmptyCells(){
    const cells = document.querySelectorAll(".cell");
    for (const cell of cells ){
        cell.innerHTML = (Math.ceil(Math.random() * 2) + 1);
        if(cell.innerHTML == 1){
            const AddDecimal = cell.innerHTML + 0.1;
            const roundUP = ceil(AddDecimal);
            return roundUP;
            
        }
        

    }
    

}