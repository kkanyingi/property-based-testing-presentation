# Fixing out code

original code:

```js
const moveOldTasksToArchive = ({ active, archive }, currentTime) => ({
  active: active.filter(
    ({ completed }) => currentTime - completed < ONE_MINUTE
  ),
  archive: active
    .filter(({ completed }) => currentTime - completed >= ONE_MINUTE)
    .concat(archive),
});
```

- An incomplete task has an undefined completed date. So our filter function tries to subtract undefined from the current date (in this case, zero). And it gets back _NaN_.

```js
NaN < ONE_MINUTE returns false

NaN >= ONE_MINUTE also returns false
```

- We can fix this by adding a check for undefined values.

```js
const moveOldTasksToArchive = ({ active, archive }, currentTime) => ({
  active: active.filter(
    ({ completed }) =>
      completed === undefined || currentTime - completed < ONE_MINUTE
  ),
  archive: active
    .filter(
      ({ completed }) =>
        completed !== undefined && currentTime - completed >= ONE_MINUTE
    )
    .concat(archive),
});

// test script: yarn test 4.3-fixing-our-code.test.js
```
