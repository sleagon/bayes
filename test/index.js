
const expect = require("chai").expect;
const NaiveBayesClassifier = require("../lib/classifier").default;

describe("Test for NaiveBayesClassifier...", function() {
  
  describe("Naivebayes.fix", function() {
    let str = "a,.b c. de,";
    expect(NaiveBayesClassifier.fix(str)).to.deep.equal(["a", "b", "c", "de"]);
  })
  describe("NaiveBayesClassifier.test", function() {
    let train = [{
        category: "1",
        text: "a b c d e"
    },{
        category: "1",
        text: "b c d e"
    },{
        category: "1",
        text: "a e f c c e a"
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

    let test = [{
        category: "1",
        text: "a e f c"
    },{
        category: "2",
        text: "x m t q"
    }];
    let n = new NaiveBayesClassifier();
    expect(n.test(train, test)).to.above(0);
    expect(n.test(train, test)).to.below(1.01);
  })
})