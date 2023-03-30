

// displays todays date already filled out in the date input
startDate = new Date()
document.getElementById('current').value = startDate.getFullYear() + '-' + (startDate.getMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
}) + '-' + startDate.getDate()


function calculate() {

    var current = moment();
    var dob = moment('1995-06-15');

    // Calculate the difference in years, months, and days
    var years = current.diff(dob, 'years');
    dob.add(years, 'years');

    var months = current.diff(dob, 'months');
    dob.add(months, 'months');

    var days = current.diff(dob, 'days');

    //-----------

    // stores HTML input type dates into variables
    var currentDate = document.getElementById('current')
    var birthDate = document.getElementById('dob')

    // displays warning when date is not filled
    if (!birthDate.value){
        document.getElementById('warning').style.display = "flex"
    } else {
        document.getElementById('warning').style.display = "none"
    }

    // creates birthDate Date object
    birthDate = new Date(`${birthDate.value}T00:00`);

    // displays results container only if date is filled
    if (birthDate.valueOf()){
        document.getElementById('result-container').style.display = "flex"
    }    

    // this checks if current date has input, if not it creates one
    if (currentDate.value) {
        currentDate = new Date(`${currentDate.value}T00:00`)
    } else {
        currentDate = new Date()
    }

    // checks if bday, if so runs bday function to display confetti
    if (birthDate.getMonth() === currentDate.getMonth() && birthDate.getDate() === currentDate.getDate()) {
        bday()
    }

    var current = moment();
    var birthDateString = birthDate.getFullYear() + '-' + (birthDate.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }) + '-' + birthDate.getDate()
    var dob = moment(birthDateString);

    // Calculate the difference in years, months, and days
    var years = current.diff(dob, 'years');
    dob.add(years, 'years');

    var months = current.diff(dob, 'months');
    dob.add(months, 'months');

    var days = current.diff(dob, 'days');

    document.getElementById('resultYear').value = years;
    document.getElementById('resultMonth').value = months;
    document.getElementById('resultDay').value = days;

 
    // changes plurality of years label when needed
    if (years == 1) {
        document.getElementById('years-label').innerHTML = "Year"
    } else {
        document.getElementById('years-label').innerHTML = "Years"
    }

    // changes plurality of months label when needed
    if (months == 1) {
        document.getElementById('months-label').innerHTML = "Month"
    } else {
        document.getElementById('months-label').innerHTML = "Months"
    }

    // changes plurality of days label when needed
    if (days == 1) {
        document.getElementById('days-label').innerHTML = "Day"
    } else {
        document.getElementById('days-label').innerHTML = "Days"
    }


}

function bday(){

    // Author of original confetti code is Nicholas Suski
    // His Codepen: https://codepen.io/n33kos/pen/gjVQwv 

    //-----------Var Inits--------------
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width / 2;
    cy = ctx.canvas.height / 2;

    let confetti = [];
    const confettiCount = 300;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
    { front: 'red', back: 'darkred' },
    { front: 'green', back: 'darkgreen' },
    { front: 'blue', back: 'darkblue' },
    { front: 'yellow', back: 'darkyellow' },
    { front: 'orange', back: 'darkorange' },
    { front: 'pink', back: 'darkpink' },
    { front: 'purple', back: 'darkpurple' },
    { front: 'turquoise', back: 'darkturquoise' }];


    //-----------Functions--------------
    resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width / 2;
    cy = ctx.canvas.height / 2;
    };

    randomRange = (min, max) => Math.random() * (max - min) + min;

    initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
        color: colors[Math.floor(randomRange(0, colors.length))],
        dimensions: {
            x: randomRange(10, 20),
            y: randomRange(10, 30) },

        position: {
            x: randomRange(0, canvas.width),
            y: canvas.height - 1 },

        rotation: randomRange(0, 2 * Math.PI),
        scale: {
            x: 1,
            y: 1 },

        velocity: {
            x: randomRange(-25, 25),
            y: randomRange(0, -50) } });


    }
    };

    //---------Render-----------
    render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;

        // Move canvas to position and rotate
        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);

        // Apply forces to velocity
        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

        // Set position
        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;

        // Delete confetti when out of frame
        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

        // Loop confetto x position
        if (confetto.position.x > canvas.width) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = canvas.width;

        // Spin confetto by scaling y
        confetto.scale.y = Math.cos(confetto.position.y * 0.1);
        ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

        // Draw confetti
        ctx.fillRect(-width / 2, -height / 2, width, height);

        // Reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    });

    // Fire off another round of confetti
    if (confetti.length <= 10) initConfetti();

    window.requestAnimationFrame(render);
    };

    //---------Execution--------
    initConfetti();
    render();

    //----------Resize----------
    window.addEventListener('resize', function () {
    resizeCanvas();
    });

    //------------Click------------
    window.addEventListener('click', function () {
    initConfetti();
    });
}



