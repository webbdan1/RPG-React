import { useState } from 'react';
import './App.css';
import Wordlist from './wordlist.js'

import Checkbox from './components/Checkbox';

function App() {
  const [passwordGen, setPasswordGen] = useState({
    length: 16,
    passphrase: false,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [handelText, setHandelText] = useState('');
  const [copied, setCopied] = useState(false);

function getDefaultLen() {
  if (passwordGen.passphrase){
    return 16;
  }
  return 3;
}

  const handleChangePassphrase = () => {
    setPasswordGen({
      ...passwordGen,
      passphrase: !passwordGen.passphrase,
      length: getDefaultLen()


    });

  };

  const handleChangeUppercase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };

// Cryptographic replacement for Math.random()
function randomNumberBetweenZeroAndOne() {
  var crypto = window.crypto || window.msCrypto;
  return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { passphrase, length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : [])
      ];

      // Empty array to be filled with wordlist
      var generatedPasswordArray = [];
      // Grab a random word, push it to the password array
      for (var j = 0; j < parseInt(length); j++) {
          var wordIndex = Math.floor(randomNumberBetweenZeroAndOne() * availableCharacters.length);
          generatedPasswordArray.push(availableCharacters[wordIndex]);
      }
      setHandelText(generatedPasswordArray.join(''));
      return generatedPasswordArray;
    };

    const generateThePhrase = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
        const lowerSrc = Wordlist();
        const upperSrc = [];
        for (var i = 0; i < lowerSrc.length; i++) {
          var word = lowerSrc[i];
          var firstLetter = word.charAt(0);
          var firstLetterCap = firstLetter.toUpperCase();
          var remainingLetters = word.slice(1);
          var capitalizedWord = firstLetterCap + remainingLetters;
          upperSrc.push(capitalizedWord);
        }

      const availableCharacters = [
        ...(lowercase ? lowerSrc : []),
        ...(uppercase ? upperSrc : []),
      ];

      const availableNumbers = [
        ...(numbers ? numbersArray : [])
      ]

      const availableSymbols = [
        ...(symbols ? symbolsArray : [])
      ]

      // Empty array to be filled with wordlist
      var generatedPasswordArray = [];
      // Grab a random word, push it to the password array
      for (var j = 0; j < parseInt(length); j++) {
          var wordIndex = Math.floor(randomNumberBetweenZeroAndOne() * availableCharacters.length);
          var numIndex = Math.floor(randomNumberBetweenZeroAndOne() * numbersArray.length);
          var symIndex = Math.floor(randomNumberBetweenZeroAndOne() * symbolsArray.length);
          var totalWord='';
          if (availableCharacters.length){
            totalWord = totalWord + availableCharacters[wordIndex];
          }
          if (availableNumbers.length){
             totalWord = totalWord + availableNumbers[numIndex];
          }
          if (availableSymbols.length){
             totalWord = totalWord + availableSymbols[symIndex];
          }
          generatedPasswordArray.push(totalWord);
      }

      if (!numbers && !symbols && !uppercase && !lowercase){
        setHandelText('');
        return '';
      }
      setHandelText(generatedPasswordArray.join('-'));
      return generatedPasswordArray;
    };

    if (passphrase){
        generateThePhrase(length, uppercase, lowercase, numbers, symbols);
    }
    else{
        generateTheWord(length, uppercase, lowercase, numbers, symbols);
    }



  }


function facebook(purl, ptitle, pimg, text) {
    var url = 'http://www.facebook.com/sharer.php?s=100';
    url += '&p[title]=' + encodeURIComponent(ptitle);
    url += '&p[summary]=' + encodeURIComponent(text);
    url += '&p[url]=' + encodeURIComponent(purl);
    url += '&p[images][0]=' + encodeURIComponent(pimg);
    popup(url);
}

