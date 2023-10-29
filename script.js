function FillEmptyCells(){
    const cells = document.querySelectorAll(".cellText");
    for (const cell of cells ){
        if(cell.innerHTML == ""){
            (cell.innerHTML =`<span>${((Math.ceil(Math.random() * 2) + 1))}</span>`) || (cell.innerHTML = `<span>${((Math.ceil(Math.random() * 4) + 3))}</span>`);
        }
        else if((cell.innerHTML === 1) || (cell.innerHTML === 3)){
            const AddDecimal = parseFloat(cell.innerHTML) + 0.1;
            const roundUP = Math.ceil(AddDecimal);
            cell.innerHTML = `<span>${roundUP}</span>`
        }
        
    }
    

}

FillEmptyCells();
