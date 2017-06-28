# Naive Bayes classifier(Node.js)

## Install

```
npm install naive-bayes-classifier --save
```

## Notification
this package is written in ts, and compiled to es6. 

## How to use ?

**import the package.**
```
// with import
import NaiveBayesClassifier from "naive-bayes-classifier";

// with require, .default is necessary...
const NaiveBayesClassifier = require("naive-bayes-classifier").default
```
**init model**
```
let nb = new NaiveBayesClassifier();
```

**train**
```
// test dataset
 let trainArray = [{
     category: "1",
     text: "a b c d e"
 },{
     category: "1",
     text: "b, c,d e"
 },{
     category: "1",
     text: "a.e f c c e a"
 },{
     category: "2",
     text: "m z x t a y x"
 },{
     category: "2",
     text: "x t m"
 },{
     category: "2",
     text: "b t x"
 }];
 let testArray = [{
     category: "1",
     text: "a e f c"
 },{
     category: "2",
     text: "x m t q"
 }];
nb.train(trainArray);
```

input text will be split by ",", "." and space. function train can by called any time you need.
you can rewrite the split function like this:
```
const yourSplitFunction = i => i.split(",");
let nb = new NaiveBayesClassifier(yourSplitFunction);
```

**categorize**
categorize one sample
```
nb.categorize({
     category: "2",
     text: "x m t q"
     });
```
you can categorize several samples together using categorizeMany
```
nb.categorize([{
     category: "1",
     text: "a e f c"
 },{
     category: "2",
     text: "x m t q"
 }]);
```
you can value your model withi getPrecision

```
let nb = new NaiveBayesClassifier();
//do something here...
//...

nb.getPrecision(testArray);

```

you can restore the model with function restore
```
let nb = new NaiveBayesClassifier();
//do something here...
//...

nb.restore();
//you get a clean model here
```

a test function is included, you can run a simple test with it.
```
let nb = new NaiveBayesClassifier();
nb.test(trainArray, testArray); 
```

## Dependency
this package is pretty clean, no package is used at all. actually, all code is written in lib/classifier.ts.


## Conclusion
we test this package with the spam dataset here: http://csmining.org/index.php/spam-email-datasets-.html
more than 99.5% precision was achieved...


