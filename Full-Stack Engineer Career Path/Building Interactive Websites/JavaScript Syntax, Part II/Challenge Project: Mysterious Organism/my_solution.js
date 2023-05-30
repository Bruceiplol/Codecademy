// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    mutate() {
      let idx = Math.floor(Math.random()*15)
      let original = arr[idx]
      do {
        arr[idx] = returnRandBase()
      } while (arr[idx] === original)
      return this.dna
    },
    compareDNA (pAequor) {
      let count = 0
      for (let i = 0; i < this.dna.length; i++) {
        if (pAequor.dna[i] === this.dna[i]) {
          count++
        }
      }
      console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${(count/this.dna.length*100).toFixed(2)}% DNA in common`)
    },
    willLikelySurvive () {
      let count =0
      for (let i = 0; i < this.dna.length; i++) {
        this.dna[i] === 'C' || this.dna[i] === 'G' ? 
        count++ : null
      }
      return (count/this.dna.length) >= 0.6
    }
  }
}

const survivingSpecimen = [];
let id = 1;
while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(id, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
    id++;
}

console.log(survivingSpecimen)



//tesing
/*
testing1 = pAequorFactory(1, mockUpStrand())
//console.log(testing1)
//console.log(testing1.mutate())
//testing2 = pAequorFactory(3, mockUpStrand())

console.log(testing1.dna)
//console.log(testing2.dna)
//console.log(testing1.compareDNA(testing2))
console.log(testing1.willLikelySurvive())
*/
