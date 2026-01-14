window.onload = sendApiRequest;//runs function sendApiRequest when the window is loaded.
var questionNumber=0
var randomNumber=0
var scoreNumber = 0
var a=0
var data
let getApiLink=localStorage.getItem("apiLink")
//adds
let busy = false;
//gets a response and turns it into a json(since the data is a json file)
//fortunately it seems that the url randomizes the question so yeah...that's to our benefit.
async function sendApiRequest() {
    console.log("sendApiRequest being used...");

    // Ensure we aren't "busy" while loading new data
    busy = true; 

    try {
        let response = await fetch(getApiLink);

        if (response.status === 429) {
            console.warn("Too many requests! Retrying in 1 second...");
            setTimeout(sendApiRequest, 1000);
            return;
        }

        data = await response.json();

        if (!data.results || data.results.length === 0) {
            return sendApiRequest(); 
        }

        document.getElementById("card2").style.display = "none";

        // Reset busy to false before showing data so user can click
        busy = false;
        useApiData(data);

    } catch (error) {
        console.error("Fetch error:", error);
        busy = false;
    }
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

    // get answer buttons
    const buttons = Array.from(document.querySelectorAll(".buttonAnswer"));

    randomNumber = getRandomNumber(0, 3);
    console.log(`randomNumber:${randomNumber}`);

    buttons.forEach((element, index) => {
        // clear previous state
        element.classList.remove("correct");
        element.classList.remove("disabled");
        element.classList.remove("fade");
        element.style.backgroundColor = "white";
        delete element.dataset.correct;

        if (index === randomNumber) {
            element.classList.add("correct"); // optional visual marker
            element.dataset.correct = "true";
            element.textContent = data.results[questionNumber].correct_answer;
        } else {
            element.dataset.correct = "false";
            element.textContent = data.results[questionNumber].incorrect_answers[incorrectNo];
            incorrectNo += 1;
        }

        // ensure a single handler that respects the busy/disabled guard
        element.onclick = () => checkandRewardMarks(element);
    });
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
    // ignore if we're already processing or the clicked button is disabled
    if (busy) return;
    if (elementThatIsRequired.classList.contains("disabled")) return;

    busy = true;

    const buttons = document.querySelectorAll(".buttonAnswer");
    buttons.forEach((element) => { 
        if (element.dataset && element.dataset.correct === "true") {
            element.style.backgroundColor = "blue";
        } else {
            element.style.backgroundColor = "red";
        }

        element.classList.add("disabled");
        element.classList.add("fade");
    });

    if (elementThatIsRequired.dataset && elementThatIsRequired.dataset.correct === "true") {
        scoreNumber += 1;
        console.log(scoreNumber);
        document.getElementById("score").innerHTML = `Score: ${scoreNumber}`;
    }

    setTimeout(() => {
        // reset buttons
        document.querySelectorAll(".buttonAnswer").forEach((element) => { 
            element.style.backgroundColor = "white";
            element.classList.remove("disabled");
            element.classList.remove("fade");
            element.classList.remove("correct");
            delete element.dataset.correct;
        });

        // advance question
        if (questionNumber < 9) {
            questionNumber += 1;
            useApiData(data);
            console.log(`Question Number:${questionNumber+1}`);
        } else {
            console.log("Quiz complete!");
            document.getElementById("card").style.display = "none";
            document.getElementById("card2").style.display = "flex";
            document.getElementById("finalScore").innerText = `Final Score:${scoreNumber}`;
           document.getElementById("retry").onclick = () => {
                // 1. Reset variables FIRST
                questionNumber = 0;
                scoreNumber = 0;
                busy = false;

                // 2. Reset UI visibility
                document.getElementById("card").style.display = "flex";
                document.getElementById("card2").style.display = "none";

                // 3. Clear any lingering colors on buttons just in case
                document.querySelectorAll(".buttonAnswer").forEach(btn => {
                    btn.style.backgroundColor = "white";
                    btn.classList.remove("disabled", "fade");
                });

                // 4. Fetch new data
                sendApiRequest();
            };
        }

        busy = false;
    }, 2000);
}