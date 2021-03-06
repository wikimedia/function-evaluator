This is a simple evaluation engine for ZObjects.

For parameters, run 
```
node src/function-evaluator.js --help
```

Run as:
```
node src/function-evaluator.js '"Test"'

node src/function-evaluator.js '{ "Z1K1": "Z7", "Z7K1": "Z31", "K1": ["a"] }'
```

## Todos
Evaluation is currently a big mess and needs to be fixed up entirely.
Importantly, assume that everything has been validated before given to evaluation.
That should simplify evaluation considerably.

src/error.js contains a list of the current errors, needs to be turned into ZObjects.

### Write
- [x] parse
- [x] wellformedness
- [x] normalize
- [x] canonicalize
- [x] evaluate
- [x] built-ins
- [ ] labelize
- [ ] validate
- [ ] composition

### Further todos
- [x] do the tests look right?
- [x] what should be the config for the linter?
- [ ] fix representation and ZIDs of errors, update spec
- [ ] update representation of Z7
- [x] read arguments
- [ ] tests for utils
- [ ] settings
- [x] hook it up to the wiki
- [ ] make resolving async
- [ ] make it runnable as a service
- [ ] caching
- [ ] use a caching service
- [ ] make it runnable as a CLI

### Built-ins
- [x] head
- [x] tail
- [ ] if
- [ ] value by key
- [ ] reify
- [ ] abstract
- [ ] is empty
- [ ] cons
- [ ] first
- [ ] second
- [ ] convert string to list
- [ ] convert list to string
- [ ] same byte
- [ ] unquote
- [ ] validators for all initial types
- [ ] parse
