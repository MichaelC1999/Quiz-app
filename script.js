const questionKey= [
  //This array holds questions and which answer is correct
  
  {question: "What is the Capital of Uruguay?", answerNumber: 1},
  {question: "Where is Portugal located?", answerNumber: 2},
  {question: "What is Japan's largest city?", answerNumber: 3},
  {question: "What are the two landlocked countries of South America?", answerNumber: 3},
  {question: "What country does not have territory in two continents?", answerNumber: 0},
  {question: "Which country was part of Yugoslavia?", answerNumber: 2},
  {question: "What is the capital of Kyrgyzstan?", answerNumber: 1},
  {question: "Which country does not contain part of the Amazon rainforest?", answerNumber: 3},
  {question: "Which country borders South Africa?", answerNumber: 3},
  {question: "What country contains 'Tierra del Fuego', the so-called end of the world?", answerNumber: 1}
]

const imageBase=[
  ['https://upload.wikimedia.org/wikipedia/commons/c/cb/Playa_Pocitos.jpg', 'Uruguay'],
  ['https://upload.wikimedia.org/wikipedia/commons/7/7a/Geres1.jpg', 'Portugal'],
  ['https://upload.wikimedia.org/wikipedia/commons/c/c0/Tokyo_Tower_and_around_Skyscrapers.jpg', 'Japan'],
  ['https://upload.wikimedia.org/wikipedia/commons/0/0f/South_America_%28orthographic_projection%29.svg', 'South_America'],
  ['https://upload.wikimedia.org/wikipedia/commons/4/4d/Unisphere-cc.jpg', 'globe'],
  ['https://upload.wikimedia.org/wikipedia/commons/6/61/Flag_of_Yugoslavia_%281946-1992%29.svg', 'Flag_of_Yugoslavia_'],
  ['https://upload.wikimedia.org/wikipedia/commons/7/7e/Ala-too_Square_in_Bishkek%2C_Kyrgyzstan%2C_2007-09-11_%28color-corrected%29.jpg', 'Kyrgyzstan'],
  ['https://upload.wikimedia.org/wikipedia/commons/3/3c/Campo12Foto_2.JPG', 'Amazons'],
  ['https://upload.wikimedia.org/wikipedia/commons/b/be/Strand_Western_Cape_and_Golf_Club.jpg', 'South_Africa'],
  ['https://upload.wikimedia.org/wikipedia/commons/7/7c/Ushuaia6a_%28js%29.jpg', 'Ushuaia']
]

const answers= [
  //This array holds the possible responses to each question
  
  ["Buenos Aires","Montevideo", "Ascuncion", "La Paz"],
  ["Along the pacific ocean","Next to Greece", "Surrounded by Spain and the Atlantic Ocean", "Off the coast of Africa"],
  ["Osaka","Kyoto", "Nagasaki", "Tokyo"],
  ["Peru and Bolivia","Paraguay and Peru", "Colombia and Bolivia", "Bolivia and Paraguay"],
  ["Mexico","Spain", "Turkey", "France"],
  ["Hungary","Armeina", "Montenegro", "Ukraine"],
  ["Almaty", "Bishkek", "Darfur", "Doha"],
  ["Colombia","Ecuador", "Brazil", "Guatemala"],
  ["Rwanda","Kenya", "Ethiopia", "Zimbabwe"],
  ["Brazil","Argentina", "The Philippines", "Spain"]
]

let questionCount=0; 
  //at the start of the quiz, the count starts at 0, once it enters the renderAll(), this count goes up each question
let currentScore=0;
  //Global variable to keep track of the score

function generateStart(){
  //This function generates the start screen
  $('.question').html("How much do you know about the world around you?")

  $('.answers-form').html('<p id="keyboardUsers">This app is also usable for keyboard users! Press tab until you select the first answer, then press the down arrow until you have the desired answer. Once you have your answer, click tab until you select the button, then click enter!</p>')

  //The keyboard message will only be displayed to desktop users
  
  $('#move-on').html('<button id="start" type="submit">Start Quiz</button>')
}

function removeStartElements(){
  //This function removes the elements exclusive to the start screen
  $("#startImage").remove()
  $("#move-on").remove()
}

function enterQuiz(){
  //This function enters the quiz
  $("#move-on").on("click", "#start", event => {
    event.preventDefault()
    console.log("start")
    removeStartElements()
    //starting elements are removed
    updateQNumber()
    //Update the question number in the score bar so the user can track their progress in the application.
    renderAll()
    //This enters the quiz, calling the function that brings up each question, answer, and the screens that make up the quiz
    
  })
}


