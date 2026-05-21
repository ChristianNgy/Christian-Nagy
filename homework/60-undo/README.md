# Linked List with Unit Tests

This project is a copy of the linked-list playlist exercise, extended with **automated unit tests** using [Vitest](https://vitest.dev/). The focus here is **not** on the linked list itself (see the original `LinkedList` project for that) — it is on **how to test a class with unit tests**.

## Why test?

Once code grows beyond a few lines, manually clicking through the UI to verify every behaviour stops scaling:

- You forget to retest old features after changes (**regressions**).
- Edge cases (empty list, single element, deleting the head, deleting the last element) are easy to miss.
- Bugs caught a week later are much harder to fix than bugs caught right after writing the code.

**Unit tests** are little programs that exercise small pieces of your code automatically. You run them with one command and the framework tells you which ones pass and which fail.

## What is Vitest?

Vitest is a test runner for TypeScript / JavaScript projects that use Vite. You write tests in files named `*.test.ts`, and Vitest:

1. Finds all test files automatically.
2. Runs them in isolation.
3. Reports the results with a colourful summary.

It also supports a **watch mode** that re-runs the relevant tests every time you save a file — instant feedback while you are coding.

## Project structure

The linked list lives in its own file with **no DOM dependencies**. That is the most important design decision for testability: the moment your logic touches `document.getElementById`, you can no longer test it with plain unit tests. You would need a browser or a DOM emulator. Keep logic and UI separated.

## Anatomy of a test file

```ts
import { describe, it, expect, beforeEach } from "vitest";
import { LinkedList } from "./linkedList";

describe("LinkedList", () => {
  let list: LinkedList;

  beforeEach(() => {
    list = new LinkedList();   // fresh list before every test
  });

  it("starts empty", () => {
    expect(list.isEmpty()).toBe(true);
  });
});
```

| Function     | Purpose                                                               |
| ------------ | --------------------------------------------------------------------- |
| `describe`   | Groups related tests under one heading.                               |
| `it`         | Defines a single test case. Reads like a sentence: _it starts empty_. |
| `expect`     | States what the result should be. Fails the test if the value is off. |
| `beforeEach` | Runs before every test — gives every test a clean starting state.     |

### Common matchers

| Matcher                    | Checks that…                            |
| -------------------------- | --------------------------------------- |
| `expect(x).toBe(y)`        | `x === y` (primitive equality)          |
| `expect(x).toEqual(y)`     | `x` and `y` have the same shape (deep)  |
| `expect(x).toBeNull()`     | `x === null`                            |
| `expect(x).toBeInstanceOf(C)` | `x instanceof C`                     |

## Test design patterns shown in `linkedList.test.ts`

1. **Arrange / Act / Assert** — set up state, perform the action, check the result.
2. **One behaviour per test** — each `it(...)` block tests exactly one thing, so when it fails the failure tells you exactly what broke.
3. **Edge cases** — for every operation, ask: _what happens with an empty list? a single element? the first element? the last element?_
4. **`beforeEach` for shared setup** — avoids copy-pasting the same setup into every test.
5. **Independent tests** — no test relies on another test having run first.

## Running the tests

```bash
npm install      # once, after cloning
npm test         # watch mode — re-runs on every file save
npm run test:run # single run, prints the report and exits
```

## Try it yourself

1. Run `npm test`. You should see all tests pass.
2. Open `src/linkedList.ts` and break something on purpose, for example change `return false` to `return true` in `delete`. Save the file. Watch the tests fail and read the failure messages.
3. Fix it again. Tests should pass once more.
4. Add a new test of your own, for example: _inserting after a song moves the previous tail's `next` pointer correctly._
