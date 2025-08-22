const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for multiplication sign (×)
        li.appendChild(span); 
    }
    inputBox.value = "";
    saveDAta();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveDAta();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveDAta();
    }
}, false);

function saveDAta(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();


let countdownInterval;

function startCountdown() {
    clearInterval(countdownInterval);
    let deadline = new Date(document.getElementById("deadline").value).getTime();

    countdownInterval = setInterval(function() {
        let now = new Date().getTime();
        let distance = deadline - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").textContent = "⏰ Time’s up!";
            return;
        }

        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").textContent = 
            `${hours}h ${minutes}m ${seconds}s remaining`;
    }, 1000);
}

