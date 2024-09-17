# Weighted List

`@adaloop/weighted-list` is a weighted list implementation, pick random item using probability distribution. It also includes a loot table implementation.

## Features

### Weighted List

Weighted list are lists where each item has a weight. The probability of picking an item randomly is proportional to its weight.

### Loot Table

Loot table is a table is where each row is a weighted list and has a chance to be rolled. It is often used in games.

## Installation

```bash
npm install @adaloop/weighted-list
```

## Usage

### Weighted List

```ts
import { WeightedList } from '@adaloop/weighted-list'

const list = new WeightedList<string>(100) // 100 is the total weight, default is 100
list.add('a', 25)
list.add('b', 25)
list.add('c', 50)

const item = list.pickRandom() // 'a' or 'b' or 'c'
const item2 = list.pick(50) // You can also pick a specific weight
```

### Weighted List with empty weight

When item added doesn't fill the total weight, it can return null.

```ts
import { WeightedList } from '@adaloop/weighted-list'

const list = new WeightedList<string>(100) // 100 is the total weight, default is 100
list.add('a', 25)
list.add('b', 25)

const item = list.pickRandom() // 'a' or 'b' or null
const item2 = list.pick(50) // You can also pick a specific weight
```

### Loot Table

```ts
import { LootTable, WeightedList } from '@adaloop/weighted-list'

const lootTable = new LootTable<string>()

lootTable.add(new WeightedList<string>(100).add('a', 25).add('b', 25).add('c', 50), 100)
lootTable.add(new WeightedList<string>(100).add('t', 25).add('u', 25), 50)

const rolledItems = lootTable.roll() // Return list of items
```
