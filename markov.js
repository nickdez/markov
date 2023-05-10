class MarkovMachine {

    constructor(text) {
        this.words = text.split(/[ \r\n]+/).filter(c => c !== "");
        this.chains = {};
        this.makeChains();
    }

    makeChains() {
        for (let i = 0; i < this.words.length; i++) {
            let word = this.words[i];
            let nextWord = this.words[i + 1] || null;

            if (this.chains.hasOwnProperty(word)) {
                this.chains[word].push(nextWord);
            } else {
                this.chains[word] = [nextWord];
            }
        }
    }

    static choice(ar) {
        return ar[Math.floor(Math.random() * ar.length)];
    }

    makeText(numWords = 100) {
        let keys = Object.keys(this.chains);
        let key = MarkovMachine.choice(keys);
        let out = [];

        while (out.length < numWords && key !== null) {
            out.push(key);
            key = MarkovMachine.choice(this.chains[key]);
        }

        return out.join(" ");
    }
}

module.exports = {
    MarkovMachine,
};
