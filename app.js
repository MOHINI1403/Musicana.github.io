const play=document.getElementById('play');
const pause=document.getElementById('pause');
const music=document.querySelector("audio");
const img=document.querySelector("img");
let music_container=document.querySelector(".music_container");
const title=document.getElementById("title");
const artist=document.getElementById("artist");
const prev=document.getElementById('prev');
const next=document.getElementById('next');
let progress=document.getElementById('progress');
let total_duration=document.getElementById('duration');
let total_currentTime=document.getElementById('current_time');
const progress_div=document.getElementById('progress_div');

//Object array of Songs
const songs=[{name:"momo-1",title:"Jee Le Zara",artist:"Vishal Dadlani"},{name:"momo-2",title:"Senorita",artist:"Shawn Mendes"},{name:"momo-3",
title:"Faded",artist:"Alan Walker"},{name:"momo-4",title:"Night Changes",artist:"One Direction"}];

let isPlaying=false;//Function to check weather the song is currently playing or not

const playMusic= () => {
    music.play();
    play.classList.replace('fa-play','fa-pause');
    img.classList.add('anime');
    isPlaying=true;
    


    //music_container.style["boxShadow"]="0 2px 2px rgba(0,0,0,0,0.07)";
    
    


};

//for pause function
const pauseMusic= () => {
    isPlaying=false;
    music.pause();
    play.classList.replace('fa-pause','fa-play');
    img.classList.remove('anime');
    
    

};

play.addEventListener('click',()=>{
    if(isPlaying){
        pauseMusic();


    }
    else{
        playMusic();
    }
});
const loadSongs=(songs)=>{

    title.textContent=songs.title;
    artist.textContent=songs.artist;
    
    music.src="music/"+songs.title+".mp3";
    
    img.src="images/"+songs.title+".jpg";



};
let songIndex=0;

const nextSong=()=>{
    
    songIndex=(songIndex+1)%songs.length;
    loadSongs(songs[songIndex]);
    playMusic();


};

const prevSong=()=>{
    
    songIndex=(songIndex-1+songs.length)%songs.length;
    loadSongs(songs[songIndex]);
    playMusic();
    
}

/*Progress JS Work*/
music.addEventListener('timeupdate',(event)=>{
    /*WE need to fetch he current time and duration*/
    const { currentTime, duration }=event.srcElement;
    

    let progress_time=(currentTime/duration)*100;
    progress.style.width=`${progress_time}%`;
    
    /*Music duration Update*/
    let min_duration=Math.floor(duration / 60);
    let sec_duration=Math.floor(duration % 60);
    let tot_duration=`${min_duration}:${sec_duration}`;
    if(sec_duration<10){
        tot_duration=`${min_duration}:${sec_duration}0`;
    }

    
    if(duration){
        total_duration.textContent=`${tot_duration}`;

    }
    //Current Duration update
    let min_currentTime=Math.floor(currentTime/60);
    let sec_currentTime=Math.floor(currentTime%60);

    let tot_currentTime=`${min_currentTime}:${sec_currentTime}`;
    if(sec_currentTime<10){
        tot_currentTime=`${min_currentTime}:0${sec_currentTime}`;
    }
    if(currentTime){
        total_currentTime.textContent=`${tot_currentTime}`;
    }


});

/*Progress OnClick Functionality*/
progress_div.addEventListener('click',(event)=>{
    const{duration}=music;//Object Destructuring
    

    
    let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
    music.currentTime=move_progress;//This will be the new value of time
    
})
/*When the current songs end loop the nextSong*/
music.addEventListener("ended",nextSong);
//Functionality for next button
next.addEventListener('click',nextSong);
//Functionality for prev button
prev.addEventListener('click',prevSong);










