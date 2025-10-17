let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// Sounds (place your .mp3 files in ./sounds/ folder)
const winSound = new Audio("./sounds/win.mp3");
const loseSound = new Audio("./sounds/lose.mp3");
const drawSound = new Audio("./sounds/draw.mp3");

// Generate computer choice
const genCompChoice = () => {
    const options = ["rock","paper","scissor"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
}

// Particle trail
const createParticle = (x, y) => {
    for(let i=0; i<15; i++){
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.setProperty("--x", (Math.random()-0.5)*200 + "px");
        particle.style.setProperty("--y", (Math.random()-0.5)*200 + "px");
        document.body.appendChild(particle);
        setTimeout(()=> particle.remove(),800);
    }
}

// Confetti
const createConfetti = () => {
    for(let i=0;i<30;i++){
        const confetti = document.createElement("div");
        confetti.classList.add("confetti-piece");
        confetti.style.left = Math.random()*window.innerWidth + "px";
        confetti.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
        document.body.appendChild(confetti);
        setTimeout(()=> confetti.remove(),1000);
    }
}

// Handle Draw
const drawGame = () => {
    msg.innerText = "Draw! Play again";
    msg.style.backgroundColor = "#ffa502";
    msg.style.color = "#000";
    drawSound.play();
}

// Show Winner
const showWinner = (userWin , userChoice , compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        userScorePara.classList.add("win");
        createConfetti();
        winSound.play();
        setTimeout(()=> userScorePara.classList.remove("win"),500);
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
        compScorePara.classList.add("win");
        loseSound.play();
        setTimeout(()=> compScorePara.classList.remove("win"),500);
    }
} 

// Play Game
const playGame = (userChoice, element) => {   
    const compChoice = genCompChoice();

    // Particle trail at click
    const rect = element.getBoundingClientRect();
    createParticle(rect.left + rect.width/2, rect.top + rect.height/2);

    // Flip animation
    element.classList.add("flip");
    setTimeout(()=> element.classList.remove("flip"),600);

    if(userChoice === compChoice){
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") userWin = compChoice === "paper" ? false : true;
        else if (userChoice === "paper") userWin = compChoice === "scissor" ? false : true;
        else if (userChoice === "scissor") userWin = compChoice === "rock" ? false : true;

        showWinner(userWin , userChoice , compChoice);
    }
};

// Event Listeners
choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice, choice);
    });
});

// Reset button
const resetBtn = document.createElement("button");
resetBtn.innerText = "Reset Game";
resetBtn.id = "reset-btn";
document.body.appendChild(resetBtn);

resetBtn.addEventListener("click", ()=>{
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Play your move";
    msg.style.backgroundColor="#081b31";
});
