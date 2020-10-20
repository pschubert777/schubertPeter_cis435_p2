class human {
    constructor(type){
        if(type===0){
         this.numerical_x_or_o = type;
         this.x_or_o="O";
        }
        else{
            this.numerical_x_or_o = type;
            this.x_or_o="X";
        }
       
}

}
class computer {
    constructor(type){
        if(type===0){
          this.numerical_x_or_o = type;
          this.x_or_o="O";
        }
        else{
            this.numerical_x_or_o = type;
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
        this.current_player =0;
        
    }
    nextPlayer(){
        if(this.current_player==0){
            this.current_player+=1;
        }
        else{
            this.current_player-=1;
        }
        
        document.getElementsByTagName('main')[0].getElementsByTagName('p')[0].innerText ="It is "+ this.players[this.current_player].x_or_o+"'s turn."
    }
    computerSelectSquare(){
        let possible_selections =[];
        for(let i =0; i <3;i++){
            for (let j = 0; j < 3; j++) {
            }
            if(this.game_board[i][j]===-1){
                possible_selections.push({first_index:i, second_index:j});
            }

        }
        const index_of_element_selected = Math.floor(Math.random()*possible_selections.length);
        document.getElementById(this.game_board_w_section_id[index_of_element_selected.first_index][index_of_element_selected.second_index]).innerHTML=this.players[this.current_player].x_or_o;
        this.game_board[index_of_element_selected.first_index][index_of_element_selected.second_index]=this.players[this.current_player].numerical_x_or_o;
        


    }
    reset_game(){
        this.players=[];
        this.current_player=0;
        this.game_board= [ [-1, -1,-1], [-1,-1,-1,], [-1,-1,-1]];
        mygame.game_in_progress=false;
        mygame.game_over=true;

        
    }
     check_if_occupied(id){
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
            evt.target.innerText=this.players[this.current_player].x_or_o;
            for (let outer_index = 0; outer_index < 3; outer_index++) {
                for (let inner_index = 0; inner_index < 3; inner_index++) {
                    if(this.game_board_w_section_id[outer_index][inner_index] ===element_id){
                        this.game_board[outer_index][inner_index]=this.players[this.current_player].numerical_x_or_o;
                     }
                } 
            }

            this.nextPlayer();
        }
       



    }
    
    removeAttributes(){
        var blocks = this.grid.getElementsByTagName('span');
        for (let index = 0; index < blocks.length; index++) {
            blocks[index].removeEventListener('click',mygame.submitSelection);
            if(blocks[index].hasAttribute('class')){
                blocks[index].removeAttribute('class');
            }
            blocks[index].innerText="";
        }
        document.getElementsByTagName('main')[0].getElementsByTagName('p')[0].innerText ="";
    }
    addAttributes(){
        var blocks =this.grid.getElementsByTagName('span');
        for (let index = 0; index < blocks.length; index++) {
            blocks[index].addEventListener('click',mygame.submitSelection);
        }
    }
    hideRadioButtons(){
        document.getElementById('human_human').style.visibility='hidden';
        document.getElementById('human_human').nextElementSibling.innerText="";
        document.getElementById('human_computer').style.visibility='hidden';
        document.getElementById('human_computer').nextElementSibling.innerText="";
       
    }
    visibleRadioButtons(){
        document.getElementById('human_human').style.visibility='visible';
        document.getElementById('human_human').nextElementSibling.innerText="Human vs Human";
        document.getElementById('human_computer').style.visibility='visible';
        document.getElementById('human_computer').nextElementSibling.innerText="Human vs Computer";
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
            mygame.game_mode="human_human";
        }
        else{
            // if computer v human, human is always X, Computer is O
            let player_goes_first = Math.floor(Math.random()*2);
            let player1 = new human(1);
            let player2 =new computer(0);
            
            if((player_goes_first==0 && player1 =="O")|| (player_goes_first ===1 && player1.x_or_o =="X")){
                mygame.players.push(player1);
                mygame.players.push(player2);
            }
            else{
                mygame.players.push(player2);
                mygame.players.push(player1);
            }
            mygame.game_in_progress=true;
            computer_v_human.checked=false;
            mygame.game_mode="computer_human"
        }
        
        if(mygame.game_in_progress){
            document.getElementsByTagName('main')[0].getElementsByTagName('p')[0].innerText ="It is "+ mygame.players[mygame.current_player].x_or_o+"'s turn."
            evt.target.value= "Restart!";
            mygame.game_over=false;
            mygame.addAttributes();
            mygame.hideRadioButtons();
        }

    }
    else if(evt.target.value==="Restart!"){
        mygame.reset_game();
        mygame.removeAttributes();
        mygame.visibleRadioButtons();
        evt.target.value="Start!"
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