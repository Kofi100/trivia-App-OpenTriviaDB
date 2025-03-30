
window.onload = sendApiRequest;//runs function sendApiRequest when the window is loaded.
var questionNumber=0
var randomNumber=0
var scoreNumber = 0
var a=0
var data
let getApiLink=localStorage.getItem("apiLink")
//gets a response and turns it into a json(since the data is a json file)
//fortunately it seems that the url randomizes the question so yeah...that's to our benefit.
async function sendApiRequest() {
    console.log("sendApiRequest being used...");
    
    let response = await fetch(getApiLink);

    //code to prevent spamming the API by delaying it by 1 second before sending another Request.
    if (response.status === 429) { // API rate-limited
        console.warn("Too many requests! Retrying in 1 second...");
        setTimeout(sendApiRequest, 1000); // Wait 1 second before retrying
        return;
    }


    data = await response.json();
    console.log(data);
    // if (data.results != null && data.results!=[]) {
    //     useApiData(data)
    // }    else {
    //     sendApiRequest()
    // }

    document.getElementById("card2").style.display = "none"
    
    if (!data.results || data.results.length === 0) {
        console.log("No questions received, retrying...");
        return sendApiRequest(); // Retry without increasing questionNumber
    }
    // questionNumber=0
    useApiData(data)

    
    
}
function useApiData(data) {
    console.log("\nuseApiData being used...");
    
    let category = document.getElementById("category");
    category.innerHTML = `Category:${data.results[questionNumber].category}`
    let difficulty = document.getElementById("difficulty");
    difficulty.innerHTML = `Difficulty:${data.results[questionNumber].difficulty}`
    let question = document.getElementById("question");
    question.innerHTML = `Question:${data.results[questionNumber].question}`
    let score = document.getElementById("score");
    score.innerHTML = `Score:${scoreNumber}`
    let questionNumberTracker = document.getElementById("questionNumberTracker")
    questionNumberTracker.innerHTML = `Question No:${questionNumber + 1}`
    
    
    let incorrectNo = 0;

    let answer1 = document.getElementById("answer1");
    let answer2 = document.getElementById("answer2");
    let answer3 = document.getElementById("answer3");
    let answer4 = document.getElementById("answer4");

    // answer1.innerHTML = `${data.results[questionNumber].correct_answer}`
    randomNumber=getRandomNumber(0, 3)
    console.log(`randomNumber:${randomNumber}`)
    
    // console.log()
    document.querySelectorAll(".buttonAnswer").forEach((element, index) => {
         // Remove any existing event listener before adding a new one
        // element.replaceWith(element.cloneNode(true)); // Removes all event listeners by replacing it with a clone,works like 
        //duplicate resource removal in Godot/Blazium
        //this prevents multiple calls of the click eventListener by keeping only one eventListener added everytime.
        
        if (index == randomNumber) {
            element.classList.add("correct")
            element.innerHTML = `${data.results[questionNumber].correct_answer}`
        }
        else {
            element.innerHTML = `${data.results[questionNumber].incorrect_answers[incorrectNo]}`
            incorrectNo += 1
        }
        // element.addEventListener("click", () => checkandRewardMarks(element))
        
        // Using .onclick ensures only one event is assigned
        //meaning that addEventListener adds one EventListener everytime we run it.
        element.onclick = () => checkandRewardMarks(element);
        
        //()=> near the custom fxn checkandRewardMarks sends this as function reference,
        //preventing it from immediately running.
        // a=0
    })
}
function getRandomNumber(min, max) {
    // number = Math.floor(Math.random() * (max - min)) + min;
    // return Math.floor(Math.random() * max) + min
    //made it return since declaring number as an argument and trying to override it doesnt help.
    //also this code by chat properly returns a random number from these limits
    return Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log("number randomized")
    // console.log(Math.floor(Math.random()*30)+1)
}

function checkandRewardMarks(elementThatIsRequired) {
    // if (a === 0) {
       if (elementThatIsRequired.classList.contains("correct")) {
        scoreNumber += 1;
        console.log(scoreNumber);
        document.getElementById("score").innerHTML = `Score: ${scoreNumber}`;
        elementThatIsRequired.classList.remove("correct");
    }

    incorrectNo = 0;

    // Only increase questionNumber when a button is clicked
    if (questionNumber < 9) {
        questionNumber += 1;
        useApiData(data); // Use the already fetched data instead of refetching
        // sendApiRequest();
        console.log(`Question Number:${questionNumber+1}`);
        
    } else {
        console.log("Quiz complete!");
        document.getElementById("card").style.display = "none"
        document.getElementById("card2").style.display = "flex"
        document.getElementById("finalScore").innerText = `Final Score:${scoreNumber}`
        //on clicking the retry Button,
        document.getElementById("retry").onclick = () => {
            //send another API request
            sendApiRequest()
            //hide the final Score card and show the Question card
            document.getElementById("card").style.display = "flex"
            document.getElementById("card2").style.display = "none"
            //reset the question Number and Score Number.
            questionNumber = 0
            scoreNumber=0
            
        }
        } 
    //  a+=1   
    // }
 
}