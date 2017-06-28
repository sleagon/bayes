export default class NaiveBayesClassifier {
    setWord: Set<any>;
    mapCategory: Object;
    mapTrainedWordNum: Map<any, any>;
    constructor(...args: any[]);
    /**
     * split input string to words
     * @param text
     */
    static fix(text: string): Array<string>;
    /**
     * can be trained whenever you need.
     * @param docs input array e.g. [{category:"A", text: "a,b,c"}]
     *
     */
    train(docs: Array<any>): Object;
    /**
     * calculate probability of one category
     * @param words
     * @param category
     */
    getProp(words: Array<string>, category: string): number;
    /**
     * categorize on text
     * @param text
     */
    categorize(text: string): any;
    /**
     * categorize on text array
     * @param textArray
     */
    categorizeMany(textArray: Array<string>): Array<any>;
    /**
     * value the precision of your model.
     * @param inputs
     */
    getPrecision(inputs: Array<any>): number;
    /**
     * init all
     */
    restore(): void;
    /**
     * test script
     * @param trainData
     * @param testData
     */
    test(trainData: Array<any>, testData: Array<any>): number;
}
