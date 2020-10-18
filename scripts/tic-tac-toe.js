class human {
    constructor(type){
        if(type===0){
         this.x_or_o="O";
        }
        else{
            this.x_or_o="X";
        }
}

}
class computer {
    constructor(type){
        if(type===0){
          this.x_or_o="O";
        }
        else{
            this.x_or_o="X";
        }
  
    }

}
class Game{
    constructor(){
        this.game_in_progress =false;
        this.game_over=false;
        this.players= new Array();
        

    }
    removeAttributes(){
        var blocks = this.grid.getElementsByTagName('p');
        for (let index = 0; index < blocks.length; index++) {
            blocks[index].removeEventListener('click',color_change);
            if(blocks[index].hasAttribute('class')){
                blocks[index].removeAttribute('class');
            }
        }
    }
    addAttributes(){
        var blocks =this.grid.getElementsByTagName('p');
        for (let index = 0; index < blocks.length; index++) {
            blocks[index].addEventListener('click',color_change);
        }
    }
    hideRadioButtons(){
        document.getElementById('human_human').style.visibility='hidden';
        document.getElementById('human_human').nextElementSibling.innerHTML="";
        document.getElementById('human_computer').style.visibility='hidden';
        document.getElementById('human_computer').nextElementSibling.innerHTML="";
       
    }
    visibleRadioButtons(){
        document.getElementById('human_human').style.visibility='visible';
        document.getElementById('human_human').nextElementSibling.innerHTML="Human vs Human";
        document.getElementById('human_computer').style.visibility='visible';
        document.getElementById('human_computer').nextElementSibling.innerHTML="Human vs Computer";
    }

}
let mygame = new Game();

function color_change(evt){
    if(evt.target.hasAttribute('class')){
        evt.target.removeAttribute('class');
    }
    else{
        evt.target.setAttribute('class', 'change_color');
    }
}
function start_reset(evt){
   
    if(evt.target.value==="Start!"){
        let human_v_human = document.getElementById('human_human');
        let computer_v_human = document.getElementById('human_computer');

        if(!human_v_human.checked && !computer_v_human.checked){
            alert("Please Select a game mode!");
        }
        else if(human_v_human.checked){
            let player_goes_first = Math.floor(Math.random()*2);
            var variable_assignment = Math.floor(Math.random()*2);
            let player1 = new human(variable_assignment)
            let player2 = (variable_assignment ===0? new human(1): new human(0));
            
            // 0 for O and 1 for X, determining which goes first
            if((player_goes_first ===0 && player1.x_or_o =="O") || (player_goes_first ===1 && player1.x_or_o =="X")){
                mygame.players.push(player1);
                mygame.players.push(player2);
            }
            else{
                mygame.players.push(player2);
                mygame.players.push(player1);
            }

            mygame.game_in_progress = true;
            human_v_human.checked=false;
            
        }
        else{
            // if computer v human, human is always X, Computer is O
            mygame.players.push(new human(1));
            mygame.players.push(new computer(0));
            mygame.game_in_progress=true;
            computer_v_human.checked=false;
        }
        
        if(mygame.game_in_progress){
            evt.target.value= "Restart!";
            mygame.addAttributes();
            mygame.hideRadioButtons();
        }

    }
    else if(evt.target.value==="Restart!"){
        mygame.game_in_progress=false;
        mygame.removeAttributes();
        mygame.visibleRadioButtons();
        evt.target.value="Start!"
        mygame.players=[];
    }

}


window.addEventListener('load', function(){
    mygame.grid= document.getElementById('grid');
    document.getElementById('start_reset').addEventListener('click', start_reset);

    
    
/*
 document.getElementById('q1').addEventListener('click',start);
 document.getElementsByTagName('main')[0].addEventListener('click', function(){

console.log('hello');
 });

*/
});