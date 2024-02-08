# Generating test data

- With property tests, we get the computer to generate examples for us.

- In JavaScript, we can use a library called Fast-check to do this,
  which is a port of the QuickCheck library from Haskell.

- Fast-check calls these example-generators ‘arbitraries’.

- Fast-check comes with a whole swag of arbitraries for generating basic data.

```js
import * as fc from "fast-check";

const myStringArbitrary = fc.string();
const myNumberArbitrary = fc.number();
const myDateArbitrary = fc.date();
```

- We can also create our own arbitraries for more complex data structures using
  what fast-check calls ‘combinators’.

- For example, we can create an arbitrary for a task object using `fc.record()`,
  which also allows us to define required keys:

```js
const genTodo = () =>
  fc
    .record(
      {
        created: fc.date(),
        title: fc.string(),
        offset: fc.nat(),
      },
      { requiredKeys: ["created", "title"] }
    )
    .map(({ created, title, offset }) => ({
      created: created.getTime(),
      title,
      completed: offset !== undefined ? created.getTime() + offset : undefined,
    }));

// create an arbitrary for the state, using fc.array() and fc.record():
const genTaskState = () =>
  fc.record({
    active: fc.array(genTodo()),
    archive: fc.array(genTodo()),
  });
```

We can now generate random input data. But we don’t have any tests yet. If we’re
not coming up with examples, how do we write the test?
