window.addEventListener('load', function() {
    
	// module aliases
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

    const WIDTH = 1000;
    const HEIGHT = 600;
    // create an engine
    var engine = Engine.create();
    engine.world.gravity.y = 0;

    var lastPos;
    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: WIDTH,
            height: HEIGHT,
            showAngleIndicator: true
        }
    });

    // create two boxes and a ground
    let ship = Bodies.rectangle(30, 30, 25, 25,
         { label: "snake", frictionAir: 0, friction: 0, frictionStatic: 0, mass: 8000});

    let bullets = [];
    let asteroids = [];
    
    // add all of the bodies to the world
    World.add(engine.world, ship);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
    

    setInterval(() => { addAsteriod(); }, 10000);


    document.onkeypress = function (e) {

        e = e || window.event;
        let keyCode = e.keyCode;
        let angle = ship.angle;

        if (keyCode === 97 || keyCode === 65){
            //a: 97
            angle -= 0.2;
        } 
        if (keyCode === 100 | keyCode === 68){
            //d: 100
            angle += 0.2;
        } 

        Body.setAngle(ship, angle);

        if (keyCode === 119 | keyCode === 87){
            // w
            Body.applyForce(ship, ship.position, {
                x: Math.cos(angle) * 15, 
                y: Math.sin(angle) * 15
            });
        }

        if(keyCode === 32) {
            console.log('shoot');
            let bullet = Bodies.circle(ship.position.x + (Math.cos(angle)*5), ship.position.y + (Math.sin(angle)*5), 3,
                { label: "bullet", frictionAir: 0, friction: 0, frictionStatic: 0, mass: 1});
           
            Body.applyForce(bullet, bullet.position, {
                x: Math.cos(angle)/25,
                y: Math.sin(angle)/25
            });
            bullets.push(bullet);
            World.add(engine.world, bullet);

       
        }
    };

    Events.on(engine, "tick", function () {
        objectWrapAround(ship);
        bullets.forEach( (bullet) => {
            objectWrapAround(bullet);
        });
        asteroids.forEach( (asteriod) => {
            objectWrapAround(asteriod);
        });
    });

    function objectWrapAround(object) {
        if (object.position.y <= 0) {
            Matter.Body.translate(object, {x: 0, y: HEIGHT});
        }
        if (object.position.y >= HEIGHT) {
            Matter.Body.translate(object, {x: 0, y: -HEIGHT});
        }

        if (object.position.x <= 0) {
            Matter.Body.translate(object, {x: WIDTH, y: 0});
        }
        if (object.position.x >= WIDTH) {
            Matter.Body.translate(object, {x: -WIDTH, y: 0});
        }
    }

    function addAsteriod() {
        var xPos = Math.random() * WIDTH;
        var yPos = Math.random() * HEIGHT;

        var xForce = Math.random() * 90 + 10
        var yForce = Math.random() * 90 + 10


        let asteriod = Bodies.circle(xPos, yPos, 50,
            { label: "asteriod", frictionAir: 0, friction: 0, frictionStatic: 0, mass: 5000});
        asteroids.push(asteriod);
        Body.applyForce(asteriod, asteriod.position, {
            x: Math.cos(Math.random()*360)*xForce,
            y: Math.sin(Math.random()*360)*yForce
        });
        World.add(engine.world, asteriod);

    }
});