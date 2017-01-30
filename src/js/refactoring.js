export default class Refactoring {
  getSubstring = ({str, subStr1, subStr2}) => {
    if (str === '') return -1;
    let subStrPosition1 = str.lastIndexOf(subStr1, str.length - 1);
    let subStrPosition2 = str.lastIndexOf(subStr2, str.length - 1);

    return subStrPosition1 !== -1 ? subStrPosition1 :
        subStrPosition2 !== -1 ? subStrPosition2 :
            subStrPosition1 === subStrPosition2 ? subStrPosition1 : -1;

  }

  drawRating = (vote) => {
    if (vote > 0 && vote <= 100) return Math.ceil(vote / 20);
    throw new Error('Некорректное значение');
  }

  init() {
    console.log(
        'Refactoring task 1',
        this.getSubstring({str: '12345560', subStr1: '0', subStr2: '0'})
    )

    console.log(this.drawRating(0));
    console.log(this.drawRating(1) );
    console.log(this.drawRating(50));
    console.log(this.drawRating(99));
    console.log(this.drawRating(-1));
  }
}
