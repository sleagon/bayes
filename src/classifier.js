"use strict";
var Naivebayes = (function () {
    function Naivebayes() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.mapCategory = {};
        this.mapTrainedWordNum = new Map();
        this.setWord = new Set();
    }
    Naivebayes.fix = function (text) {
        // add your fix code here...
        return text.split(/\s+/g);
    };
    Naivebayes.prototype.train = function (docs) {
        var _this = this;
        docs.forEach(function (_a) {
            var cat = _a.category, words = _a.text;
            words = Naivebayes.fix(words);
            if (cat && words && words.length) {
                _this.mapCategory[cat] || (_this.mapCategory[cat] = new Map());
                var mapCat_1 = _this.mapCategory[cat];
                words.forEach(function (word) {
                    mapCat_1.set(word, (mapCat_1.get(word) || 0) + 1);
                    _this.mapTrainedWordNum.set(cat, (_this.mapTrainedWordNum.get(cat) || 0) + 1);
                    _this.setWord.add(word);
                });
            }
        });
        return this.mapCategory;
    };
    Naivebayes.prototype.getProp = function (words, category) {
        var _this = this;
        var localProp = 0;
        var localMapProp = this.mapCategory[category];
        words.forEach(function (word) {
            localProp += Math.log((1 + (localMapProp.get(word) || 0)) / ((_this.mapTrainedWordNum.get(word) || 0) + _this.setWord.size));
        });
        return localProp;
    };
    Naivebayes.prototype.categorize = function (text) {
        var _this = this;
        var words = Naivebayes.fix(text);
        var cat = Object.keys(this.mapCategory).reduce(function (ka, kb) { return _this.getProp(words, ka) > _this.getProp(words, kb) ? ka : kb; });
        return { category: cat, probability: this.getProp(words, cat) };
    };
    return Naivebayes;
}());
exports.__esModule = true;
exports["default"] = Naivebayes;
