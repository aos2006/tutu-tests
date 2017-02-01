export default class Algorithm {
  constructor () {
    this.isMakingHalfCount = 6;
    this.pancakeItems = [
        {isMakingHalf: 0},
        {isMakingHalf: 0},
        {isMakingHalf: 0}
        ]
    this.makingTime = 60000;
  }

  init() {
    let i = 0;
    while (i < this.isMakingHalfCount) {
      let [first, second] = this.pancakeItems;
      if (first.isMakingHalf === 2 || second.isMakingHalf === 2) break;
      first.isMakingHalf += 1;
      second.isMakingHalf +=1;
      this.pancakeItems.push(this.pancakeItems.shift());
      ++i;
    }
    let result = `Для того, что бы пожарить 3 блина, на двух сковородках - потребуется 
${(i * this.makingTime / 1000) / 60} минуты. Кол-во итераций = ${i}`;
    return result;

    }
}
