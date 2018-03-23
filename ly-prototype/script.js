var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var actionsRepo = {
  start: 'start',
  reset: 'reset',
  end: 'end',
  finish: 'finish',
  set: 'set',
  new: 'new'
};

var objectsRepo = {
  game: 'game'
};

var newGame = {
  action: `<newGameAction> = ${actionsRepo.new} | ${actionsRepo.start};`,
  object: `<newGameObject> = ${objectsRepo.game};`
};
var commands = {
  newGame: `<newGameCommand> = <newGameAction> <newGameObject>`
}


var phrasePara = document.querySelector('.phrase');
var resultPara = document.querySelector('.result');
var diagnosticPara = document.querySelector('.output');

var testBtn = document.querySelector('button');

function testSpeech() {
  testBtn.disabled = true;
  testBtn.textContent = 'Test in progress';

  // var phrase = phrases[randomPhrase()];
  phrasePara.textContent = `${commands.newGame}`;
  resultPara.textContent = 'Right or wrong?';
  resultPara.style.background = 'rgba(0,0,0,0.2)';
  diagnosticPara.textContent = '...diagnostic messages';

  // var grammar = `#JSGF V1.0; grammar newGame.action; public ${newGame.action}
  // #JSGF V1.0; grammar newGame.object; public ${newGame.object}
  // #JSGF V1.0; grammar newGame.command; import newGame.object; newGame.action; public ${commands.newGame}
  // `;

  var commandsForGame = [
    'new',
    'start',
    'game',
    'player',
    'one',
    'two',
    'point',
    'score',
    'reset',
    'set',
    'limit',
    'eleven',
    '11',
    '1',
    '2',
    'ly',
    'daniel',
    'tommy',
    'what',
    'current',
    'winning',
    'losing',
    'who',
    'is',
    'leigh',
    'lee',
    'ly',
    'won'
  ]
  
  var grammar = `#JSGF V1.0; grammar command; public <newGameCommand> = ${commandsForGame.join(' | ')}`;
  

console.log('grammar', grammar);

  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-AU';
  recognition.interimResults = false;
  recognition.maxAlternatives = 2;

  recognition.start();

  recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object 
    console.log('event', event.results);
    var speechResult = event.results[0][0].transcript;
    // console.info('onSResult', speechResult);

    diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
    // if(speechResult === phrase) {
    //   resultPara.textContent = 'I heard the correct phrase!';
    //   resultPara.style.background = 'lime';
    // } else {
    //   resultPara.textContent = 'That didn\'t sound right.';
    //   resultPara.style.background = 'red';
    // }

    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
  }

  recognition.onerror = function(event) {
    console.log('onError: ', event);

    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }
  
  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend');
  }
  
  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }
  
  recognition.onsoundstart = function(event) {
      //Fired when any sound � recognisable speech or not � has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }
  
  recognition.onsoundend = function(event) {
      //Fired when any sound � recognisable speech or not � has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }
}

testBtn.addEventListener('click', testSpeech);
