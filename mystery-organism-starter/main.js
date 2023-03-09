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
const specimenId = []; //stores used IDs
// The second parameter is an array of 15 DNA bases.
// pAequorFactory() should return an object that contains the properties specimenNum and dna that correspond to the parameters provided.
const pAequorFactory = (specNum, dnaChain) => {
  if (specimenId.indexOf(specNum) !== -1){
    console.log(`The specimen number ${specNum} already exists. Please re-run with another ID.`);
  } else {
    specimenId.push(specNum);
    return {
      _specimenNum: specNum,
      _dna: dnaChain,
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
      }
    }
  }
};


//Testing area
const obj = pAequorFactory(1, mockUpStrand());

obj.mutate();









