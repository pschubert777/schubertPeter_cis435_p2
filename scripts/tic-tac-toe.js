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
class DOM_manipulation{
    constructor(){
        this.grid=document.getElementById('grid');
        this.human_human_radio_button = document.getElementById('human_human');
        this.human_computer_radio_button = document.getElementById('human_computer');
        this.play_again_button = document.getElementById('play_again');
        this.start_reset_button = document.getElementById('start_reset');
        this.player_turn_paragraph_status =document.getElementsByTagName('main')[0].getElementsByTagName('p')[0];
     
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
        this.player_turn_paragraph_status.innerText ="";
    }
    addAttributes(){
        var blocks =this.grid.getElementsByTagName('span');
        for (let index = 0; index < blocks.length; index++) {
            blocks[index].addEventListener('click',mygame.submitSelection);
        }
    }
    hideRadioButtons(){
        this.human_human_radio_button.style.visibility='hidden';
        this.human_human_radio_button.nextElementSibling.innerText="";
        this.human_computer_radio_button.style.visibility='hidden';
        this.human_computer_radio_button.nextElementSibling.innerText="";
       
    }
    visibleRadioButtons(){
        this.human_human_radio_button.style.visibility='visible';
        this.human_human_radio_button.nextElementSibling.innerText="Human vs Human";
        this.human_computer_radio_button.style.visibility='visible';
        this.human_computer_radio_button.nextElementSibling.innerText="Human vs Computer";
    }
    humanVHumanRadioButtonChecked(){
        return this.human_human_radio_button.checked;
    }
    humanVComputerRadioButtonChecked(){
        return this.human_computer_radio_button.checked;
    }
    toggleHumanComputerRadioButtonValue(bool_value){
        this.human_computer_radio_button.checked=bool_value;
    }
    toggleHumanHumanRadioButtonValue(bool_value){
        this.human_human_radio_button.checked=bool_value;
    }
    togglePlayButtonVisibility(){
        
        if(this.play_again_button.style.visibility === 'hidden'){
            this.play_again_button.style.visibility = 'visible';
        }
        else{
            this.play_again_button.style.visibility = 'hidden';
        }
    }
    toggleStartResetButtonVisibility(){
        if(this.start_reset_button.style.visibility === 'hidden'){
            this.start_reset_button.style.visibility = 'visible';
        }
        else{
            this.start_reset_button.style.visibility = 'hidden';
        }
    }
    updatePlayerTurn(string_val){
        this.player_turn_paragraph_status.innerText = string_val;
    }
    updateStartResetValue(string_val){
        this.start_reset_button.value = string_val;
    }
    updateGridSquare(square_id, x_or_o){
        document.getElementById(square_id).innerHTML= x_or_o;
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
        
        this.DOM_manipulation.updatePlayerTurn("It is "+ this.players[this.current_player].x_or_o+"'s turn.");
    }
    computerSelectSquare=()=>{
        let possible_selections =[];
        for(let i =0; i <3;i++){
            for (let j = 0; j < 3; j++) {
                if(this.game_board[i][j]=== -1){
                    possible_selections.push({first_index:i, second_index:j});
                }
            }
           

        }
        let index_of_element_selected = possible_selections[Math.floor(Math.random()*possible_selections.length)];

        this.DOM_manipulation.updateGridSquare(this.game_board_w_section_id[index_of_element_selected.first_index][index_of_element_selected.second_index], this.players[this.current_player].x_or_o) 
        this.game_board[index_of_element_selected.first_index][index_of_element_selected.second_index]=this.players[this.current_player].numerical_x_or_o;
       
        if(this.check_tic_tac_toe(index_of_element_selected.first_index, index_of_element_selected.second_index) || this.check_game_board_is_full()){
            this.GameFinished(this.players[this.current_player].player_type);
        }
        else{
            this.nextPlayer();
            this.DOM_manipulation.addAttributes();
        }
        

    }
    reset_game(){
        this.players=[];
        this.current_player=0;
        this.game_board= [ [-1, -1,-1], [-1,-1,-1,], [-1,-1,-1]];
        mygame.game_in_progress=false;
        mygame.game_over=true;
    }
    GameFinished=(player_type)=>{
       
        
        this.reset_game();
        // DOM manipulation
        if(player_type === 'human'){  this.DOM_manipulation.removeAttributes(); }
        this.DOM_manipulation.toggleStartResetButtonVisibility();
        this.DOM_manipulation.togglePlayButtonVisibility();
        this.DOM_manipulation.updateStartResetValue("Start!");


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
        j=second_index+1;
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
        let first_index=0, second_index =0, element_id = evt.target.id;
        if(!this.check_if_occupied(element_id)){
           // evt.target.innerText=this.players[this.current_player].x_or_o;
            this.DOM_manipulation.updateGridSquare(element_id,this.players[this.current_player].x_or_o)
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
                this.GameFinished(this.players[this.current_player].player_type);
            }
            else{
                this.nextPlayer();
                if(this.players[this.current_player].player_type==="computer"){
                    this.DOM_manipulation.removeAttributes();
                    setTimeout(this.computerSelectSquare, 2000);
                }
            }
        }
       



    }
   

}
let mygame = new Game();

function start_reset(evt){
   
    if(evt.target.value==="Start!"){
       

        if(!mygame.DOM_manipulation.humanVHumanRadioButtonChecked() && !mygame.DOM_manipulation.humanVComputerRadioButtonChecked()){
            alert("Please Select a game mode!");
        }
        else if(mygame.DOM_manipulation.humanVHumanRadioButtonChecked || mygame.DOM_manipulation.humanVComputerRadioButtonChecked()){

            if(mygame.DOM_manipulation.humanVHumanRadioButtonChecked()){
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
                mygame.game_mode="human_human";
                mygame.DOM_manipulation.toggleHumanHumanRadioButtonValue(false);
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
                mygame.game_mode="computer_human"
                mygame.DOM_manipulation.toggleHumanComputerRadioButtonValue(false);
            }

            if(mygame.game_in_progress){
          
                mygame.game_over=false;
    
                //DOM manipulation
                mygame.DOM_manipulation.addAttributes();
                mygame.DOM_manipulation.hideRadioButtons();
                mygame.DOM_manipulation.updateStartResetValue("Restart!");
                mygame.DOM_manipulation.updatePlayerTurn("It is "+ mygame.players[mygame.current_player].x_or_o+"'s turn.");
                
            }
            if(mygame.players[mygame.current_player].player_type==='computer'){
                mygame.DOM_manipulation.removeAttributes();
                setTimeout(mygame.computerSelectSquare, 2000);
               
            }
        }
       
    }
    else if(evt.target.value==="Restart!"){
        mygame.reset_game();


        // DOM manipulation
        mygame.DOM_manipulation.removeAttributes();
        mygame.DOM_manipulation.setGridBlank();
        mygame.DOM_manipulation.visibleRadioButtons();
        evt.target.value="Start!"
    }

}


window.addEventListener('load', function(){
    mygame.DOM_manipulation = new DOM_manipulation();
    mygame.reset_game();
    mygame.DOM_manipulation.togglePlayButtonVisibility();
    document.getElementById('start_reset').addEventListener('click', start_reset);
    document.getElementById('play_again').addEventListener('click', function(){
       mygame.DOM_manipulation.setGridBlank();
       mygame.DOM_manipulation.togglePlayButtonVisibility();
       mygame.DOM_manipulation.toggleStartResetButtonVisibility();
       mygame.DOM_manipulation.visibleRadioButtons();
    });
});