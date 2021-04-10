var body = document.querySelector("body");
var h3 = document.querySelector("h3");
var colorLeft = document.querySelector(".colorLeft");
var colorRight = document.querySelector(".colorRight");
var randomBtn = document.getElementById("randomButton");

function setGradient()
{
    body.style.background = "linear-gradient(to right, " + colorLeft.value + ", " + colorRight.value + ")";
    h3.textContent = body.style.background + ";";
}

function getARandomColor()
{
    var hexLetters = '0123456789ABCDEF';
    var hexColor = '#';
    for (i = 0; i < 6; i++) 
    {
        var randNum = Math.floor(Math.random() * 16); 
        hexColor += hexLetters[randNum]; 
    }
    return hexColor;
}

colorLeft.addEventListener('input', setGradient);
colorRight.addEventListener('input', setGradient);

randomBtn.addEventListener('click', function()
{
    colorLeft.value = getARandomColor();
    colorRight.value = getARandomColor();
    setGradient();
});