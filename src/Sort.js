import { range, shuffle } from "lodash";
import React from "react";
import { App, clear, done, snapshot } from "./sort-visualizer";

import "./sort.css";

function sort(nums) {
  // do cool stuff here
  let swapped;
  let iterations = 0;
  do {
    swapped = false;
    for (let i = 0; i < nums.length - 1 - iterations; i++) {
      if (nums[i] > nums[i + 1]) {
        const temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        swapped = true;
        snapshot(nums);
      }
    }
    iterations++;
  } while (swapped);
  // call snapshot any time you do anything to the nums
  // it's okay if you call it with duplicate value nums,
  // it will deduplicate for you
  snapshot(nums);
}

export default function SortComponent() {
  clear();
  sort(shuffle(range(10)));
  done();
  return <App />;
}
