var comp = new Array();
var player = new Array();
const wins = [ 
    [11,12,13], [21,22,23], [31,32,33], [41,42,43],[14,12,13], [24,22,23], [34,32,33], [44,42,43] //Across
     [11,21,31], [12,22,32], [13,23,33], [14,24,34],[41,21,31], [42,22,32], [43,23,33], [44,24,34] //Vertical
     [14,23,32], [11,22,33],[23,32,41], [22,33,44] //diagonal
 ];


function playerMove(obj){
    makeMove(obj, player);
}


function makeMove(obj, moves) {
    obj.setAttribute("disabled", 'disabled');
    if(moves == player){
        obj.setAttribute("class", "player");
        obj.value = "X";
    }
    else{
        obj.setAttribute("class", "comp");
        obj.value = "O"
    }
    
    moves.push(Number(obj.id));
    if(isWin(moves)){
        if(moves == player){
            alert("Congratulations you have won!!");
            disabledBoard();
        }
        else{
            alert("The computer wins!!");
            disabledBoard();
        }
    }
    else if (moves == player){
        setTimeout(function(){ compMove(); }, 100);
    }
}


function isWin(moves) {
    if (moves.length == 3){
        var sorted = Array.from(moves);
        sorted.sort(function(a, b){return a - b});
    
        for (var i = 0; i<10; i++){
            if (JSON.stringify(sorted) == JSON.stringify(wins[i])){
                    return true;
                }
        }
    }
    return false;
}


function compMove() {
    var move;
    var elements = document.getElementsByClassName("fill");


    var possibleMoves = new Array();
    for (var i=0; i<elements.length; i++){
        possibleMoves.push(Number(elements[i].id));
    }


    var temp = Array.from(comp);
    if (temp.length == 4){
        temp.shift();
    }
    if(temp.length == 3){
        for(var i=0; i<possibleMoves.length; i++){
            temp.push(possibleMoves[i]);
            if(isWin(temp)){
                move = possibleMoves[i];
                break;
            }
            else{
                temp.pop();
            }
        }
    }


    if (move == null){
        temp = Array.from(player);
        if (temp.length == 4){
            temp.shift();
        }
        if (temp.length == 3){
            for(var i=0; i<possibleMoves.length; i++){
                temp.push(possibleMoves[i]);
                if(isWin(temp)){
                    move = possibleMoves[i];
                    break;
                }
                else{
                    temp.pop();
                }
            }
        }
    }


    if (move == null){
        move = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
    }
    var obj = document.getElementById(move);
    makeMove(obj, comp);
}


function disabledBoard(){
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
        elements[i].disabled =true;
      }


}