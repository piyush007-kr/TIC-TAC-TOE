let btn=document.querySelector("#btn");
let mode=document.querySelector("body");
let boxes=document.querySelectorAll(".box");
let resetGame=document.querySelector("#resetbtn");
let newGame=document.querySelector("#newbtn");
let msg=document.querySelector(".msg");
let msgContainer=document.querySelector(".msg-container");
let color="light";
let cross=true;
let count=0;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6],
];

resetGame.addEventListener("click",()=>{
    cross=true;
    count=0;
    msgContainer.classList.add("hide");
    enableboxes();
});

newGame.addEventListener("click",()=>{
    cross=true;
    count=0;
    msgContainer.classList.add("hide");
    enableboxes();
});
const disabledboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(cross){
            box.innerText="X";
            cross=false;
        }else{
            box.innerText="O";
            cross=true;
        }
        box.disabled = true;
        count++;
        let isWinner=checkwinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
     });   
});

btn.addEventListener("click", () => {
    if(color==="light"){
        color="dark";
        mode.classList.add("dark");
        mode.classList.remove("light");
        btn.innerText="DARK MODE";
    }else{
        color="light";
        mode.classList.add("light");
        mode.classList.remove("dark");
        btn.innerText="LIGHT MODE";
    }
    console.log(color);
});

const showWinner=(winner)=>{
    msg.innerText=`Congratulations , the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledboxes();
}

const checkwinner=()=> {
    for ( let pattern of winPatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        if (pos1val != "" && pos2val != "" && pos3val != "" ){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return true;
            }
        }
    }
};