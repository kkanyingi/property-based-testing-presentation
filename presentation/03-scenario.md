# A hypothetical scenario

Before we jump into property tests, let’s set the scene. Imagine we’re writing a To Do application.
And we’d like to add a feature where we move completed tasks to an archive once they’re older than one minute.

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
