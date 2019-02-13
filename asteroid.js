window.addEventListener('load', function() {
    
	// module aliases
    var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

    // create an engine
    var engine = Engine.create();
    engine.world.gravity.y = 0;

    var lastPos;
    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1000,
            height: 600,
            showAngleIndicator: true
        }
    });

    // create two boxes and a ground
    var ship = Bodies.rectangle(30, 30, 25, 25,
         { label: "snake", frictionAir: 0, friction: 0, frictionStatic: 0, mass: 800});

    console.log(ship);
    var ground = Bodies.rectangle(500, 600, 1000, 10, { label: "wall", isStatic: true });
    var top = Bodies.rectangle(500, 0, 1000, 10, { label: "wall", isStatic: true });
    var left = Bodies.rectangle(0, 300, 10, 600, { label: "wall", isStatic: true });
    var right = Bodies.rectangle(1000, 300, 10, 600, { label: "wall", isStatic: true });

    
    // add all of the bodies to the world
    World.add(engine.world, [ship, ground, top, left, right]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    Render.run(render);
    
    document.onkeypress = function (e) {

        e = e || window.event;
        
        let keyCode = e.keyCode;
        console.log(keyCode);

        let angle = ship.angle;

        if (keyCode === 97){
            //a: 97
            angle -= 0.25;
        } 
        if (keyCode === 100){
            //d: 100
            angle += 0.25;
        } 

        Body.setAngle(ship, angle);
        console.log(ship);

        if (keyCode === 119){
            // w
            Body.applyForce(ship, ship.position, {
                x: Math.cos(angle) * 2, 
                y: Math.sin(angle) * 2
            });
        }
        // if (keyCode === 97){
        //     //a: 97
        //     xForce = -1;
        // } 
        // if (keyCode === 100){
        //     //d: 100
        //     xForce = 1;
        // } 
        // if (keyCode === 119){
        //     //w: 119
        //     yForce = -1;
        // } 
        // if(keyCode === 115){
        //     //s: 115
        //     yForce = 1;
        // }

        // Body.applyForce( ship, 
        //     {x: ship.position.x, y: ship.position.y},
        //     {x: xForce, y: yForce});

        // if(!isNaN(Math.atan(ship.velocity.y/ship.velocity.x))){
        //     console.log(  Math.atan(ship.velocity.y/ship.velocity.x));
        //     Body.setAngle(ship, Math.atan(ship.velocity.y/ship.velocity.x));
        // }

    };

});