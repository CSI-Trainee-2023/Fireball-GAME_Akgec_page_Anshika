const canvas =document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player{
    constructor() {
        this.position = {
            x: canvas.width / 2 - this.width / 2,
            y:200
        }

        this.velocity = {
            x:0,
            y:0
        }

        const image = new Image()
        image.src ='./img/spaceship.png'
        image.onload = () => {

         const scale = 0.15
         this.image = image
         this.width = image.width *scale
         this.height = image.height *scale
         this.position = {
            x: canvas.width / 2 - this.width / 2,
            y: canvas.height - this.height -20
          }
         
        }
     }
     draw() {

        //c.fillStyle ='red'
        //c.fillRect(this.position.x , this.position.y , this.width , this.height)

        if(this.image)
        c.drawImage(this.image , this.position.x , this.position.y , this.width , this.height)
     
    }
     

       update(){
         if(this.image) {
         this.draw()
         this.position.x += this.velocity.x
         }
       } 
}
 // adding the shooting projectiles
class Projectile{
    constructor({position , velocity}){
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }
    draw(){
        //since only arc pissible using math to create circle
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        //chooosing color for projectile
        c.fillStyle = 'red'
        c.fill()

        c.closePath()
    }
    // for moving prjectile making update

    update(){
        this.draw()
        //moving projectile (adding velocity)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


class Invader{
    constructor({position}) {
        this.position = {
            x: canvas.width / 2 - this.width / 2,
            y:200
        }

        this.velocity = {
            x:0,
            y:0
        }

        const image = new Image()
        image.src ='./img/enemy.png'
        image.onload = () => {

         const scale = 0.03    //enemy size
         this.image = image
         this.width = image.width *scale
         this.height = image.height *scale
         this.position = {
            x: position.x,
            y: position.y
          }
         
        }
     }
     

       
     
     draw() {

        //c.fillStyle ='red'
        //c.fillRect(this.position.x , this.position.y , this.width , this.height)

        if(this.image)
        c.drawImage(this.image , this.position.x , this.position.y , this.width , this.height)
     
    }
     

       update(){
         if(this.image) {
         this.draw()
         this.position.x += this.velocity.x
         this.position.y += this.velocity.y
         
         }
       } 
}

//for making multiple enemies
class Grid{
    constructor(){
        this.position = {
            x: 0,
            y: 0
        }
        
        this.velocity = {
            x: 0,
            y: 0
        }

        this.invaders = []  //storing new invader in the array "grid" / populating

        const rows = Math.floor(Math.random() * 5 + 2)
        const columns = Math.floor(Math.random() * 10 + 4)

        for (let x =0 ; x < columns ; x++){     //for ships in a columns
            for (let y =0 ; y < rows; y++){    //in the rows
        this.invaders.push(new Invader({position: {
        x: x*50,
        y: y*50

        }}))
    }}

        console.log(this.invaders)
    }
    update()  {}

}
         





const player = new Player()
// const for shooting multiple projectiles [empyt array]
const projectiles = []

const grids =[new Grid()]

//for add keyboard functinality
const keys ={
    a: {
        pressed:false
    },
    d: {
        pressed:false
    },
    space: {
        pressed:false
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle ='black'
    c.fillRect(0,0,canvas.width, canvas.height)
    

     player.update()

     //actually addign multiple projectiles

     projectiles.forEach((projectile, index )=> {
          //splice for removing shot projectiles from the array
        if (projectile.position.y + projectile.radius <= 0){
           setTimeout( () => {                       //using timeout to prevent flashing occuring on the screen
            projectiles.splice(index,1)
        },0)
        }
        
        else{
            projectile.update()
        }
        projectile.update() // calling update
     })

     grids.forEach((grid) =>{
        grid.update()
        grid.invaders.forEach(invader => {
            invader.update()
        })
     })


    //moving player
    if (keys.a.pressed  && player.position.x >=0 ){
    player.velocity.x = -7
    
    } else if(keys.d.pressed && player.position.x +player.width <=canvas.width){
     player.velocity.x= 7
    }else {
    player.velocity.x = 0
    }

}

animate()

addEventListener('keydown',({key}) => {
    switch (key){
        case 'a':
            console.log('left')
        
            keys.a.pressed = true
         break
        case 'd':
            console.log('right')
            keys.d.pressed = true
         break

         // for shooting projectiles in case od spacebar
        case ' ':
            console.log('space')
            projectiles.push(
                new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity:{
                    x: 0,
                    y: -10
                }
            }))

        // console.log(projectiles)   
         break

    }
})

addEventListener('keyup',({key}) => {
    switch (key){
        case 'a':
            console.log('left')
        
            keys.a.pressed = false
         break
        case 'd':
            console.log('right')
            keys.d.pressed = false
         break
        case ' ':
            console.log('space')
         break

    }
})


