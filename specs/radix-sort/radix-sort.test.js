/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

function getDigit(num, place) {
  const string = num.toString();
  return string.length > place ? +string.at(-place - 1) : 0;
}

function getLongestDigits(arr) {
  let greatest = 0;
  for (let num of arr) {
    if (num > greatest) {
      greatest = num;
    }
  }
  let digits = 0;
  while (greatest / 10 ** digits >= 1) {
    digits++;
  }
  return digits;
}

function radixSort(array) {
  // code goes here
  const digits = getLongestDigits(array);
  const buckets = [];
  for (let i = 0; i < 10; i++) {
    buckets.push([]);
  }

  for (let i = 0; i < digits; i++) {
    while (array.length) {
      const num = array.shift();
      const bucketIndex = getDigit(num, i);
      buckets[bucketIndex].push(num);
    }
    for (const bucket of buckets) {
      while (bucket.length) {
        array.push(bucket.shift());
      }
    }
  }
  return array;
}

// unit tests
// do not modify the below code
describe.skip("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });
});
