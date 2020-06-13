export default function generateRandomArray(size: number): number[] {
  const randomArr = [];
  for (let i = 0; i < size; i++) {
    randomArr.push(randomIntFromInterval(5, 400))
  }
  return randomArr;
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
