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
        this.player_type ="human";
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
        this.player_type ="computer";
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
            if(this.game_board[i][j]=== -1){
                possible_selections.push({first_index:i, second_index:j});
            }

        }
        this.index_of_element_selected = Math.floor(Math.random()*possible_selections.length);
        document.getElementById(this.game_board_w_section_id[this.index_of_element_selected.first_index][this.index_of_element_selected.second_index]).innerHTML=this.players[this.current_player].x_or_o;
        this.game_board[this.index_of_element_selected.first_index][this.index_of_element_selected.second_index]=this.players[this.current_player].numerical_x_or_o;
        


    }
    reset_game(){
        this.players=[];
        this.current_player=0;
        this.game_board= [ [-1, -1,-1], [-1,-1,-1,], [-1,-1,-1]];
        mygame.game_in_progress=false;
        mygame.game_over=true;
    }
    GameFinished=()=>{
        this.reset_game();
        this.removeAttributes();
        this.toggleStartResetButtonVisibility();
        this.togglePlayButtonVisibility();
        document.getElementById('start_reset').value="Start!";


    }
    check_tic_tac_toe(first_index,second_index){
        // top vertical
        let counter_top = 0;
        for (let i = first_index; i < 3; i++) {
            if(this.game_board[i][second_index] === this.players[this.current_player].numerical_x_or_o){
                counter_top++;
            }
        }
        

        //bottom vertical
        let counter_bottom =0;
        for (let i = first_index-1; i >= 0; i--) {
            if(this.game_board[i][second_index] === this.players[this.current_player].numerical_x_or_o){
                counter_bottom++;
            }
            
        }
        if((counter_top+counter_bottom)===3){return true;}

        // right horizontal
        let counter_right=0;
        for (let i = second_index; i<3; i++) {
            
            if(this.game_board[first_index][i] === this.players[this.current_player].numerical_x_or_o){
                counter_right++
            }
            
            
        }

        // left horizontal
        let counter_left=0;
        for (let i = second_index-1; i >= 0; i--) {
            
            if(this.game_board[first_index][i] === this.players[this.current_player].numerical_x_or_o){
                counter_left++;
            }
            
        }
        if((counter_right+counter_left)===3){return true;}


        
        // top right
        let counter_top_right =0;
        let i=first_index, j=second_index;
        while( i  < 3&& j <3){
            if(this.game_board[i][j] === this.players[this.current_player].numerical_x_or_o){

                counter_top_right++;
            }
            i++;
            j++;
        }
        //bottom left
        let counter_bottom_left=0;
        i=first_index-1;
        j=second_index-1;
        while( i  >=0 && j >=0){
            if(this.game_board[i][j] === this.players[this.current_player].numerical_x_or_o){

                counter_bottom_left++;
            }
            i--;
            j--;
        }
        if((counter_bottom_left+counter_top_right)==3){
            return true;
        }

        // top left
        let counter_top_left =0;
        i=first_index;
        j=second_index;
        while( i  < 3&& j >=0){
            if(this.game_board[i][j] === this.players[this.current_player].numerical_x_or_o){

                counter_top_left++;
            }
            i++;
            j--;
        }

        
        //bottom right
        let counter_bottom_right=0;
        i=first_index-1;
        j=second_index-1;
        while( i  >=0 && j <3){
            if(this.game_board[i][j] === this.players[this.current_player].numerical_x_or_o){

                counter_bottom_right++;
            }
            i--;
            j++;
        }
        if((counter_top_left+counter_bottom_right)==3){
            return true;
        }
 
        return false;
    }
    check_game_board_is_full(){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(this.game_board[i][j] === -1){
                    return false;
                }
            }
            
        }
        return true;
    }
    check_if_occupied(id)
    {
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
        let first_index=0, second_index =0;
        if(!this.check_if_occupied(element_id)){
            evt.target.innerText=this.players[this.current_player].x_or_o;
            for (let outer_index = 0; outer_index < 3; outer_index++) {
                for (let inner_index = 0; inner_index < 3; inner_index++) {
                    if(this.game_board_w_section_id[outer_index][inner_index] ===element_id){
                        first_index= outer_index;
                        second_index = inner_index
                        this.game_board[outer_index][inner_index]=this.players[this.current_player].numerical_x_or_o;
                     }
                } 
            }

            if(this.check_tic_tac_toe(first_index, second_index) || this.check_game_board_is_full()){
                this.GameFinished();
            }
            else{
                this.nextPlayer();
                if(this.players[this.current_player].player_type=="computer"){
                    setTimeout(this.computerSelectSquare, 2000);
                }
            }
        }
       



    }
    
    removeAttributes(){
        var blocks = this.grid.getElementsByTagName('span');
        for (let index = 0; index < blocks.length; index++) {
            blocks[index].removeEventListener('click',mygame.submitSelection);
        }
    }
    setGridBlank(){
        var blocks = this.grid.getElementsByTagName('span');
        for (let index = 0; index < blocks.length; index++) {
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
    togglePlayButtonVisibility(){
        document.getElementById('play_again').style.visibility = 'hidden';
        if(document.getElementById('play_again').style.visibility === 'hidden'){
            document.getElementById('play_again').style.visibility = 'visible';
        }
        else{
            document.getElementById('play_again').style.visibility = 'hidden';
        }
    }
    toggleStartResetButtonVisibility(){
        if(document.getElementById('start_reset').style.visibility === 'hidden'){
            document.getElementById('start_reset').style.visibility = 'visible';
        }
        else{
            document.getElementById('start_reset').style.visibility = 'hidden';
        }
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
        mygame.setGridBlank();
        mygame.visibleRadioButtons();
        evt.target.value="Start!"
    }

}


window.addEventListener('load', function(){
    mygame.grid= document.getElementById('grid');
    mygame.reset_game();
    document.getElementById('start_reset').addEventListener('click', start_reset);
    document.getElementById('play_again').addEventListener('click', function(){
       mygame.setGridBlank();
       mygame.togglePlayButtonVisibility();
       mygame.toggleStartResetButtonVisibility();
       mygame.visibleRadioButtons();
    });


    
    
/*
 document.getElementById('q1').addEventListener('click',start);
 document.getElementsByTagName('main')[0].addEventListener('click', function(){

console.log('hello');
 });

*/
});