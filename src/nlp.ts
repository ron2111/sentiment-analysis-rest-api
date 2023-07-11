// @ts-ignore
import aposToLexForm from "apos-to-lex-form";
import { WordTokenizer, SentimentAnalyzer, PorterStemmer } from "natural";
// @ts-ignore
import SpellCorrector from "spelling-corrector";
import stopword from "stopword";

const tokenizer = new WordTokenizer();
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn"); // sentiment analyzer
// afinn - dependancy

export function getSentiment(str: string){ 
  if (!str.trim() || str=='null') {
    return 0; // empty string
  }
  
 
  const lexed = aposToLexForm(str) // you're to your are
    .toLowerCase()
    .replace(/[^a-zA-Z\s]+/g, ""); // removes special char

  
  const tokenized = tokenizer.tokenize(lexed);
// tokenize the word - string to char Array


  const fixedSpelling = tokenized.map((word) => spellCorrector.correct(word));

  const stopWordsRemoved = stopword.removeStopwords(fixedSpelling);

   const analyzed = analyzer.getSentiment(stopWordsRemoved);

  console.log(analyzed)
 

  // if (analyzed >= 1) return 1; // positive
  // if(analyzed>0 && analyzed <1) return analyzed;
  // if (analyzed === 0) return 0; // neutral
  // return -1; // negative
  return analyzed;
}
// getSentiment("Hello, worst experience!!!!");