const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field=[[]], charLocation={}) {
    this.field = field
    this.locationX = charLocation.x
    this.locationY = charLocation.y
  }

  play() {
    let playing = true
    console.log('Welcome to the Game: Find Your Hat')
    while (playing) {
      this.print()
      this.instrutions()
      
      if (!this.inBound()) {
        console.log('You dropped out of bounds!')
        playing = false
      } else if (this.isHole()) {
        console.log('Sorry, you fell down a hole!')
        playing = false
      } else if (this.isHat()) {
        console.log('Congrats, you found your hat!')
        playing = false
      }

      this.field[this.locationY][this.locationX] = pathCharacter

    }
    
  }

  inBound() {
    return (
      this.locationY >= 0 &&
      this.locationY < this.field.length &&
      this.locationX >= 0 &&
      this.locationX < this.field[this.locationY].length
    )
  }

  isHole() {
    return this.field[this.locationY][this.locationX] == hole
  }

  isHat() {
    return this.field[this.locationY][this.locationX] == hat
  }

  instrutions() {
    const ans = prompt('Which direction would you want to move? ').toUpperCase()
    switch (ans) {
      case 'U': 
        this.locationY -= 1
        break
      
      case 'D': 
        this.locationY += 1
        break
      
      case 'L': 
        this.locationX -= 1
        break
      
      case 'R': 
        this.locationX += 1
        break

      default:
        console.log('Please Enter U, D, L or R')
        this.instrutions()
        break
    }
  }
  
  print() {
    for (let i = 0; i < this.field.length;i++) {
      let display = this.field[i].join('')  
      console.log(display)

    }
      
  }

  static generateField(height, width, difficulty = 0.1){
    const field = new Array(height).fill(0).map(column => new Array(width))
    
    for (let y=0; y<height;y++) {
      for(let x=0; x<width;x++) {
        const prob = Math.random()
        field[y][x] = prob > difficulty ? fieldCharacter : hole
      }
    }
    
    const hatLocation = {
      x: Math.floor(Math.random()*width),
      y: Math.floor(Math.random()*height)
    }

    field[hatLocation.y][hatLocation.x] = hat

    const charLocation = {
      x: Math.floor(Math.random()*width),
      y: Math.floor(Math.random()*height)
    }

    if (charLocation === hatLocation) {
      charLocation.x = Math.floor(Math.random()*width)
      charLocation.y = Math.floor(Math.random()*height)
    }

    field[charLocation.y][charLocation.x] = pathCharacter

    return {field, charLocation}
  }

}

const field = Field.generateField(5,5,0.3);
const charLocation = field.charLocation
const myField = new Field(field.field, charLocation)

myField.play()

