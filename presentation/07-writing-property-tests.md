# writing a property test

- With fast-check, we define a property using the fc.property() method.

- It takes a number of arbitraries as arguments.

- The last argument is a function that runs the test.

- For our case, it might look something like the following:

```js
describe("moveOldTasksToArchive()", () => {
  test(`should ALWAYS return the same total number of tasks`, () => {
    const lengthProperty = fc.property(
      genTaskState(),
      fc.date(),
      (state, date) => {
        const newState = moveOldTasksToArchive(state, date.getTime());
        const actualLength = newState.active.length + newState.archive.length;
        const expectedLength = state.active.length + state.archive.length;
        expect(actualLength).toBe(expectedLength);
      }
    );

    fc.assert(lengthProperty, { numRuns: 10000 });
  });
});

// test script: yarn test 4.2-writing-property-tests.test.js
```

### Test Failure Explained

_Property failed after 2 tests_

### Bias

- Fast-check is smart about how it generates examples and it knows that bugs tend to occur around edge cases. That is, we’ll find more bugs associated with -1, 0, and 1, than we will associated with larger numbers like 42 or 6168533449859237.

- Recognising this, fast-check biases its example generation. Early on in the run, it’s weighted to produce small values more frequently. So, it’s more likely to try things like 0, [], undefined, empty strings, and so on. But, as the test run continues, it will produce larger values to make sure that it gives good coverage.

### Reproducing failing tests

```json
{
  "seed": 879484825,
  "path": "1:1:2:2:2:1:1",
  "endOnFailure": true
}
```

- This line may seem cryptic, but it’s most helpful.

- The values that fast-check generates are not completely random. They’re pseudorandom values.

- If we provide fast-check with a seed, it can replay all generated tests.

```js
fc.assert(lengthProperty, { seed: 1383591766 });
```

- If we only want to replay the failing test, we pass in the path value like so:

```js
fc.assert(lengthProperty, { seed: 1383591766, path: "1:1:2:2:2:1:1" });
```

### Counterexample

```json
{
    Counterexample: [
        {
            active: [{
                created: 0,
                title: "",
                completed: undefined
            }],
            archive: []
        },
        new Date("1970-01-01T00:00:00.000Z")
    ]
}

```

- sample values it found will break our test

### Shrinking

_Shrunk 6 time(s)_

- This tells us is that the example above isn’t the first failure fast-check found.

- To find the smallest example that breaks the test, fast-check will shrink the example.

- This makes it easier to understand what’s going on, and fix our code
