/*
Testing JavaScript
    Mocking module
        jest.mock('../utils',()=>{
            return {
                func1 : jest.fn(mock_func)
            }
        })
    Make mock module gobal 
        create __mocks__/module_name.js 
        export mock functions in it 
    Snapshot testing
        ensure that the UI of a component remains consistent over time.
        It captures the rendered output of a component and compares 
        it to a previously saved "snapshot" of that output. 
        Jest's toMatchSnapshot() method
        u flag is used to update the snapshots
    node inspect-brk option 
        to debug tests like chrome debugger
    jest coverage option 
        reports code coverage
    husky 
        git hooks to run scripts before commit etc 
    react testing 
        fireEvent 
            only fires specified event 
        userEvent 
            simulated browser behaviour 
            fires several other event like focus etc also 
    jest-in-case 
        can write tests in cases 
        description for each small tests
*/

// expect, toBe abstraction implementation
function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },
  };
}
// usage: expect(10).toBe(9)
