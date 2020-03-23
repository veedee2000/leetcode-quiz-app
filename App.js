const checks = document.querySelectorAll('.checkbox');
const menu = document.querySelector('.menu');
const topicButton = document.querySelector('.topic-button');

const quiz = document.querySelector('.quiz');
const timer = document.querySelector('.timer');
const timerEnd = document.querySelector('.timer-end');

const tick = '\u2705';
const wrong = '\u274C';

let givenTopicArray = ['Greedy','Dynamic Programming','Binary Search','Tree','DFS','BFS','Heap'];
let topicArray = [];
checks.forEach((name,index) =>{
    const currentCheckBox = name.querySelector('input');
    currentCheckBox.addEventListener('change',e =>{
        if(currentCheckBox.checked == 0){
            for(let i = 0;i < topicArray.length;i++){
                if(topicArray[i] === givenTopicArray[index]) topicArray.splice(i,1);
            }
        }
        else if(topicArray.length === 3){
            alert('Max 3 topics at a time');
            currentCheckBox.checked = 0;
        }
        else topicArray.push(givenTopicArray[index]);
    });
});

let timeNow = 1.5 * 60 * 60;
let hour,minute,second,addHour,addMinute,addSecond;

topicButton.addEventListener('click',e => {
    menu.classList.add('d-none');
    quiz.classList.remove('d-none');
    timer.classList.remove('d-none');
    const startTimer = setInterval(() => {
        hour = Math.floor(timeNow / 3600);
        minute = Math.floor((timeNow - (hour * 3600)) / 60);
        second = timeNow - (hour * 3600) - (minute * 60);
        
        addHour = `0${hour}`;
        if(minute < 10) addMinute = `:0${minute}`;
        else addMinute = `:${minute}`;
        if(second < 10) addSecond = `:0${second}`;
        else addSecond = `:${second}`;

        timer.querySelector('span').innerText = addHour + addMinute + addSecond;
        if(timeNow === 599){
            timer.querySelector('span').classList.remove('bg-dark');
            timer.querySelector('span').classList.add('bg-danger');
        }

        if(timeNow === 0){
            clearInterval(startTimer);
            timer.classList.add('d-none');
            timerEnd.classList.remove('d-none');
        }
        timeNow--;
    },1000);
});

const correctAnswers = ['1','1','2'];
const user = document.querySelectorAll('input');
const marks = document.querySelectorAll('.assign-mark');
let remaining = 3;

user.forEach((name,index) =>{
    if(name.type === 'submit'){
        name.addEventListener('click',e =>{
            e.preventDefault();
            if(user[index - 1].value === correctAnswers[(index - 8) / 2]){
                marks[(index - 8) / 2].textContent = tick;
                user[index - 1].disabled = "disabled";
                // if(--remaining === 0)  
            }
            else{
                marks[(index - 8) / 2].textContent = wrong;
            }
        });
    }
});