function twitter(purl, ptitle) {
    var url = 'http://twitter.com/share?';
    url += 'text=' + encodeURIComponent(ptitle);
    url += '&url=' + encodeURIComponent(purl);
    url += '&counturl=' + encodeURIComponent(purl);
    popup(url);
}

function popup(url) {
    window.open(url,'','toolbar=0,status=0,width=626, height=436');
}

  return (
    <div className="wrapper">
      <div className="container wrapper-box">

        <h1>Secure Offline Password / Passphrase Generator</h1>

        <hr class="solid"/>
        <br/>

        <div className="password-box">
          <input
            type="text"
            value={handelText}
            placeholder=""
            autoComplete="off"
            onChange={(e) => setHandelText(e.target.value)}
          />
          <button
            className="copy-button"
            onClick={() => {
              if (handelText.length > 0) {
                navigator.clipboard.writeText(handelText);
                setCopied(true);
                setInterval(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
          >
            {copied ? 'Copied!' : 'Copy text'}
          </button>
        </div>

        <br />

        <div className="word-crieteria__box">
          <div>
            <label>Length</label>
          </div>
          <div>
                <select name="length" length
                value={passwordGen.length}
                onChange={(e) => setPasswordLength(parseInt(e.target.value))}>
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16" selected>16</option>
                <option value="20">20</option>
                <option value="24">24</option>
                <option value="28">28</option>
                <option value="32">32</option>
                </select>
          </div>
        </div>

          <div className="word-crieteria__box">
              <div>
                <label>Generate Passphrase?</label>
              </div>
              <div>
                <Checkbox
                  value={passwordGen.passphrase}
                  onChange={handleChangePassphrase}
                />
              </div>
          </div>

        <div className="word-crieteria__box">
          <div>
            <label>Include uppercase letters? [A - Z]</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.uppercase}
              onChange={handleChangeUppercase}
            />
          </div>
        </div>

        <div className="word-crieteria__box">
          <div>
            <label>Include lowercase letters? [a - z]</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.lowercase}
              onChange={handleChangeLowercase}
            />
          </div>
        </div>

        <div className="word-crieteria__box">
          <div>
            <label>Include numbers? [0 - 9]</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.numbers}
              onChange={handleChangeNumbers}
            />
          </div>
        </div>

        <div className="word-crieteria__box">
          <div>
            <label>Include symbols? [!, @, #, $, %, ^, &, *, (, )]</label>
          </div>
          <div>
            <Checkbox
              value={passwordGen.symbols}
              onChange={handleChangeSymbols}
            />
          </div>
        </div>

        <div>
          <button className="generate-button" onClick={generatePassword}>
            Generate password
          </button>
        </div>

        <br />
          <hr class="solid"/>
        <br />

        <div className="about__box">
            Passwords / Passphrases are securely generated on your machine, meaning no data is sent over the internet. Strong passwords
            should not be memorable and should be changed frequently. Store in your favorite password manager to avoid
            the need to remember the password.
        </div>

        <br />

        <div className="share__box">
                <a href="http://www.facebook.com/sharer/sharer.php?s=100&p%5Btitle%5D=TITLE&p%5Bsummary%5D=DESC&p%5Burl%5D=URL&p%5Bimages%5D%5B0%5D=IMG_PATH"
                onClick={facebook}>Share tool on Facebook</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Ffiddle.jshell.net%2F_display%2F&text=TITLE&url=URL"
                onClick={twitter}>Share tool on Twitter</a>
        </div>

        <h2>
            Here are some password managers we suggest:
        </h2>

        <p>
            <a href="https://bitwarden.com/"> Bitwarden - Zero-knowledge password manager</a>
        </p>

        <p>
            <a href="https://1password.com/"> Dashlane - includes auto password-changing feature </a>
        </p>
        <br /><br /><br />
        <hr class="solid"/>
        <p>© Copyright <a href="https://securerandompassword.net/"> securerandompassword.net </a></p>

     </div>

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3433354412786219" crossorigin="anonymous"></script>

    </div>

  );

}

export default App;
