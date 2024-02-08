# Example-based tests

Before we jump into property tests, let’s set the scene. Imagine we’re writing a To Do application.
And we’d like to add a feature where we move completed tasks to an archive once they’re older than one minute.

```js
// We should test the edge case for when the arrays are empty.
const emptyInput = { active: [], archive: [] };

// And we'd also like to test the case where there's something
// already in the archive. So we'll create another old task…
const oldAbandonedTask = {
  created: START - ONE_HOUR,
  title: "Abandoned, not completed",
};

// …and put the old task into the archive to create a new input.
const populatedArchive = {
  active: [oldCompletedTask],
  archive: [oldAbandonedTask],
};

// This is the expected output for the case where the archive
// already has something in it.
const expectedPopulated = {
  active: [],
  archive: [oldCompletedTask, oldAbandonedTask],
};

describe.each`
  description            | input               | date     | expected
-----------------------------------------------------------------------------
  ${"Basic example"}     | ${basicInput}       | ${START} | ${expectedBasic}
  ${"Empty arrays"}      | ${emptyInput}       | ${START} | ${emptyInput}
  ${"Populated archive"} | ${populatedArchive} | ${START} | ${expectedPopulated}
`("$description", ({ input, date, expected }) => {
  test(`should return the expected output`, () => {
    expect(moveOldTasksToArchive(input, date)).toEqual(expected);
  });
});

// test script: yarn test 3.2-example-based.test.js
```

It does get annoying writing out all those examples by hand though. And it’s especially tedious when we have structured data like arrays and objects. A good property-testing framework can take the tedium out of writing example data. It can generate it for us. Let’s see how that works in the next section.
