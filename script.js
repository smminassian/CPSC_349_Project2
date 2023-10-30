function FillEmptyCells(){
    const cells = document.querySelectorAll(".cellText");
    for (const cell of cells ){
        if(cell.innerHTML === ""){
            cell.innerHTML = `<span>${((Math.ceil(Math.random() * 2) + 1))}</span>`;
        }
        else if (cell.innerHTML == 3) { 
            const addDecimal = (cell.innerHTML) + 0.1;
            const roundUp = Math.ceil(addDecimal);
            cell.innerHTML = `<span>${roundUp}</span>`;
        }
    }
    
        
    }

FillEmptyCells();
