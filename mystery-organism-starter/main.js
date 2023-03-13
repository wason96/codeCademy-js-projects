 //stores used IDs
const specimenId = [];

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//create a factory function pAequorFactory() that receives two parameters.
// The first parameter is a number (no two organisms should have the same number).
// The second parameter is an array of 15 DNA bases.
// pAequorFactory() should return an object that contains the properties specimenNum and dna that correspond to the parameters provided.
const pAequorFactory = (specNum, dnaChain) => {
  if (specimenId.indexOf(specNum) !== -1){
    console.log(`The specimen number ${specNum} already exists. Please re-run with another ID.`);
  } else {
    specimenId.push(specNum);
    return {
      //specimen object properties
      _specimenNum: specNum,
      _dna: dnaChain,

      //specimen mutate method. changes a random base from the dna chain
      mutate () {
        //old dna
        const oldDna = this._dna.slice();

        //Random base to be mutated
        const randBaseIndex = Math.floor(Math.random() * this._dna.length);
        const randBase = this._dna[randBaseIndex];

        //Mutate until different
        while (this._dna[randBaseIndex] === randBase){
          this._dna[randBaseIndex] = returnRandBase();
        }

        //Show old and new DNA chains
        console.log(`The specimen ${this._specimenNum} has mutated! 
        It's previous DNA chain was: ${oldDna}.
        The new one is: ${this._dna}.`);

        //Returns new chain
        return this._dna;
      },

      //compares the dna of this object with the dna of the object received as an argument
      compareDna (pAequor) {
        let sharedBases = 0;
        for (let i = 0; i < this._dna.length; i++) {
          if(this._dna[i] === pAequor._dna[i]) {
            sharedBases ++;
          }
        }
        const sharedPercent = (sharedBases / 15) * 100;
        console.log(`Specimen #${this._specimenNum} and Specimen #${pAequor._specimenNum} have ${sharedPercent}% DNA in common.`);
      },

      //Checks if the dna chain has at least 60% C or G bases. If true, the specimen is more likely to survive. Returns true or false
      willLikelySurvive () {
        let numOfCorG = 0;
        for (let i = 0; i < this._dna.length; i++) {
          if(this._dna[i] === 'C' || this._dna[i] === 'G'){
            numOfCorG ++;
          }         
        }
        if ((numOfCorG/this._dna.length) * 100 >= 60){
          return true;
        } else {
          return false;
        }
      }

    }
  }
};


//Create 30 instances of pAequor that can survive and store them in an array
let specArray = [];
let id;
if(specArray.length === 0){
  id = 1;
} else{
  id = specArray[specArray.length - 1];
}

while (specArray.length < 30){
  
    const spec = pAequorFactory(id, mockUpStrand());
    if (spec.willLikelySurvive()){
      specArray.push(spec);
      specimenId.push(spec._specimenNum);
      id ++;
    } else {
      id ++;
      continue;
    }

}


//Testing area
for(i = 0; i < specArray.length; i ++){
  console.log(`Specimen ${specArray[i]._specimenNum}: ${specArray[i].willLikelySurvive()}`);
}








