

// levels 

levels = {
    'easy' : 500,
    'Medium' : 350,
    'Hard' : 150,
}



levels_btns = document.querySelectorAll('.levels input');
overlayer = document.querySelector('.overlayer')

levels_btns.forEach( btn =>{
    btn.addEventListener('click',(e)=>{
        overlayer.remove()
        MoveRaw( levels[ btn.value ] )
    })
})


// Mems
var ok = new Audio()
ok.src = 'reactions/ok.MP3'

var lose_video = document.querySelector('video');

// Global Variables 
var bird = document.querySelector('.bird');
current_y = 0;
var view = document.querySelector('.view')
let result = 0;
var result_element = document.querySelector('.result');


// raw varibales
var raw = document.querySelector('.raw');
var tunnel = raw.querySelector('.tunnel');
let raw_x ;
let tunnel_y ;
let tunnel_y_choices = [0,50,100,150,200,250,300,350,400,450,500,550,600];


function RandomTunnelPosition (){

    tunnel_y =  tunnel_y_choices[Math.floor(Math.random() * tunnel_y_choices.length )];
    tunnel.style.bottom = tunnel_y + 'px' ;
    
}



// Move The Raws
function MoveRaw ( level ){

    raw_x = 0;
    
    setInterval(function(){
        
        raw_x = raw_x  + 50
        
        if (raw_x < 1200){
            raw.style.right = raw_x + 'px' ;
        }else{
            
            raw_x = 0;
            RandomTunnelPosition();
            
        }
        
        
    },level)
    

}


// Check Tunnel & bird
setInterval(function(){
    
    result_element.textContent = result;

    if ( raw_x == 600 && tunnel_y == current_y ){
        result++
        ok.play()
    }
    else if ( raw_x == 600 && tunnel_y != current_y ){

        result--
    }


        if ( result < 0 ){
        lose_video.classList.add('active')
        lose_video.play()
        result = 0;
    }
    
    //window.location.reload()
    
},100)


lose_video.onended = function(){
    window.location.reload()
}

// Move The Bird
function GO (where){

    
    if ( where == 'up'){
        
        current_y = current_y + 50;
        
        if ( current_y <= 600 ){
            bird.style.bottom = current_y + 'px'
        }else{
            current_y = 600
        }
    }
    
    else if (where == 'down') {


        current_y = current_y - 50;
        
        if ( current_y >= 0 ) {
            bird.style.bottom = current_y + 'px'
        }else{
            current_y = 0;
        }

    }

    
}


// Key Listener
document.addEventListener('keydown',(key)=>{

    if ( key.code == 'KeyW'){
        GO('up')
    }

    else if ( key.code == 'KeyS') {
        GO('down')
    }


})


// ReCreate Tunnel
RandomTunnelPosition()
