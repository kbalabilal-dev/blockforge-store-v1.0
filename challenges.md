# Stage 6: Async, Await & Fetch Challenges

Save this file as `CHALLENGES.md` in your project folder so you can check off each task as you complete it.

---

## Concept 1: `async / await` Basics

### Challenge 1: Step-by-Step (First Fetch)
**Goal:** Create an `async` function that reads `data.json` and logs the **2nd item's name** in the console[cite: 23].

**Steps:**
- [ ] Create an `async function testFirstFetch()`.
- [ ] Send request: `const response = await fetch("./data.json");`
- [ ] Parse JSON: `const result = await response.json();`
- [ ] Log second item name using `result.data[1].name`[cite: 23].
- [ ] Call `testFirstFetch()` at the bottom of `index.js`.

---

### Challenge 2: Step-by-Step with `try...catch`
**Goal:** Wrap the fetch logic inside a `try...catch` block to handle broken file paths safely.

**Steps:**
- [ ] Wrap your `testFirstFetch()` code in a `try { ... } catch (error) { ... }` block.
- [ ] Change the path intentionally to `"./wrong-file.json"` inside the `try` block.
- [ ] Inside `catch(error)`, log a friendly console error message.
- [ ] Verify your custom error message prints without crashing the script.
- [ ] Change the path back to `"./data.json"`.

---

### Challenge 3: Solo Challenge 🚀 (`getRankNames`)
**Goal:** Write an async function that fetches `data.json` and logs an array containing **only items from the "Ranks" category**[cite: 23].

**Requirements:**
- [ ] Function name: `getRankNames()`
- [ ] Use `async` / `await` and `try...catch`.
- [ ] Filter `result.data` where `item.category.name === "Ranks"`[cite: 23].
- [ ] Log the filtered array to the console.
- [ ] Call `getRankNames()`.

---

## Concept 2: `fetch()` Response Validation (`res.ok`)

### Challenge 1: Step-by-Step (`response.ok` Check)
**Goal:** Check `response.ok` before attempting to parse JSON.

**Steps:**
- [ ] Create an `async function checkFetch()`.
- [ ] Fetch `./data.json`.
- [ ] Add `if (response.ok)` condition.
- [ ] Inside `if`, parse JSON (`await response.json()`) and log `result.data.length`[cite: 23].
- [ ] Call `checkFetch()`.

---

### Challenge 2: Step-by-Step (`response.ok` + `try...catch`)
**Goal:** Manually throw an error when `response.ok` is `false` so execution jumps directly to `catch`.

**Steps:**
- [ ] Create an `async function checkFetchWithError()`.
- [ ] Wrap logic in `try...catch`.
- [ ] Fetch a missing path: `./missing.json`.
- [ ] Check `if (!response.ok)`, then `throw new Error("HTTP Error Code: " + response.status);`.
- [ ] Inside `catch(error)`, log `error.message`.
- [ ] Test in browser console to confirm execution jumps directly to `catch`.

---

### Challenge 3: Solo Challenge 🚀 (`getPackageById`)
**Goal:** Write a lookup function that finds a specific package by its numerical `id`[cite: 23].

**Requirements:**
- [ ] Function signature: `async function getPackageById(id)`
- [ ] Fetch `data.json` inside `try...catch` with `response.ok` check[cite: 23].
- [ ] Use `.find()` on `result.data` to match `item.id === id`[cite: 23].
- [ ] If found, log: `"Package found: [Name] - $[Price]"`[cite: 23].
- [ ] If not found, log: `"No package matches ID [id]"`[cite: 23].
- [ ] Test by calling `getPackageById(5)` and `getPackageById(99)`.