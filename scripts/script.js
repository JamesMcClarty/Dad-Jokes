const fetchJoke = () => {
    fetch("https://icanhazdadjoke.com/", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
        .then(joke => joke.json())
        .then(parsedjoke =>
            document.getElementById("jokeID").innerText = parsedjoke.joke
        )
}

const saveJoke = () => {
    const joke = {
        joke: document.getElementById("jokeID").innerText
    }

    fetch("http://localhost:8088/savedJoke", {
        method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(joke)
    })
    .then(savedData => {
        populateList()
    })
}

const populateList = () => {
    document.getElementById("jokingContainer").innerHTML = ""
    fetch("http://localhost:8088/savedJoke")
        .then(jokes => jokes.json())
        .then(parsedjokes =>
            parsedjokes.forEach(savedjoke => {
                document.getElementById("jokingContainer").innerHTML += `<div class = "jokeListObject">${savedjoke.joke}</div>`
            })
        )
}

fetchJoke();
populateList();
document.getElementById("randomButton").addEventListener("click", fetchJoke)
document.getElementById("saveButton").addEventListener("click", saveJoke)
