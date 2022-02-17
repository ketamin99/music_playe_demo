/**
 * render playlistt             v
 * render current songg         v
 * 
 * animation cd smaller         v
 * 
 * play pause
 * 
 * cd rottattion                
 * next prev
 * random
 * repeat
 * play when clcih
 * 
 * 

*/

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')
const cd = $('.cd')
const header = $('.header')
const cdThumb = $('.cd-thumb')
const currentSongName = $('.header h3')
const audio = $('#audio')
const player = $('.player')
const togglePlayBtn = $('.btn-toggle-play')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const preBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const app = {
    isPlaying: false,
    currentIndex: 0,
    isRandom: false,
    isRepeat : false,
    songs : [
        {
            name: 'GANG GANG',
            singer: 'JACKBOYS, Sheck Wes, Don Toliver, Luxury Tax 50 & Cactus Jack ',
            path: '/lesson_1/assets/songs/song1.mp3',
            image: '/lesson_1/assets/img/download.jpg'
        },
        {
            name: 'GATTI',
            singer: 'JACKBOYS, Pop Smoke, Travis Scott',
            path: '/lesson_1/assets/songs/song2.mp3',
            image: '/lesson_1/assets/img/download2.jpg'
        },
        {
            name: 'DIOR',
            singer: 'POP SMOKE',
            path: '/lesson_1/assets/songs/song3.mp3',
            image: '/lesson_1/assets/img/download3.jpg'
        },
        {
            name: 'Chia Cách Bình Yên',
            singer: 'Bùi Anh Tuấn',
            path: '/lesson_1/assets/songs/song4.mp3',
            image: '/lesson_1/assets/img/download4.jpg'
        },
        {
            name: 'Một Thủa Yêu Người',
            singer: 'Vicky Nhung',
            path: '/lesson_1/assets/songs/song5.mp3',
            image: '/lesson_1/assets/img/download5.jpg'
        },
        {
            name: 'Ít Nhưng Dài Lâu Remix',
            singer: 'Đại Mèo',
            path: '/lesson_1/assets/songs/song6.mp3',
            image: '/lesson_1/assets/img/download6.jpg'
        },
        {
            name: 'Chưa Bao Giờ',
            singer: 'Bùi Anh Tuấn',
            path: '/lesson_1/assets/songs/song7.mp3',
            image: '/lesson_1/assets/img/download7.jpg'
        },
        {
            name: 'Chuyện Như Chưa Bắt Đầu',
            singer: 'Bùi Anh Tuấn',
            path: '/lesson_1/assets/songs/song8.mp3',
            image: '/lesson_1/assets/img/download8.jpg'
        },
        {
            name: 'Nơi Tình Yêu Kết Thúc',
            singer: 'Bùi Anh Tuấn',
            path: '/lesson_1/assets/songs/song9.mp3',
            image: '/lesson_1/assets/img/download9.jpg'
        },
    ],
    defineObjectProperties: function(){
        Object.defineProperty(this, "currentSong", {
            get: function(){return this.songs[this.currentIndex]}
        })
    },
    handleEvents: function(){
        const  cdWidth = cd.offsetWidth
        const _this = this

        // Handle cd animation
        document.onscroll = function(){
            let scroll = window.scrollY
            let newCdWidth = cdWidth - scroll 

            if (newCdWidth < 0) {
                cd.style.width = 0
            }else{
                cd.style.width = newCdWidth + "px"
            }
            
        }
        // Handle cd Rotation
        const rotateAnimation =  cdThumb.animate(
            {transform: 'rotate(360deg)'},
            {
                duration: 15000,
                iterations: Infinity
            })   
            rotateAnimation.pause()
        
        // Handle play btn
        togglePlayBtn.onclick = function(){
            if (_this.isPlaying) {
                audio.pause()
            }else{  
                audio.play()
            }
        }
        // Handle onplay event
        audio.onplay = function(){
            player.classList.add('playing')
            _this.isPlaying = true
            rotateAnimation.play()

        }
        audio.onpause = function(){
            player.classList.remove('playing')
            _this.isPlaying = false
            rotateAnimation.pause()
        }
        // Handle progress slider
        audio.ontimeupdate = function(){
            if (audio.currentTime,audio.duration) {
                progress.value = (audio.currentTime/audio.duration)* 100
            }
            
        }
        // Handle slide to change progress
        progress.onchange = function(){
        
            audio.currentTime = (progress.value * audio.duration)/100
        }
        // Handle nextBtn 
        nextBtn.onclick = function(){
            if (_this.isRandom === true && _this.isRepeat === false ) {
                _this.randomSong()
                _this.loadCurrentSong()
                audio.play()
            }else{
                _this.nextSong()
                audio.play()
            }
            
        }
        // Handle previous Button
        preBtn.onclick = function(){
            _this.prevSong()
            audio.play()
        }


        // Handle random Btn
        randomBtn.onclick = function(){ 
            repeatBtn.classList.remove('active')         
            _this.isRepeat = false

            randomBtn.classList.toggle('active',)
            _this.isRandom = !_this.isRandom
        }

        // Handle repeat button
        repeatBtn.onclick = function(){
            randomBtn.classList.remove('active')            
            _this.isRandom = false
            
            repeatBtn.classList.toggle('active')
            _this.isRepeat = !_this.isRepeat
        }

        // 
        audio.onended = function(){
            
            if (_this.isRandom === true&& _this.isRepeat === false) {
                _this.randomSong()
                _this.loadCurrentSong()
                audio.play()
            }else if(_this.isRandom === false&& _this.isRepeat === true){
                _this.repeatSong()
                
            }else{
                _this.nextSong()
                audio.play()
            }
        }
    },
    
    
        
   
    loadCurrentSong: function(){
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        currentSongName.innerText = this.currentSong.name
        audio.src = this.currentSong.path
    },
    // Render playlist
    renderPlaylist : function(){
        let htmls = this.songs.map(song => {
            return `
            <div class="song ">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('')
        

    },
    nextSong: function(){
        if (this.currentIndex === this.songs.length -1 ) {
            this.currentIndex = 0
        }else {
            this.currentIndex ++ 
        }
        this.isPlaying = true
        this.loadCurrentSong()
        


    },
    prevSong: function(){
        if (this.currentIndex === 0) {
            this.currentIndex = this.songs.length -1
        }else {
            this.currentIndex --
        }
        this.isPlaying = true
        this.loadCurrentSong()
    },
    randomSong: function(){
        
        let newIndex
        do {
            newIndex = Math.floor(Math.random()* this.songs.length) 
        }while(newIndex === this.currentIndex )
        this.currentIndex = newIndex
        this.loadCurrentSong()
       
    },
    repeatSong: function(){
        this.loadCurrentSong()
        audio.play()
    },



    // Start function
    start: function(){
        // Define Object Property
        this.defineObjectProperties()

        // Render playlist
        this.renderPlaylist()

        // Handle event
        this.handleEvents()

       

        this.loadCurrentSong()
        audio.volume = 0.3
    },
}

   
app.start()
