
let poke_stat = document.querySelectorAll('.stats');//select all the stats of the tomagochi
for(let i=0;i<poke_stat.length;i++){
    decreaseStat(poke_stat[i]);
}

let button_interact = document.querySelectorAll('.interact');
for(let i=0;i<button_interact.length;i++){
    increaseStat(button_interact[i]);
}

function decreaseStat(element){
    let percent = parseInt(element.textContent);
    let currentBar = element.nextElementSibling.nextElementSibling;
    let barWidth= currentBar.offsetWidth;
    let interactive_button = element.nextElementSibling;
    let timeInSec=0;
        let timerDecrease = setInterval(function () {
            if (percent != 0) {
                if (element.getAttribute('id') == 'stat_1') {
                    percent -= 2;
                    barWidth -= 4;
                }
                if (element.getAttribute('id') == "stat_2") {
                    percent -= 0.5;
                    barWidth -= 1;
                }
                if (element.getAttribute('id') == "stat_3") {
                    percent -= 1;
                    barWidth -= 2;
                }
                element.innerText = percent + "%";
                currentBar.style.width =""+barWidth+"px";
                if(percent<15){
                    currentBar.style.backgroundColor="red";
                    currentBar.style.transition="0.8s";
                }
                else{
                    currentBar.style.backgroundColor="green";
                    currentBar.style.transition="0.8s";
                }
            }


            if(percent<0){
                clearInterval(timerDecrease);
                element.innerText ="0%";
                currentBar.style.width ="0px";
            }
        }, 10000);

    //onclick on buttons, stop the timer then restart it
    interactive_button.addEventListener('click', function () {
        clearInterval(timerDecrease);
        if(percent==0){
            increaseStat(element);
        }
    })
}

function increaseStat(element){
        let pika_blabla= document.querySelector('#pika_blabla');
        element.addEventListener('click',function (e){
        e.preventDefault();

        let statElement = element.previousElementSibling;//get the element decreasing
        let currentBar = element.nextElementSibling;

        if(element.getAttribute('id')=="feed") {
            if(statElement.textContent !="100%")
                pika_blabla.innerHTML="PIKA PIKA PIKA!";

            setTimeout(()=>{
                pika_blabla.innerHTML="";
            },3000);

            increaseBar(currentBar,statElement, 2, 4);//up bar progress
        }
        else if(element.getAttribute('id')=="sleep"){
            increaseSleepBarAndPercentage(statElement, currentBar);

        }
        else if(element.getAttribute('id')=="play"){
            increaseBar(currentBar,statElement, 1, 2);//up bar progress
        }
    })
}

function increaseBar(currentBar, statElement , percent, pixels){
    let barWidth=currentBar.offsetWidth;//get size of the actual bar progress
    maxSeconde=10;//duration in second for the increasing
    let actualPercent=statElement.textContent;
    actualPercent=parseInt(actualPercent);

    if(currentBar.offsetWidth<200){
        let timerBar=setInterval(() =>{
            currentBar.style.width=barWidth+"px";
            currentBar.style.height="20px";
            statElement.innerText =actualPercent+"%";

            if(barWidth>200){
                clearInterval(timerBar);
                currentBar.style.width="200px";
                statElement.innerText ="100%";
            }
            if(actualPercent>=15){
                currentBar.style.backgroundColor="green";
                currentBar.style.transition="0.8s";
            }

            //break the timer
            if(maxSeconde==0 || statElement.textContent=="100%" || barWidth.offsetWidth==200){
                clearInterval(timerBar);
                decreaseStat(statElement);//relance la décrémentation
            }
            maxSeconde--;
            actualPercent+=percent;
            barWidth+=pixels;
        },200)
    }
}

function  clearAllInterval(interval){
        let image_src=document.querySelector('#pikachu');
        image_src.setAttribute('src',"image/pikachu/die.png");
        clearInterval(interval);
}

function increaseSleepBarAndPercentage(percent, gauje){

}