function updateQNumber(){
  //Update question number in the scoreBar
  
  $('.scoreBar>h2').html('Question '+ (questionCount+1)+ '/' + questionKey.length)
}

function updateScore(){
//Update the score in the scoreBar. 

  $('.scoreBar>h3').html('Your current score is '+currentScore+'/'+(questionCount+1))
}

function renderAll(){
  //This function is called to render each page throughout the quiz
  console.log("Render #"+ (questionCount+1) + " Started")
  
    updateQNumber()

    renderQuestion(questionKey, questionCount);
    //HTML for the current question is rendered
    renderAnswer(answers, questionCount);
    //The answer form is rendered
    renderImage(imageBase, questionCount);
    //renders images
}


  $('body').on('click', '#next', event=>{
    if(questionCount<(questionKey.length-1)){
      ++questionCount
      renderAll()
      
    }
    else{
      console.log("END")
      finalPage()
    }
    
  })




function renderQuestion(questionKey, questionCount){
  //This functions renders the text for the question
  let currentQ = questionKey[questionCount].question
  console.log("current question: " + currentQ)
  $(".question").text(currentQ)
  
}

function renderImage(imageBase, questionCount){
  let imgSrc = imageBase[questionCount][0]
  let imgAlt = imageBase[questionCount][1]

  $('#images').html('<img src="' + imgSrc + '" id="answerImg" alt="' + imgAlt + '">')
}

function renderAnswer(answers, questionCount){
  //This function renders the HTML for the answer form
  let currentA = answers[questionCount]
  console.log("question: "+ questionCount + " " + currentA)

  

  $(".answers-form").html('<form action="">'+
  '<legend><b>Select an answer and then click check</b></legend> '+
  '<input type="radio" name="selection" class="selection" accesskey="1" value=0>1. '+ currentA[0] +'<br>' +
  '<input type="radio" name="selection" class="selection" accesskey="2" value=1>2. '+ currentA[1] +'<br>' +
  '<input type="radio" name="selection" class="selection" accesskey="3" value=2>3. '+ currentA[2] + '<br>'+
  '<input type="radio" name="selection" class="selection" accesskey="4" value=3">4. '+ currentA[3] + '<br>'+

  '<button id="checkAnswer" type="submit">Check</button>'+

'</form>')

}
  


  $(".answers-form").on("click", "#checkAnswer", event => {
    let answerValue=$('input[name="selection"]:checked').val();
    answerValue=parseInt(answerValue)
    console.log("CORRECT ANSWER: " + answers[questionCount][questionKey[questionCount].answerNumber])
    //This logs the correct answer in the console
    
    if(answerValue===questionKey[questionCount].answerNumber){
      //If the users answer is equal to the correct answer
      correctAnswer()
      //Run correctAnswer() function is user is correct
    }
    else{
      wrongAnswer()
      //Run wrongAnswer() function if incorrect
    }
    
    updateScore()
    //update the user's score based on whether the user was correct
  
    answerValue=0;
    //Clear the value from the user's response

    console.log("The score is : " + currentScore)

    $('.answers-form').html('<h3>' + answers[questionCount][questionKey[questionCount].answerNumber] + '</h3><form><button id="next" type="submit">Next</button></form>')
    //Change button to have 'next' id, move on when clicked

    console.log("checkAnswer finished" + questionCount)

  })


function correctAnswer(){
  $('.question').text("Correct!")
  ++currentScore
  //If answer is correct, display text and increment score
}

function wrongAnswer(){
  $('.question').text("Wrong!")
  //If answer is incorrect, display 'Wrong' text and do not increment score
}

function finalPage(){
  console.log("FINAL")
  //Page is rendered after all questions have been cycled
  $('.scoreBar').html('<h2 id="final">Your final score is ' + currentScore + '/' + questionKey.length + '</h2>')
  //Display final score in score bar
  if(currentScore<=5){
    $('.question').text('You need to study more!!!')
    //If user gets 50% or less correct, tell them to study more
  }else{
    $('.question').text('Good job, you know plenty about the world that we live in!')
    //If user gets above 50%, tell them good job
  }

  $('.answers-form').html('<form><button id="start" type="submit">Restart Quiz</button></form>')
  console.log("game ended")
  //Change button to restart button on the final page
}

function runQuiz(){
  //callback function
  generateStart();
  enterQuiz();
  
}

$(runQuiz)