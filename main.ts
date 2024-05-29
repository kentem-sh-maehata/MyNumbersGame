'use strict'

{
  class Panel{
    private el:HTMLElement
    private _game
    constructor(game:Game){
      this._game = game
      this.el = document.createElement('li')
      this.el.classList.add('pressed')
      this.el.addEventListener('click',()=>{
        this.check()
      })
    }
    getEl(){
      return this.el
    }
    activate(num:number){
      this.el.classList.remove('pressed')
      this.el.textContent = num.toString()
    }
    check(){
      if(this.el.textContent && this._game.getCurrentNum() === parseInt(this.el.textContent,10)){
        this.el.classList.add('pressed')
        this._game.addCurrentNum()
        if(this._game.getCurrentNum() === this._game.getLevel() ** 2)
          clearTimeout(this._game.getTimeoutId())
      }
    }
  }
  class Board{
    private panels:Panel[]
    private _game:any
    constructor(game:Game){
      this.panels = []
      this._game = game
      for(let i = 0; i < this._game.getLevel()**2;i++){
        this.panels.push(new Panel(this._game))
      }
      this.setup()
    }
    setup(){
      const board = document.getElementById('board')
      this.panels.forEach(panel =>{
        board?.appendChild(panel.getEl())
      })
    }
    activate(){
      let nums:number[] = []
      for(let i = 0; i < this._game.getLevel()**2;i++){
        nums.push(i)
      }
      this.panels.forEach(panel=>{
        const num = nums.splice(Math.floor(Math.random()*nums.length),1)[0]
        panel.activate(num)
      })
    }
  }

  class Game{
    private board:any
    private currentNum = 0
    private timeoutId:any = undefined
    private startTime:any = undefined
    private level:number|any
    constructor(level:number){
      this.level = level
      this.board = new Board(this)
      const btn = document.getElementById('btn')
      btn?.addEventListener('click',()=>{
        this.start()
      })
      this.setup()
    }
    setup(){
      const container = document.getElementById('container')
      const PANEL_WIDTH = 50
      const BOARD_PADDING = 10
      if(container)
        container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px'
    }
    start(){
      if(typeof this.timeoutId !== 'undefined'){
        clearTimeout(this.timeoutId)
      }
      this.currentNum = 0
      this.board.activate()
      
      this.startTime = Date.now()
      this.runTimer()
    }
    runTimer(){
      const timer = document.getElementById('timer')
      if(timer)
        timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2)
      
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      },10)
    }

    addCurrentNum(){
      this.currentNum ++
    }
    getCurrentNum(){
      return this.currentNum
    }
    getTimeoutId(){
      return this.timeoutId
    }
    getLevel(){
      return this.level
    }

  }

  new Game(5)
}