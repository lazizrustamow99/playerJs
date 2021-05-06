let container = document.querySelector('.container');
class Movies {
  constructor(elem) {
    this.connection = document.querySelector(elem.connection);
    this.player = this.connection.querySelector('.player');
    this.video = this.connection.querySelector(".player-video");
    this.playBtn = this.connection.querySelector(".controls-btns__play");
    this.pauseBtn = this.connection.querySelector(".controls-btns__pause");
    this.videoTrack = this.connection.querySelector(".controls-line__track");
    this.controlsLine = this.connection.querySelector('.controls-line');
    this.videoNextForward = this.connection.querySelector(".controls-btns__forward");
    this.volumeUp = this.connection.querySelector('.controls-btns__volume_icons-up');
    this.volumeSlash = this.connection.querySelector('.controls-btns__volume_icons-slash');
    this.volumeLine = this.connection.querySelector('.controls-btns__volume_line');
    this.volumeLineTrack = this.connection.querySelector('.controls-btns__volume_line-track');
    this.videoExpand = this.connection.querySelector('.controls-btns__right_fullscreen-expand');
    this.videoCompress = this.connection.querySelector('.controls-btns__right_fullscreen-compress');
    this.videoWide = this.connection.querySelector('.controls-btns__right_rectangle-wide');
    this.videoLandscape = this.connection.querySelector('.controls-btns__right_rectangle-landscape');
    this.text = this.connection.querySelector('.text');
    

    this.video.addEventListener("timeupdate", () => this.loadTrack());
    this.playBtn.addEventListener("click", () => this.videoPlay());
    this.pauseBtn.addEventListener("click", () => this.videoPlay());
    this.video.addEventListener("click", () => this.videoPlay());
    this.videoNextForward.addEventListener("click", () => this.videoForward());
    this.videoExpand.addEventListener('click', ()=> this.playerFullscreen());
    this.videoCompress.addEventListener('click', ()=> this.playerFullscreen());
    this.videoWide.addEventListener('click', ()=> this.videoRectangle());
    this.videoLandscape.addEventListener('click', ()=> this.videoRectangle());

    this.video.addEventListener("dblclick", (e) => this.videoForwardFif(e));
    this.controlsLine.addEventListener('click',(e)=> this.speedClick(e));
    this.volumeUp.addEventListener('click', ()=> this.videoVolume());
    this.volumeSlash.addEventListener('click', ()=> this.videoVolume());
    
    this.volumeLine.addEventListener('click', (el)=> this.videoVolumeLine(el));
    this.volumeLineTrack.addEventListener('click', (el)=> this.videoVolumeLine(el));
    // this.volumeLine.addEventListener('wheel', (el)=> this.videoVolumeLine(el))
  }
  videoRectangle() {
    if (this.videoWide.classList.contains('hidden')) {
      this.videoWide.classList.remove('hidden');
      this.videoLandscape.classList.add('hidden');
      this.text.classList.add('hidden');
      
    }else {
      this.videoWide.classList.add('hidden');
      this.videoLandscape.classList.remove('hidden');
      this.text.classList.remove('hidden');
      
    }
    
  }
  
  videoVolumeLine(el) {
    this.video.volume = el.offsetX / 100;
    this.volumeLineTrack.style.width = `${this.video.volume * 100}%`;
    
  }
  playerFullscreen() {
    if (this.videoExpand.classList.contains('hidden')) {
      this.videoExpand.classList.remove('hidden');
      this.videoCompress.classList.add('hidden');
      document.exitFullscreen();
      container.style.maxWidth = '1140px';
      container.style.padding = '0px 15px'
      
    }else {
      this.videoExpand.classList.add('hidden');
      this.videoCompress.classList.remove('hidden');
      document.documentElement.requestFullscreen();
      container.style.maxWidth = '100%';
      container.style.padding = '0px'
    }
  }
  videoVolume () {
    if (this.volumeUp.classList.contains('hidden')) {
      this.volumeUp.classList.remove('hidden');
      this.volumeSlash.classList.add('hidden');
      this.video.volume = 1; 
    }else {
      this.volumeUp.classList.add('hidden');
      this.volumeSlash.classList.remove('hidden');
      this.video.volume = 0;

    }
  }
  
  speedClick(e){
    // console.log(this.video.currentTime/this.video.duration * 100);
    // console.log(e.offsetX / this.controlsLine.clientWidth * 100);
    // console.log(this.video.duration);
    // console.log(e.offsetX);
    // console.log(this.video.duration * e.offsetX);
    // console.log(this.video.duration * e.offsetX / this.controlsLine.clientWidth);
    // console.log(e.offsetX / this.controlsLine.clientWidth * this.video.duration);
    this.video.currentTime = this.video.duration *( e.offsetX / this.controlsLine.clientWidth * 100) / 100;
  }
  videoForwardFif(e) {
    console.log(e.offsetX);
   if (e.path[0].clientWidth / 2 <= e.offsetX) {
    this.video.currentTime = this.video.currentTime + 15;
   }else{
    this.video.currentTime = this.video.currentTime - 15;
   }


  }
  videoForward() {
    if (this.video.currentTime == this.video.duration) {
      this.video.currentTime = 0;
      this.videoPlay();
    } else {
      this.video.currentTime = this.video.currentTime + 15;
    }
  }
  videoPlay() {
    if (this.playBtn.classList.contains("hidden")) {
      this.playBtn.classList.remove("hidden");
      this.pauseBtn.classList.add("hidden");
      this.video.pause();
    } else {
      this.playBtn.classList.add("hidden");
      this.pauseBtn.classList.remove("hidden");
      this.video.play();
    }
  }
  loadTrack() {
    this.videoTrack.style.width = `${
      (this.video.currentTime / this.video.duration) * 100
    }%`;
  }
}
const video1 = new Movies({
  connection: ".player",
});
