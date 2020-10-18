
class Game{
constructor(){
    this.game_in_progress =false;
    this.game_over=false;
    this.players= new Array();

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
        else{

            mygame.
        }


    }
    else if(evt.target.value==="Reset!"){

    }

}


window.addEventListener('load', function(){

    document.getElementById('start_reset').addEventListener('click', start_reset);
    const blocks=document.getElementById('grid').getElementsByTagName('p');
    for (let index = 0; index < blocks.length; index++) {
        blocks[index].addEventListener('click',color_change);
    
    }
/*
 document.getElementById('q1').addEventListener('click',start);
 document.getElementsByTagName('main')[0].addEventListener('click', function(){

console.log('hello');
 });

*/
});