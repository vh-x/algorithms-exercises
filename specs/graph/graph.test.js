// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example

  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/
const { getUser } = require("./jobs");

const findMostCommonTitle = (myId, degreesOfSeparation) => {
  // code goes here
  const queue = [myId];
  const visited = new Set(queue);
  const jobs = {};
  for (let i = 0; i <= degreesOfSeparation; i++) {
    const newQueue = [];
    while (queue.length) {
      const id = queue.shift();
      const { title, connections } = getUser(id);
      jobs[title] = (jobs[title] ?? 0) + 1;
      connections?.forEach((id) => {
        if (visited.has(id)) return;
        newQueue.push(id);
        visited.add(id);
      });
    }
    queue.push(...newQueue);
  }

  let mostCommonTitle;

  for (const title in jobs) {
    if (!mostCommonTitle || jobs[title] > jobs[mostCommonTitle]) {
      mostCommonTitle = title;
    }
  }
  return mostCommonTitle;
};

// unit tests
// do not modify the below code
describe.skip("findMostCommonTitle", function () {});

describe.skip("extra credit", function () {
  test("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
    expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
  });
});
