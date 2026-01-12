// window.location.href = "page2.html";
let category = "none"
let apiLink=""//`https://opentdb.com/api.php?amount=10&category=21&type=multiple`

document.getElementById("sports").onclick = () => {
    // category = "sports"
    apiLink = `https://opentdb.com/api.php?amount=10&category=21&type=multiple`
    localStorage.setItem("apiLink", apiLink)
    window.location.href = "quiz-page.html"
    
    
    
}
document.getElementById("art").onclick = () => {
    apiLink = `https://opentdb.com/api.php?amount=10&category=25&type=multiple`
    localStorage.setItem("apiLink", apiLink)
    window.location.href = "quiz-page.html"
}

document.getElementById("geography").onclick = () => {
    apiLink = `https://opentdb.com/api.php?amount=10&category=22&type=multiple`
    localStorage.setItem("apiLink", apiLink)
    window.location.href = "quiz-page.html"
}

document.getElementById("history").onclick = () => {
    apiLink=`https://opentdb.com/api.php?amount=10&category=23&type=multiple`
    localStorage.setItem("apiLink", apiLink)
    window.location.href = "quiz-page.html"
}

document.getElementById("celebrities").onclick = () => {
    apiLink = `https://opentdb.com/api.php?amount=10&category=26&type=multiple`
    localStorage.setItem("apiLink", apiLink)
    window.location.href = "quiz-page.html"
}
document.getElementById("allCategory").onclick = () => {
   apiLink=`https://opentdb.com/api.php?amount=10&type=multiple`
    localStorage.setItem("apiLink", apiLink)
    window.location.href = "quiz-page.html"
}

document.getElementById("generalKnowledge").onclick = () => {
    apiLink = `https://opentdb.com/api.php?amount=10&category=9&type=multiple`
     localStorage.setItem("apiLink", apiLink)
     window.location.href = "quiz-page.html"
}
document.getElementById("scienceAndNature").onclick = () => {
     apiLink=`https://opentdb.com/api.php?amount=10&category=17&type=multiple`
     localStorage.setItem("apiLink", apiLink)
     window.location.href = "quiz-page.html"
}


document.getElementById("entertainmentVideoGames").onclick = () => {
    apiLink = `https://opentdb.com/api.php?amount=10&category=15&type=multiple`
    localStorage.setItem("apiLink", apiLink)
    window.location.href = "quiz-page.html"
}

