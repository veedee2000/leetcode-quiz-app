const startButton = document.querySelector('.start-button');
const guidlines = document.querySelector('.guidlines');

const quiz = document.querySelector('.quiz');
const timer = document.querySelector('.timer');
const timerEnd = document.querySelector('.timer-end');
const congratulation = document.querySelector('.congratulation')

let selectedQuestions = [];
let correctAnswers = [];
const user = document.querySelectorAll('input');
let remaining = 3;
const questions = document.querySelectorAll('.questions');

// // Fading 

// $(document).ready(function (){
//     AOS.init({
//         easing: 'ease',
//         duration: 1000
//     });
// });

const intro = document.querySelector('.intro');
const outro = document.querySelector('.outro');
const endResult = document.querySelector('.end-result');
const endForce = document.querySelector('.end-force');
const star = document.querySelector('.star');

// Initailizing timevariables ----------------------------------

let timeNow = 60 * 15;
let hour,minute,second,addHour,addMinute,addSecond;

// Disabling tab change -----------------------------------------

// $(window).blur(function() {
//     if(timeNow > 0 && !(timer.classList.contains('d-none'))){
//         alert('You have been disqualifeid due to changing tabs');
//         location.reload();
//     }
//  });

 // Main Page Button ----------------------------------------------

startButton.addEventListener('click',e => {
    guidlines.classList.add('d-none');
    quiz.classList.remove('d-none');
    timer.classList.remove('d-none');
    let sz = 0;
    while(sz < 3){
        let val = Math.floor(Math.random() * 8);
        if(selectedQuestions.length > 0 && selectedQuestions.includes(val)) continue;
        else{
            selectedQuestions.push(val);
            correctAnswers.push(q[val].answer);
            questions[sz].innerText = q[val].statement;
            sz++;
        }
    }

    // Timer Function  -------------------------------------------------

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
        if(timeNow === 299){
            timer.querySelector('span').classList.remove('bg-dark');
            timer.querySelector('span').classList.add('bg-danger');
        }

        if(timeNow === 0){
            timer.classList.add('d-none');
            user.forEach((name,index) =>{
                if(name.type === 'text'){
                    name.disabled = 'disabled'; 
                }
            });
            intro.classList.add('d-none');
            quiz.classList.add('d-none');
            star.classList.remove('d-none');
            star.classList.add('bounceIn');
            star.classList.add('animated');
            if(remaining > 0){
                outro.classList.remove('d-none');
                timerEnd.classList.remove('d-none');
                outputMissed();
            }
            else congratulation.classList.remove('d-none');
            clearInterval(startTimer);
        }
        timeNow--;
    },1000);
    });

    endForce.addEventListener('click',() => {
        timeNow = 0;
    });

// Answer Checker Event Handler----------------------------------------

user.forEach((name,index) =>{
    if(name.type === 'submit'){
        name.addEventListener('click',e =>{
            e.preventDefault();
            if(correctAnswers[(index - 1) / 2].includes(user[index - 1].value)){
                remaining--;
                eachCorrect(index)
                if(remaining === 0){
                    timeNow = 0;
                }
            }
            else{
                eachWrong(index);
            }
        });
    }
});

const eachCorrect = (i) =>{
    user[i - 1].disabled = "disabled";
    questions[(i - 1)/ 2].classList.add('bg-success');
    if(questions[(i - 1)/ 2].classList.contains('bg-danger')){
        questions[(i - 1)/ 2].classList.remove('bg-danger');
    }
    else{
        questions[(i - 1)/ 2].classList.add('p-2');
        questions[(i - 1)/ 2].classList.add('round-large');
    }
};

const eachWrong = (i) =>{
    if(!(questions[(i - 1)/ 2].classList.contains('bg-danger'))){
        questions[(i - 1)/ 2].classList.add('bg-danger');
        questions[(i - 1)/ 2].classList.add('p-2');
        questions[(i - 1)/ 2].classList.add('round-large');
    }
};

const outputMissed = () =>{
    user.forEach((name,index) =>{
        if(name.type === 'text'){
            if(!correctAnswers[index / 2].includes(name.value)){
                endResult.innerHTML += `<p style="font-size: large;" class="p-3">Q${(index / 2) + 1} : Correct Answer = ${correctAnswers[index / 2][0]}</p>`
            }
        }
    });
};



// Questions ------------------------------------------------


const q = [
    {
        statement: `
            int i, j, k = 0; 
            for (i = n / 2; i <= n; i++) { 
                for (j = 2; j <= n; j = j * 2) { 
                    k = k + n / 2; 
                } 
            }
                    `,
        answer: [`nlogn`]
    },
    {
        statement:`
            int a = 0, i = N; 
            while (i > 0) { 
                a += i; 
                i /= 2; 
            }
                    `,
        answer: [`logn`]
    },
    {
        statement:`     
                    { 3T(n-1), if n>0 },
            T(n) =   
                    { 1, otherwise }
                        `,
        answer: [`3^n`]
    },
    {
        statement: `    
                    { 2T(n-1) - 1, if n>0 },
            T(n) =   
                    { 1, otherwise }
                    `,
        answer: [`1`,1]
    },
    {
        statement: `
            class Base1 { 
                public: 
                    Base1() 
                    { cout << " Base1's constructor called,";  } 
            }; 
                
            class Base2 { 
                public: 
                    Base2() 
                    { cout << "Base2's constructor called,";  } 
            }; 
                
            class Derived: public Base1, public Base2 { 
                public: 
                    Derived() 
                    {  cout << "Derived's constructor called,";  } 
            }; 
                
            int main() 
            { 
                Derived d; 
                return 0; 
            }
                    `,
        answer: [`Base1’s constructor called,Base2’s constructor called,Derived’s constructor called,`]
        
    },
    {
        statement:`
            You are climbing a stair case. It takes n steps to reach to the top.

            Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
            
            Note: Given n will be a positive integer.
            
            Example 1:
            
            Input: 2
            Output: 2
            Explanation: There are two ways to climb to the top.
            1. 1 step + 1 step
            2. 2 steps
            
            Example 2:
            
            Input: 3
            Output: 3
            Explanation: There are three ways to climb to the top.
            1. 1 step + 1 step + 1 step
            2. 1 step + 2 steps
            3. 2 steps + 1 step

            Calculate the number of ways to climb 35 stairs.
                    `,
        answer: ['14930352']
    },
    {
        statement:`
            Given two strings text1 and text2, return the length of their longest common subsequence.
            A subsequence of a string is a new string generated from the original string with some characters(can be none) deleted without changing the relative order of the remaining characters. (eg, "ace" is a subsequence of "abcde" while "aec" is not). A common subsequence of two strings is a subsequence that is common to both strings.
            If there is no common subsequence, return 0.

            Example 1:

            Input: text1 = "abcde", text2 = "ace" 
            Output: 3  
            Explanation: The longest common subsequence is "ace" and its length is 3.

            Example 2:

            Input: text1 = "abc", text2 = "abc"
            Output: 3
            Explanation: The longest common subsequence is "abc" and its length is 3.

            Find the LCS for :-
                "papmretkborsrurgtina"
                "nsnupotstmnkfcfavaxgl"
                    `,
        answer: ['6']
    },
    {
        statement:`
            A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
            The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
            How many possible unique paths are there?

            Example 1:

            Input: m = 3, n = 2
            Output: 3

            Explanation:
            From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
            1. Right -> Right -> Down
            2. Right -> Down -> Right
            3. Down -> Right -> Right

            Example 2:

            Input: m = 7, n = 3
            Output: 28

            Find the result for m = 11, n = 5
                    `,
        answer: [`1001`]
    }
];