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
        this.game_over=true;
        this.players= new Array();
        this.game_board_w_section_id =[['q1', 'q2', 'q3'], ['q4', 'q5', 'q6'], ['q7', 'q8', 'q9']];
        this.game_board; 
        this.current_player;
        
    }
    reset_game(){
        this.current_player=0;
        this.game_board= [ [-1, -1,-1], [-1,-1,-1,], [-1,-1,-1]];
    }
     check_if_occupied=(id)=>{
        for (let outer_index = 0; outer_index < 3; outer_index++) {
            for (let inner_index = 0; inner_index < 3; inner_index++) {
                if(this.game_board_w_section_id[outer_index][inner_index]===id && this.game_board[outer_index][inner_index] != -1){
                    return true;
                }
                else if(this.game_board_w_section_id[outer_index][inner_index]===id&& this.game_board[outer_index][inner_index] == -1){

                    return false;
                }
            }
        }

        return false;
    }
    submitSelection=(evt)=>{
        let element_id=evt.target.id;
        if(!this.check_if_occupied(element_id)){
            console.log(this.players[this.current_player].x_or_o);
            evt.target.innerHTML=this.players[this.current_player].x_or_o;
            var pair =  new Object();
            for (let outer_index = 0; outer_index < 3; outer_index++) {
                for (let inner_index = 0; inner_index < 3; inner_index++) {
                    if(this.game_board_w_section_id[outer_index][inner_index] ===element_id){
                        pair.first_index = outer_index;
                        pair.second_index= inner_index;
                     }
                } 
            }

        }
       



    }
  
    removeAttributes(){
        var blocks = this.grid.getElementsByTagName('p');
        for (let index = 0; index < blocks.length; index++) {
            blocks[index].removeEventListener('click',mygame.submitSelection);
            if(blocks[index].hasAttribute('class')){
                blocks[index].removeAttribute('class');
            }
        }
    }
    addAttributes(){
        var blocks =this.grid.getElementsByTagName('p');
        for (let index = 0; index < blocks.length; index++) {
            blocks[index].addEventListener('click',mygame.submitSelection);
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
            let variable_assignment = Math.floor(Math.random()*2);
            let player1 = new human(variable_assignment);
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
            mygame.game_over=false;
            mygame.addAttributes();
            mygame.hideRadioButtons();
        }

    }
    else if(evt.target.value==="Restart!"){
        mygame.game_in_progress=false;
        mygame.game_over=true;
        mygame.removeAttributes();
        mygame.visibleRadioButtons();
        evt.target.value="Start!"
        mygame.players=[];
    }

}


window.addEventListener('load', function(){
    mygame.grid= document.getElementById('grid');
    mygame.reset_game();
    document.getElementById('start_reset').addEventListener('click', start_reset);

    
    
/*
 document.getElementById('q1').addEventListener('click',start);
 document.getElementsByTagName('main')[0].addEventListener('click', function(){

console.log('hello');
 });

*/
});