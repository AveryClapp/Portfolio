# Interactive Blocks System - Design Document

**Date:** 2025-01-08
**Status:** Design Phase
**Author:** Design Session with Claude

---

## Table of Contents
1. [Overview](#overview)
2. [Design Philosophy](#design-philosophy)
3. [Architecture](#architecture)
4. [Feature: Graph Renderer](#feature-graph-renderer)
5. [Feature: Algorithm Visualizer](#feature-algorithm-visualizer)
6. [Extensibility Framework](#extensibility-framework)
7. [Implementation Roadmap](#implementation-roadmap)
8. [Future Extensions](#future-extensions)

---

## Overview

### Problem Statement
Currently, the portfolio has one interactive content type (chess PGN rendering). To support rich technical writing across algorithms, math, systems, and code, we need:
- Multiple interactive content types (graphs, algorithm visualizers, code playgrounds, etc.)
- Easy authoring (simple markdown syntax)
- Maintainable architecture (adding new types should be trivial)
- Consistent UX (all components follow the minimalist design aesthetic)

### Solution
Build an **Interactive Blocks System** - an extensible framework that:
1. Detects custom code blocks in markdown
2. Routes them to specialized parsers
3. Renders with custom React components
4. Maintains the existing chess pattern as a template

### Success Criteria
- ✅ Adding a new interactive block type takes < 1 hour
- ✅ Writing a blog post with interactives is as easy as writing a code fence
- ✅ All components share consistent styling (neutral/stone palette, minimal UI)
- ✅ Performance stays excellent (lazy loading, code splitting)
- ✅ No configuration needed in individual blog posts

---

## Design Philosophy

### Core Principles (Inherited from Chess Implementation)

**1. Markdown-First Authoring**
```markdown
```graph
A -> B, C
B -> D
```
```

Not this:
```jsx
<Graph nodes={...} edges={...} config={...} />
```

**Why:** Writing flow should never break. Code fences are familiar, portable, version-controllable.

**2. Smart Defaults, Minimal Config**
The chess component works with just PGN. No props, no config, no imports. New components should follow this pattern.

**3. Progressive Enhancement**
- Graceful degradation for unsupported block types
- Mobile-friendly (hide complex interactions, show static view)
- Fast initial load (lazy load interactive components)

**4. Visual Consistency**
All interactive components share:
- Neutral/stone color palette
- Inter font family
- Consistent spacing (mb-6 for blocks, mb-4 for internal elements)
- Simple borders (border-neutral-300), no shadows
- Minimal controls (Previous/Next buttons, no fancy UI)

---

## Architecture

### High-Level Flow

```
Blog Post Markdown
    ↓
ReactMarkdown components.code
    ↓
CustomCodeBlock (already exists)
    ↓
Block Type Detector
    ↓
┌─────────────┬──────────────┬─────────────┐
│ PGN Parser  │ Graph Parser │ Algo Parser │ ... (extensible)
└─────────────┴──────────────┴─────────────┘
    ↓               ↓              ↓
┌─────────────┬──────────────┬─────────────┐
│ Chess       │ Graph        │ Algorithm   │ ... (components)
│ Slideshow   │ Renderer     │ Visualizer  │
└─────────────┴──────────────┴─────────────┘
```

### File Structure

```
src/
├── Components/
│   └── BlogComponents/
│       ├── Chess/
│       │   ├── ChessSlideshow.jsx       (existing)
│       │   └── openings.js
│       ├── Graph/
│       │   ├── GraphRenderer.jsx        (new)
│       │   └── graphLayouts.js
│       ├── Algorithm/
│       │   ├── AlgorithmVisualizer.jsx  (new)
│       │   └── builtinAlgorithms.js
│       └── Interactive/
│           ├── InteractiveBlock.jsx     (new - wrapper/registry)
│           └── SharedControls.jsx       (new - reusable UI)
├── utils/
│   ├── pgnParser.js                     (existing)
│   ├── graphParser.js                   (new)
│   ├── algoParser.js                    (new)
│   └── blockRegistry.js                 (new - central registry)
└── app/
    └── blog/
        └── [slug]/
            └── page.js
```

### Component Registry Pattern

**Central registry** (`utils/blockRegistry.js`):
```js
const BLOCK_TYPES = {
  pgn: {
    parser: parsePGN,
    component: ChessSlideshow,
    loader: () => import('@/Components/BlogComponents/Chess/ChessSlideshow')
  },
  graph: {
    parser: parseGraph,
    component: GraphRenderer,
    loader: () => import('@/Components/BlogComponents/Graph/GraphRenderer')
  },
  algo: {
    parser: parseAlgorithm,
    component: AlgorithmVisualizer,
    loader: () => import('@/Components/BlogComponents/Algorithm/AlgorithmVisualizer')
  }
  // Adding new block types = just add entry here
};

export function getBlockHandler(language) {
  return BLOCK_TYPES[language] || null;
}
```

**Updated CustomCodeBlock** (in `BlogPost.jsx`):
```js
const CustomCodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const codeString = String(children).replace(/\n$/, "");

  // Check if this is an interactive block type
  const blockHandler = getBlockHandler(language);

  if (blockHandler && !inline) {
    try {
      const parsedData = blockHandler.parser(codeString);
      const Component = blockHandler.component;
      return <Component {...parsedData} />;
    } catch (error) {
      return <ErrorBlock language={language} error={error} code={codeString} />;
    }
  }

  // Fall back to syntax highlighting for regular code
  return <SyntaxHighlighter ... />;
};
```

**Key Benefits:**
- ✅ Adding new block types = 1 registry entry + parser + component
- ✅ CustomCodeBlock stays clean and extensible
- ✅ Lazy loading built-in (use `loader` function)
- ✅ Type safety (can add TypeScript later)

---

## Feature: Graph Renderer

### Use Cases
- Data structure visualization (trees, graphs, linked lists)
- Dependency diagrams (imports, build systems)
- State machines (application flows)
- Algorithm explanations (showing graph before/after operations)

### Syntax Design

**Basic Graph:**
```markdown
```graph
A -> B, C
B -> D, E
C -> F
```
```

**Directed Acyclic Graph (DAG):**
```markdown
```graph
type: dag
layout: horizontal
A -> B, C
B -> D
C -> D
```
```

**Tree with Highlights:**
```markdown
```graph
type: tree
root: 1
1 -> 2, 3
2 -> 4, 5
3 -> 6, 7
highlight: [2, 4, 5]
highlightColor: emerald
```
```

**Weighted Graph:**
```markdown
```graph
type: weighted
A -[5]-> B
A -[3]-> C
B -[2]-> D
C -[4]-> D
```
```

### Parser Design (`utils/graphParser.js`)

**Input:** Raw code string
**Output:** Structured data object

```js
{
  type: 'tree' | 'dag' | 'graph' | 'weighted',
  layout: 'vertical' | 'horizontal' | 'radial',
  nodes: [
    { id: 'A', label: 'A', highlighted: false },
    { id: 'B', label: 'B', highlighted: true },
    // ...
  ],
  edges: [
    { from: 'A', to: 'B', weight: null },
    { from: 'A', to: 'C', weight: 5 },
    // ...
  ],
  config: {
    highlightColor: 'emerald',
    showLabels: true,
    interactive: false
  }
}
```

**Parser Logic:**
1. Extract metadata lines (type, layout, highlight, etc.)
2. Parse edge definitions:
   - `A -> B, C` → edges from A to B and C
   - `A -[5]-> B` → weighted edge
3. Infer nodes from edges
4. Apply highlights based on config
5. Validate graph structure (no cycles for DAG/tree)

### Component Design (`Components/BlogComponents/Graph/GraphRenderer.jsx`)

**Technologies:**
- **Option 1:** react-flow (powerful, but heavy ~200kb)
- **Option 2:** Custom SVG renderer (lightweight, full control)
- **Option 3:** D3.js (flexible, but complex)

**Recommendation:** Start with custom SVG for simple graphs, add react-flow integration later if needed.

**Component Structure:**
```jsx
const GraphRenderer = ({ type, layout, nodes, edges, config }) => {
  const [selectedNode, setSelectedNode] = useState(null);

  // Layout algorithm (tree: recursive, dag: topological, graph: force-directed)
  const positions = useGraphLayout(nodes, edges, type, layout);

  return (
    <div className="mb-6 border-2 border-neutral-300 rounded bg-stone-50 p-6">
      <svg viewBox="0 0 800 600" className="w-full h-auto">
        {/* Render edges first (so they're behind nodes) */}
        {edges.map(edge => (
          <Edge key={`${edge.from}-${edge.to}`} {...edge} positions={positions} />
        ))}

        {/* Render nodes */}
        {nodes.map(node => (
          <Node
            key={node.id}
            {...node}
            position={positions[node.id]}
            selected={selectedNode === node.id}
            onClick={() => setSelectedNode(node.id)}
          />
        ))}
      </svg>

      {/* Optional: Show node details on selection */}
      {selectedNode && (
        <div className="mt-4 text-sm text-neutral-700">
          Selected: {selectedNode}
        </div>
      )}
    </div>
  );
};
```

**Styling Constraints:**
- Nodes: Circle or rounded rect, bg-white, border-neutral-400
- Highlighted nodes: border-neutral-900, font-semibold
- Edges: stroke-neutral-400, stroke-width: 2
- Weighted edges: Show weight in small label (text-xs)
- Hover states: Subtle color transitions (no animations)

### Layout Algorithms

**Tree Layout (Recursive):**
```js
function layoutTree(nodes, edges, rootId) {
  // Simple recursive positioning
  // Root at top, children spread horizontally below
  const levels = computeLevels(nodes, edges, rootId);
  return assignPositions(levels, 'vertical');
}
```

**DAG Layout (Topological + Layering):**
```js
function layoutDAG(nodes, edges) {
  // Topological sort → assign layers
  // Minimize edge crossings
  // Position nodes in layers
}
```

**Graph Layout (Force-Directed):**
```js
function layoutGraph(nodes, edges) {
  // Simple force-directed simulation
  // Springs between connected nodes
  // Repulsion between all nodes
  // Iterate until stable
}
```

---

## Feature: Algorithm Visualizer

### Use Cases
- Explain sorting algorithms (bubble, merge, quick)
- Demonstrate search algorithms (BFS, DFS, Dijkstra)
- Show data structure operations (heap insert, tree rotation)
- Illustrate dynamic programming (memoization tables)

### Syntax Design

**Built-in Algorithm:**
```markdown
```algo
algorithm: bubbleSort
input: [64, 34, 25, 12, 22, 11, 90]
speed: normal
```
```

**Algorithm on Graph:**
```markdown
```algo
algorithm: bfs
graph:
  1 -> 2, 3
  2 -> 4, 5
  3 -> 6
start: 1
```
```

**Custom Steps (Manual Control):**
```markdown
```algo
title: "Binary Search Example"
input: [1, 3, 5, 7, 9, 11, 13]
target: 7

steps:
  - state: { left: 0, right: 6, mid: 3 }
    description: "Initial: Check middle element (7)"
    highlight: [3]
  - state: { left: 0, right: 6, mid: 3, found: true }
    description: "Found target at index 3"
    highlight: [3]
    highlightColor: green
```
```

### Implementation Approaches

The algorithm visualizer needs to generate "steps" - snapshots of state at each operation. There are three main approaches:

#### **Approach 1: Built-in Algorithms**

**How it works:**
- Ship with pre-implemented algorithms (BFS, DFS, sorting, etc.)
- Each algorithm has a generator function that yields steps
- User just specifies algorithm name + input data

**Example built-in:**
```js
// utils/algorithms/bubbleSort.js
export function* bubbleSort(arr) {
  const array = [...arr];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      yield {
        array: [...array],
        comparing: [j, j + 1],
        description: `Comparing ${array[j]} and ${array[j + 1]}`
      };

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        yield {
          array: [...array],
          swapped: [j, j + 1],
          description: `Swapped ${array[j + 1]} and ${array[j]}`
        };
      }
    }
  }
  yield {
    array: [...array],
    description: "Sorted!",
    done: true
  };
}
```

**Pros:**
- Simple authoring (just specify name + data)
- Reliable, predictable output
- Easy to maintain

**Cons:**
- Limited to built-in algorithms
- Adding new algorithms requires code changes
- Can't visualize custom logic

**Best for:** Standard algorithms (sorting, searching, graph traversal)

---

#### **Approach 2: Instrumented Code Execution**

**How it works:**
- User writes JavaScript code with special `yield` statements
- Code runs in a sandboxed environment
- Each `yield` captures state snapshot

**Example usage:**
```markdown
```algo
code: |
  function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    yield { description: "Split array", arrays: [left, right] };

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    yield { description: "Merging", arrays: [sortedLeft, sortedRight] };

    return merge(sortedLeft, sortedRight);
  }

input: [38, 27, 43, 3, 9, 82, 10]
```
```

**Implementation:**
```js
// Eval code in isolated context
function executeAlgorithm(code, input) {
  const generator = new Function('input', `
    return (function*() {
      ${code}
      return run(input);
    })();
  `)(input);

  const steps = [];
  for (let step of generator) {
    steps.push(step);
  }
  return steps;
}
```

**Pros:**
- Ultimate flexibility
- Can visualize any custom logic
- Educational (write the actual algorithm)

**Cons:**
- Security risks (need sandbox)
- Complex error handling
- Harder to write (need to know generator syntax)

**Best for:** Custom algorithms, educational content where showing code is important

---

#### **Approach 3: Declarative Step Format**

**How it works:**
- User manually defines each step in structured format
- No code execution, just data
- Full control over visualization

**Example:**
```markdown
```algo
title: "Insertion Sort Visualization"
input: [5, 2, 4, 6, 1, 3]

steps:
  - array: [5, 2, 4, 6, 1, 3]
    active: 1
    description: "Start with second element (2)"

  - array: [2, 5, 4, 6, 1, 3]
    active: 1
    highlight: [0, 1]
    description: "Insert 2 before 5"

  - array: [2, 5, 4, 6, 1, 3]
    active: 2
    description: "Move to third element (4)"

  - array: [2, 4, 5, 6, 1, 3]
    highlight: [1, 2]
    description: "Insert 4 between 2 and 5"

  # ... more steps
```
```

**Pros:**
- Complete safety (no code execution)
- Full control over narrative
- Easy to debug and edit

**Cons:**
- Verbose for complex algorithms
- Tedious to write manually
- Can't auto-generate from real code

**Best for:** Simple examples, teaching specific edge cases, precise control over visualization

---

### Recommendation: Hybrid Approach

**Phase 1 (MVP):** Approach 1 (Built-in algorithms)
- Ship with 10-15 common algorithms
- Simple, reliable, covers 80% of use cases
- Easy to maintain

**Phase 2:** Add Approach 3 (Declarative steps)
- For custom examples and edge cases
- No security concerns
- Gives full control when needed

**Phase 3 (Optional):** Add Approach 2 (Code execution)
- Only if there's strong demand
- Requires proper sandboxing (e.g., isolated-vm, Web Workers)
- Most complex but most flexible

---

### Component Design (`Components/BlogComponents/Algorithm/AlgorithmVisualizer.jsx`)

**Similar to ChessSlideshow pattern:**
```jsx
const AlgorithmVisualizer = ({
  algorithm,
  steps,
  title
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  return (
    <div className="mb-6 border-2 border-neutral-300 rounded bg-stone-50 p-6">
      {/* Title */}
      <h4 className="text-lg font-semibold mb-4">{title}</h4>

      {/* Visualization area (depends on data structure) */}
      <div className="mb-4">
        {step.array && <ArrayVisualization {...step} />}
        {step.graph && <GraphVisualization {...step} />}
        {step.tree && <TreeVisualization {...step} />}
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-700 mb-4">
        {step.description}
      </p>

      {/* Progress bar */}
      <div className="mb-4 h-1 bg-neutral-200 rounded">
        <div
          className="h-full bg-neutral-900 rounded transition-all"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Controls (same as chess) */}
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-neutral-900 text-white rounded disabled:bg-neutral-300"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-neutral-900 text-white rounded disabled:bg-neutral-300"
        >
          Next
        </button>
        <span className="ml-auto self-center text-sm text-neutral-600">
          Step {currentStep + 1} / {steps.length}
        </span>
      </div>
    </div>
  );
};
```

**Visualization Components:**

**ArrayVisualization:**
```jsx
const ArrayVisualization = ({ array, active, highlight, comparing, swapped }) => (
  <div className="flex gap-2 justify-center">
    {array.map((value, i) => (
      <div
        key={i}
        className={cn(
          "w-12 h-12 flex items-center justify-center border-2 rounded",
          comparing?.includes(i) && "border-yellow-500 bg-yellow-50",
          swapped?.includes(i) && "border-green-500 bg-green-50",
          highlight?.includes(i) && "border-neutral-900 bg-neutral-100 font-semibold",
          active === i && "border-blue-500 bg-blue-50",
          "border-neutral-300 bg-white"
        )}
      >
        {value}
      </div>
    ))}
  </div>
);
```

**GraphVisualization:**
- Reuse GraphRenderer component
- Pass highlight/active state from step

**TreeVisualization:**
- Specialized tree layout (vertical hierarchy)
- Highlight paths, show insertion points

---

## Extensibility Framework

### Adding a New Block Type (Step-by-Step)

Let's say you want to add a **State Machine Visualizer** (`language="fsm"`).

**Step 1: Create Parser** (`utils/fsmParser.js`)
```js
export function parseFSM(codeString) {
  // Parse FSM syntax:
  // start: idle
  // idle -[click]-> loading
  // loading -[success]-> done
  // loading -[error]-> error

  const lines = codeString.trim().split('\n');
  // ... parsing logic ...

  return {
    initialState: 'idle',
    states: [...],
    transitions: [...]
  };
}
```

**Step 2: Create Component** (`Components/BlogComponents/FSM/FSMRenderer.jsx`)
```jsx
export default function FSMRenderer({ initialState, states, transitions }) {
  const [currentState, setCurrentState] = useState(initialState);

  return (
    <div className="mb-6 border-2 border-neutral-300 rounded bg-stone-50 p-6">
      {/* Render state machine diagram */}
      {/* Interactive: click transitions to move between states */}
    </div>
  );
}
```

**Step 3: Register in Block Registry** (`utils/blockRegistry.js`)
```js
import { parseFSM } from './fsmParser';

const BLOCK_TYPES = {
  // ... existing types ...
  fsm: {
    parser: parseFSM,
    component: null, // Will lazy load
    loader: () => import('@/Components/BlogComponents/FSM/FSMRenderer')
  }
};
```

**Done!** Now you can use:
```markdown
```fsm
start: idle
idle -[click]-> loading
loading -[success]-> done
```
```

**Total time:** 1-2 hours for simple visualizations.

---

### Shared UI Components

Create reusable components to maintain consistency:

**SharedControls.jsx:**
```jsx
export const StepControls = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev
}) => (
  <div className="flex gap-2">
    <button
      onClick={onPrev}
      disabled={currentStep === 0}
      className="px-4 py-2 bg-neutral-900 text-white rounded disabled:bg-neutral-300"
    >
      Previous
    </button>
    <button
      onClick={onNext}
      disabled={currentStep === totalSteps - 1}
      className="px-4 py-2 bg-neutral-900 text-white rounded disabled:bg-neutral-300"
    >
      Next
    </button>
    <span className="ml-auto self-center text-sm text-neutral-600">
      Step {currentStep + 1} / {totalSteps}
    </span>
  </div>
);

export const ProgressBar = ({ progress }) => (
  <div className="mb-4 h-1 bg-neutral-200 rounded">
    <div
      className="h-full bg-neutral-900 rounded transition-all duration-300"
      style={{ width: `${progress * 100}%` }}
    />
  </div>
);
```

**Styling constants:**
```js
// utils/interactiveStyles.js
export const INTERACTIVE_STYLES = {
  container: "mb-6 border-2 border-neutral-300 rounded bg-stone-50 p-6",
  title: "text-lg font-semibold mb-4",
  description: "text-sm text-neutral-700 mb-4",

  // Node/element states
  node: {
    base: "border-2 rounded bg-white border-neutral-300",
    active: "border-blue-500 bg-blue-50",
    highlight: "border-neutral-900 bg-neutral-100 font-semibold",
    comparing: "border-yellow-500 bg-yellow-50",
    success: "border-green-500 bg-green-50",
    error: "border-red-500 bg-red-50"
  },

  // Controls
  button: "px-4 py-2 bg-neutral-900 text-white rounded disabled:bg-neutral-300",

  // Progress
  progressBar: "h-1 bg-neutral-200 rounded",
  progressFill: "h-full bg-neutral-900 rounded transition-all duration-300"
};
```

---

## Implementation Roadmap

### Phase 0: Foundation (2-3 hours)
- [ ] Create `utils/blockRegistry.js` with registry pattern
- [ ] Update `CustomCodeBlock` in `BlogPost.jsx` to use registry
- [ ] Create `ErrorBlock` component for parsing errors
- [ ] Create `SharedControls.jsx` with reusable UI
- [ ] Create `utils/interactiveStyles.js` with shared styles
- [ ] Test with existing chess component (refactor to use registry)

### Phase 1: Graph Renderer (4-6 hours)
- [ ] Create `utils/graphParser.js`
  - [ ] Parse basic edge syntax (`A -> B, C`)
  - [ ] Parse weighted edges (`A -[5]-> B`)
  - [ ] Parse metadata (type, layout, highlight)
  - [ ] Validate graph structure
- [ ] Create `Components/BlogComponents/Graph/GraphRenderer.jsx`
  - [ ] Implement tree layout algorithm
  - [ ] Implement DAG layout algorithm
  - [ ] Render nodes and edges with SVG
  - [ ] Add click interactions (select nodes)
- [ ] Register in block registry
- [ ] Write test blog post with graph examples

### Phase 2: Algorithm Visualizer - Built-ins (6-8 hours)
- [ ] Create `utils/algoParser.js` for built-in algorithm syntax
- [ ] Create `utils/algorithms/` directory with built-in algorithms:
  - [ ] Sorting: bubbleSort, insertionSort, mergeSort, quickSort
  - [ ] Search: linearSearch, binarySearch
  - [ ] Graph: BFS, DFS
- [ ] Create `Components/BlogComponents/Algorithm/AlgorithmVisualizer.jsx`
  - [ ] Step controller (reuse pattern from chess)
  - [ ] ArrayVisualization component
  - [ ] GraphVisualization component (reuse GraphRenderer)
- [ ] Register in block registry
- [ ] Write test blog post with algorithm examples

### Phase 3: Algorithm Visualizer - Custom Steps (2-3 hours)
- [ ] Extend `algoParser.js` to support declarative steps
- [ ] Add step validation
- [ ] Test with custom examples

### Phase 4: Polish & Documentation (2-3 hours)
- [ ] Performance testing (lazy loading works?)
- [ ] Mobile responsiveness
- [ ] Error handling improvements
- [ ] Write documentation in CLAUDE.md
- [ ] Create example templates for each block type

**Total estimated time: 16-23 hours**

---

## Future Extensions

Once the framework is in place, adding new interactive types is straightforward:

### Code Playground
```markdown
```playground
language: javascript
code: |
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  console.log(fibonacci(10));
```
```

**How:**
- Parser: Extract language + code
- Component: Monaco editor or CodeMirror + Web Worker for execution
- Output: Console-style output display

---

### Data Visualization
```markdown
```dataviz
type: line
data:
  - { x: 2020, y: 100 }
  - { x: 2021, y: 150 }
  - { x: 2022, y: 120 }
xLabel: Year
yLabel: Users
```
```

**How:**
- Parser: Extract chart config + data
- Component: Custom SVG charts (or integrate Chart.js/Recharts)
- Keep minimal aesthetic (no gridlines, simple axes)

---

### Terminal Session
```markdown
```terminal
$ npm install react
+ react@18.2.0
added 3 packages in 2s

$ npm run dev
> dev
> next dev

Ready on http://localhost:3000
```
```

**How:**
- Parser: Extract command/output pairs
- Component: Styled terminal UI with syntax highlighting
- Could add step-through for multi-command sessions

---

### State Machine
```markdown
```fsm
start: idle
idle -[click]-> loading
loading -[success]-> done
loading -[error]-> error
error -[retry]-> loading
```
```

**How:**
- Parser: Parse state transitions
- Component: Interactive state diagram (click transitions to move states)
- Useful for explaining application flows

---

### Math Equation Solver
```markdown
```mathsteps
problem: Solve x^2 + 5x + 6 = 0
steps:
  - "Factor: (x + 2)(x + 3) = 0"
  - "Set each factor to zero"
  - "x + 2 = 0  →  x = -2"
  - "x + 3 = 0  →  x = -3"
solution: x = -2, -3
```
```

**How:**
- Parser: Extract problem + steps
- Component: Step-through explanation with KaTeX rendering
- Could integrate with CAS for auto-solving

---

### Memory/Stack Visualization
```markdown
```memory
code: |
  int x = 5;
  int* ptr = &x;
  int** pptr = &ptr;

layout:
  stack:
    - { name: x, value: 5, address: 0x1000 }
    - { name: ptr, value: 0x1000, address: 0x1004 }
    - { name: pptr, value: 0x1004, address: 0x1008 }
```
```

**How:**
- Parser: Extract memory layout
- Component: Memory diagram with boxes and pointers
- Great for teaching pointers, references, heap vs stack

---

### Regex Visualizer
```markdown
```regex
pattern: /^[a-z]+@[a-z]+\.[a-z]{2,}$/
test:
  - "user@example.com" → match
  - "invalid.email" → no match
  - "user@domain.co" → match
```
```

**How:**
- Parser: Extract regex + test cases
- Component: Visual breakdown of regex parts + test results
- Highlight matching groups

---

### Timeline
```markdown
```timeline
2020: Started project
2021: First major release
2022-03: Added feature X
2022-09: Reached 1000 users
2023: Complete rewrite
```
```

**How:**
- Parser: Extract events + dates
- Component: Horizontal or vertical timeline
- Minimal design (just lines and markers)

---

## Design Validation

### Does this meet our success criteria?

✅ **Adding new block type < 1 hour?**
Yes - just parser + component + registry entry. Framework handles the rest.

✅ **Easy authoring?**
Yes - familiar code fence syntax, no imports/config needed.

✅ **Consistent styling?**
Yes - shared styles, shared controls, all use neutral/stone palette.

✅ **Performance?**
Yes - lazy loading through registry, code splitting per block type.

✅ **Zero config?**
Yes - smart defaults in parsers, progressive enhancement.

---

## Questions for Implementation

1. **Graph Layout Library:** Custom SVG vs react-flow vs D3?
   - **Recommendation:** Start custom SVG for simple cases, integrate react-flow later if needed

2. **Algorithm Step Generation:** Built-in only, or also support custom code?
   - **Recommendation:** Start built-in, add declarative steps next, custom code execution last (if ever)

3. **Mobile Strategy:** Hide interactive components or show static versions?
   - **Recommendation:** Show static versions (final state) on mobile, full interaction on desktop

4. **Error Handling:** How verbose should parsing errors be?
   - **Recommendation:** Developer-friendly errors in dev, clean fallbacks in production

5. **Testing Strategy:** Unit tests for parsers, visual regression tests for components?
   - **Recommendation:** Unit tests for parsers (critical), manual testing for components initially

---

## Conclusion

The Interactive Blocks System provides a scalable, maintainable foundation for rich technical content. By following the chess component's pattern and building a registry-based architecture, we can easily add new interactive types while maintaining consistency and performance.

**Next Steps:**
1. Review this design document
2. Decide on Phase 1 scope (just graphs, or graphs + algorithms?)
3. Create implementation plan with detailed tasks
4. Start coding!

---

**End of Design Document**
