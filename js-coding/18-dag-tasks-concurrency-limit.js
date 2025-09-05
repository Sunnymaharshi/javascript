/* 
    Execute task in parallel with resolved dependency
        resolve task dependencies in directed acyclic graph (DAG)
        and execute tasks in parallel with concurrency limit 
    1. resolve dependencies with topological sort 
        topological sort (task=>deps)
            DAG: a=>b=>c=>(d,e) 
            topological order: e d c b a (or) d e c b a 
            algo:
                1. do DFS on each element with visited array
                2. when DFS ends add node to stack 
                    since we need reverse order (from no dependencies)
                3. retrieve nodes from stack to get the topological order
        In-Degree
            The number of tasks that depend ON this task (its dependents)
        Out-Degree
            The number of tasks that this task depends ON (its dependencies) 
*/
function taskRunner(name, delay = 1000) {
  return () =>
    new Promise((resolve, reject) => {
      console.log(`Starting task: ${name}`);
      setTimeout(() => {
        console.log(`Task ${name} Completed`);
        if (name === "A") {
          reject(`Error: Task ${name} is failed`);
          return;
        }
        resolve(`Task ${name} result`);
      }, delay);
    });
}

const graph = {
  E: {
    dependency: ["C", "D"],
    task: taskRunner("E"),
  },
  C: {
    task: taskRunner("C"),
  },
  D: {
    dependency: ["A", "B"],
    task: taskRunner("D"),
  },
  A: {
    task: taskRunner("A"),
  },
  B: {
    task: taskRunner("B"),
  },
};
// use topological sort
function resolveDependencies(graph) {
  const nodes = Object.keys(graph);
  const adjList = new Map();
  const outDegree = new Map();
  const visited = new Set();
  const topologicalOrder = [];
  // to detect cycle
  const temp = new Set();

  // out degree to track dependencies for a task
  // initialise the variables - for nodes without dependencies outDegree is 0
  for (const node of nodes) {
    outDegree.set(node, 0);
    adjList.set(node, []);
  }

  // create adjacent list & find outDegree for all nodes
  for (const node of nodes) {
    const dependencies = graph[node].dependency || [];
    // node => (deps), increase outDegree is no of dependencies
    outDegree.set(node, dependencies.length);
    for (const dependency of dependencies) {
      // adjacent list
      adjList.get(node).push(dependency);
    }
  }

  // DFS for topological sort
  function DFS(node) {
    // In DFS of a node, if one node appears again then it has cycle
    if (temp.has(node)) {
      throw new Error("Graph has a cycle, cannot be sorted topologically");
    }
    // skip if already visited, already sorted
    if (visited.has(node)) {
      return;
    }

    temp.add(node);
    // visit all dependencies of the node
    const dependencies = adjList.get(node);
    for (const dependency of dependencies) {
      if (!visited[dependency]) {
        DFS(dependency);
      }
    }

    // mark as visited and add it to result
    temp.delete(node);
    visited.add(node);
    // this list acts as a stack
    topologicalOrder.push(node);
  }

  // run DFS on all nodes
  for (const node of nodes) {
    // node is not already sorted
    if (!visited.has(node)) {
      DFS(node);
    }
  }

  // reverse the stack to get correct order
  topologicalOrder.reverse();

  return {
    topologicalOrder,
    outDegree,
    adjList,
  };
}

async function executeParallel(
  adjList,
  topologicalOrder,
  outDegree,
  concurrencyLimit = 2
) {
  // Copy outDegree to track remaining dependencies
  const remainingDeps = new Map(outDegree);
  const readyTasks = [];
  // Add initially ready tasks (0 dependencies)
  // here, we don't actually need topological order as we mainly depending on
  // out degree and reverseAdjList to run parallel tasks and their dependants
  topologicalOrder.forEach((task) => {
    if (remainingDeps.get(task) === 0) {
      readyTasks.push(task);
    }
  });

  // Track active tasks and results
  let activeCount = 0;
  const results = new Map();
  const failedTasks = new Set();
  let completed = 0;
  const totalTasks = topologicalOrder.length;

  /*
    adjList
        task => (dependencies)
    reverseAdjList
        task => (dependents)
        used for failure propagation 
        when task fails, we need to skip all it's dependents
  */
  const reverseAdjList = new Map();
  for (const task of adjList.keys()) {
    reverseAdjList.set(task, []);
  }
  for (const [task, dependencies] of adjList.entries()) {
    for (const dependency of dependencies) {
      reverseAdjList.get(dependency).push(task);
    }
  }
  function skipDependentTasks(failedTask) {
    const dependents = reverseAdjList.get(failedTask);
    for (const dependent of dependents) {
      if (!failedTasks.has(dependent)) {
        failedTasks.add(dependent);
        // assume it as completed, since we are checking completed to stop the function
        console.log(
          `Skipping ${dependent} because ${failedTask} is Failed/Skipped`
        );
        completed++;
        // recursively skip all dependents
        skipDependentTasks(dependent);
      }
    }
  }

  while (completed < totalTasks) {
    while (readyTasks.length > 0 && activeCount < concurrencyLimit) {
      const task = readyTasks.shift();
      activeCount++;
      graph[task]
        .task()
        .then((result) => {
          results.set(task, result);
          // process dependent tasks
          for (const dependent of reverseAdjList.get(task)) {
            remainingDeps.set(dependent, remainingDeps.get(dependent) - 1);
            // dependent node has no dependencies
            if (remainingDeps.get(dependent) === 0) {
              readyTasks.push(dependent);
            }
          }
        })
        .catch((e) => {
          console.log(e);
          failedTasks.add(task);
          // since task is failed, all tasks that depends on it will be skipped recursively
          skipDependentTasks(task);
        })
        .finally(() => {
          activeCount--;
          completed++;
        });
    }
    // if we are at concurrency limit or waiting for tasks to be completed, wait sometime
    if (activeCount > 0) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (
      activeCount === 0 &&
      readyTasks.length === 0 &&
      completed < totalTasks
    ) {
      console.log(
        "no more tasks can be executed. some may be unreadable due to failure"
      );
      break;
    }
  }
  return { results, failedTasks };
}

const { adjList, topologicalOrder, outDegree } = resolveDependencies(graph);
executeParallel(adjList, topologicalOrder, outDegree, 2).then((result) =>
  console.log(result)
);
