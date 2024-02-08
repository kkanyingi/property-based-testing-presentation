# Example-based tests

Before we jump into property tests, let’s set the scene. Imagine we’re writing a To Do application.
And we’d like to add a feature where we move completed tasks to an archive once they’re older than one minute.

```js
// Some date constants to make life easier. We're using timestamps
// rather than date objects to keep the maths simple.
const START = 1636521855000;
const ONE_MINUTE = 60000;
const ONE_HOUR = 60 * ONE_MINUTE;

// We create some example data. All tasks have, at minimum,
// both a created date and a title. The completed time is optional.
// A task that has a missing or undefined completed field is not
// yet done.
const newTask = {
  created: START - ONE_MINUTE,
  title: "A mighty task of spectacular derring-do",
  completed: START,
};

// We intend to pass START as our reference time. So we make an
// old task that is was completed 59 minutes ago.
const oldCompletedTask = {
  created: START - ONE_HOUR,
  completed: START - ONE_HOUR + ONE_MINUTE,
  title: "should be archived",
};

// This is our basic input. We have an array of 'active' tasks, and
// an array of 'archive' tasks. The active list has one task we
// expect to stay in the active list, and one we expect to move.
const basicInput = {
  active: [newTask, oldCompletedTask],
  archive: [],
};

// After we run our archive function we expect the following
// output:
const expectedBasic = {
  active: [newTask],
  archive: [oldCompletedTask],
};

describe("moveOldTasksToArchive()", () => {
  it("should move completed task to the archive", () => {
    expect(moveOldTasksToArchive(basicInput, START)).toEqual(expectedBasic);
  });
});

// test script: yarn test 3.1-example-based.test.js
```
