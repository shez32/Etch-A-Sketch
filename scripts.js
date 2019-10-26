let container = document.querySelector('.container');
let row = document.createElement('div');
row.classList.add('row');

let gridDivs;
let menu = document.getElementById('menu');
let currentMode;

function createGrid(x) 
{
    for(let i = 0; i < x; i++)
    {
        container.append(row.cloneNode());
    }

    let rows = document.querySelectorAll('.row');

    rows.forEach((row) => {
        for(let i = 0; i < x; i++)
        {
            let div = document.createElement('div');
            div.classList.add('grid-item');
            div.setAttribute('style',`width: ${100/x}%; padding-top: ${100/x}%;
            float: left;
            outline: 1px solid lightgrey;
            background-color: white;
            filter: brightness(1);`);

            row.appendChild(div);
        }
    })

    gridDivs = document.querySelectorAll('.grid-item');
}

function blackInk(e)
{
    currentMode = blackInk;
    if(e.target.className == "grid-item")
    {
        e.target.style.background = `black`;
    }
}

function getValueBetweenBrackets(value)
{
    let betweenBracketRegex = /\(([^)]+)\)/;
    console.log(`This is value: ${betweenBracketRegex.exec(value)}`)
    return Number(betweenBracketRegex.exec(value)[1]);
}

function shader(e) 
{
    currentMode = shader;
    if(e.target.className == "grid-item")
    {
        if(e.target.style.backgroundColor === 'black' || e.target.style.filter === "brightness(0)")
        {
            return;
        }
        else
        {
            let shade = e.target.style.filter;
            let currentBrightness = getValueBetweenBrackets(shade);
            e.target.style.filter = `brightness(${currentBrightness - 0.1})`;
        }
    }
}

function rainbow(e) 
{
    currentMode = rainbow;

    if(e.target.className == "grid-item")
    {
        e.target.style.filter = 'brightness(1)';
        var randomR = Math.floor(Math.random() * (255 - 0 + 1 ) + 0);
        var randomG = Math.floor(Math.random() * (255 - 0 + 1 ) + 0);
        var randomB = Math.floor(Math.random() * (255 - 0 + 1 ) + 0);
        e.target.style.backgroundColor = `rgba(${randomR}, ${randomG}, ${randomB}, 1)`;
    }
}

function clearGrid()
{
    let size = prompt("Enter a valid size for new grid");

    document.querySelectorAll('.grid-item').forEach(function (e) {
        e.remove();
    });

    document.querySelectorAll('.row').forEach(function (e) {
        e.remove();
    });

    container.removeEventListener('mouseover',currentMode, true);
    
    createGrid(size);
}

menu.addEventListener("click", function (e) {
    container.removeEventListener('mouseover',currentMode,true);

    if(e.target.id == "blackInk")
    {
        currentMode = blackInk;
        container.addEventListener("mouseover", blackInk, true);
    }

    if(e.target.id == "shader")
    {
        currentMode = shader;
        container.addEventListener("mouseover", shader, true);
    }

    if(e.target.id == "rainbow")
    {
        currentMode = rainbow;
        container.addEventListener("mouseover", rainbow, true);
    }
})



document.onload = createGrid(16);
