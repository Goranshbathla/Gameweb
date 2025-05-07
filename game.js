const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

canvas.style.backgroundColor= "#1F3F49";

let life=10;
class bubbles{
    constructor(){
        this.x= 100 + (Math.random()*(canvas.width-180))
        this.y=40
        this.radius=30
        this.character = Ques[Math.floor(Math.random() * 52)];
        this.color = this.getRandomColor();
    }
    getRandomColor() {
         const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    draw() {
        context.font = "20px Arial";
        context.textAlign = "center"; 
        context.textBaseline = "middle"; 
        context.beginPath();

        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();

        context.strokeStyle = "#CED2CC";
        context.stroke();

        context.fillStyle = "#ffffff";
        context.fillText(this.character, this.x, this.y);
        context.closePath();
    }
    update() {
        this.y += 2; 
        this.draw();
    }
}

let bubblesArray =[];

let Ques=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

setInterval(() => {
    let bubble = new bubbles();
    bubblesArray.push(bubble);
}, 1900);

addEventListener("keydown", function (event) {
    if (life <= 0 && event.key === "Enter") {
        window.location.reload();
    }

    for (let i = 0; i < bubblesArray.length; i++) {
        if (event.key === bubblesArray[i].character) {
            bubblesArray.splice(i, 1);
            break;
        }
    }
});


function updateAnimation() {
    context.clearRect(0, 0, canvas.width, canvas.height);   
    context.fillStyle="green";

    context.font = "50px Arial";
        context.textAlign = "center"; 
        context.textBaseline = "middle";
    context.fillText(life,50,50)
    
    for(let i=0;i<bubblesArray.length;i++){
    bubblesArray[i].update(); 


        if(bubblesArray[i].y>=canvas.height){
            life--;
            bubblesArray.splice(i,1);
        }
    }


    if(life<=0){
        context.font = "80px Arial";
        context.textAlign = "center"; 
        context.textBaseline = "middle"; 
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText("YOU LOST,CLICK ENTER TO RESTART",canvas.width/2,canvas.height/2)
        return;
    }
   


    requestAnimationFrame(updateAnimation);
}

updateAnimation();