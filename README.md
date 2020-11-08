# NewsDealer

## NLP Filtering Prerequisites
Install the following Python libraries: `nltk`, `gensin`, `numpy`

Download the file containing the **model** from: https://drive.google.com/file/d/0B7XkCwpI5KDYNlNUTTlSS21pQmM/edit
- unzip the `.bin` file
- place the `GoogleNews-vectors-negative300.bin` file under `/python-api` in the working directory

Open a new Python console, navigate to the working directory and run the following commands:
```
import nltk
nltk.download('stopwords')
nltk.download('word_tokenize')
```