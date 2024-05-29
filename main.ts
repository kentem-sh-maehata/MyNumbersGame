'user strict'

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
        if(this._game.getCurrentNum() === 4)
          clearTimeout(this._game.getTimeoutId())
      }
    }
  }
  class Board{
    private panels:Panel[]
    constructor(game:Game){
      this.panels = []
      for(let i = 0; i < 4;i++){
        this.panels.push(new Panel(game))
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
      const nums = [0, 1, 2, 3,]
      this.panels.forEach(panel=>{
        const num = nums.splice(Math.floor(Math.random()*nums.length),1)[0]
        panel.activate(num)
      })
    }
  }

  class Game{
    private board = new Board(this)
    private currentNum = 0
    private timeoutId:any = undefined
    private startTime:any = undefined
    constructor(){
      // let board = new Board(this)
      const btn = document.getElementById('btn')
      btn?.addEventListener('click',()=>{
        this.start()
      })
      
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

  }

  new Game()
  
  
  
}