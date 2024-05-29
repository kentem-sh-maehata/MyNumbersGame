'user strict'

{
  class Panel{
    private el:HTMLElement
    constructor(){
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
      if(this.el.textContent && Game.currentNum === parseInt(this.el.textContent,10)){
        this.el.classList.add('pressed')
        Game.currentNum++
        if(Game.currentNum === 4)
          clearTimeout(Game.timeoutId)
      }
    }
  }
  class Board{
    private panels:Panel[]
    constructor(){
      this.panels = []
      for(let i = 0; i < 4;i++){
        this.panels.push(new Panel())
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
    private board = new Board()
    public static currentNum = 0
    public static timeoutId:any = undefined
    private startTime:any = undefined
    constructor(){
      
      const btn = document.getElementById('btn')
      btn?.addEventListener('click',()=>{
        this.start()
      })
      
    }
    start(){
      if(typeof Game.timeoutId !== 'undefined'){
        clearTimeout(Game.timeoutId)
      }
      Game.currentNum = 0
      this.board.activate()
      
      this.startTime = Date.now()
      this.runTimer()
    }
    runTimer(){
      const timer = document.getElementById('timer')
      if(timer)
        timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2)
      
      Game.timeoutId = setTimeout(() => {
        this.runTimer();
      },10)
    }
  }

  new Game()
  
  
  
}