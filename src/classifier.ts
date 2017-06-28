
export default class NaiveBayesClassifier {

    setWord: Set<any>;
    mapCategory: Object;
    mapTrainedWordNum: Map<any, any>;
    userFix: Function;


    constructor(fix: Function) {
        this.userFix = fix || NaiveBayesClassifier.fix;
        this.restore();
    }

    /**
     * split input string to words
     * @param text 
     */
    static fix(text: string): Array<string> {
        // add your fix code here...
        return text.split(/[\s+,.]/g).filter(s => !!s);
    }

    /**
     * can be trained whenever you need.
     * @param docs input array e.g. [{category:"A", text: "a,b,c"}]
     * 
     */
    train(docs: Array<any>) {
        docs.forEach(({ category, text }) => {
            let words = this.userFix(text);
            if (category && words && words.length) {
                this.mapCategory[category] || (this.mapCategory[category] = new Map());
                let mapCat = this.mapCategory[category];
                words.forEach(word => {
                    mapCat.set(word, (mapCat.get(word) || 0) + 1);
                    this.mapTrainedWordNum.set(category, (this.mapTrainedWordNum.get(category) || 0) + 1);
                    this.setWord.add(word);
                });
            }
        });
        return this.mapCategory;
    }

    /**
     * calculate probability of one category
     * @param words 
     * @param category 
     */
    getProp(words: Array<string>, category: string): number {
        let localProp = 0;
        let localMapProp = this.mapCategory[category];
        words.forEach(word => {
            localProp += Math.log((1 + (localMapProp.get(word) || 0)) / ((this.mapTrainedWordNum.get(word) || 0) + this.setWord.size));
        });
        return localProp;
    }

    /**
     * categorize on text
     * @param text 
     */
    categorize(text: string): any {
        let words = this.userFix(text);
        let category = Object.keys(this.mapCategory).reduce((ka, kb) => this.getProp(words, ka) > this.getProp(words, kb) ? ka : kb);
        return { category: category, probability: this.getProp(words, category) };
    }

    /**
     * categorize on text array
     * @param textArray 
     */
    categorizeMany(textArray: Array<string>): Array<any> {
        return textArray.map(text => this.categorize(text));
    }

    /**
     * value the precision of your model.
     * @param inputs 
     */
    getPrecision(inputs: Array<any>): number {
        if (inputs.length < 1) return 0;
        let rightNum = 0;
        inputs.forEach(({ category, text }) => {
            rightNum += this.categorize(text).category == category ? 1 : 0;
        });
        return rightNum / inputs.length;
    }

    /**
     * init all
     */
    restore() {
        this.mapCategory = {};
        this.mapTrainedWordNum = new Map();
        this.setWord = new Set();
    }

    /**
     * test script
     * @param trainData 
     * @param testData 
     */
    test(trainData: Array<any>, testData: Array<any>) {
        this.restore();
        this.train(trainData);
        return this.getPrecision(testData);
    }
}