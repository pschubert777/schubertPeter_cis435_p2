

function start(evt){
    if(evt.target.hasAttribute('class')){
        evt.target.removeAttribute('class');
    }
    else{
        evt.target.setAttribute('class', 'change_color');
    }
}


window.addEventListener('load', function(){
    const blocks=document.getElementsByTagName('p');
    for (let index = 0; index < blocks.length; index++) {
        blocks[index].addEventListener('click',start);
    
    }
/*
 document.getElementById('q1').addEventListener('click',start);
 document.getElementsByTagName('main')[0].addEventListener('click', function(){

console.log('hello');
 });

*/
});