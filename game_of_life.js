/* 
Martijn van Veen

- Conway's game of life OOP
The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. 
One interacts with the Game of Life by creating an initial configuration and observing how it evolves. 
It is Turing complete and can simulate a universal constructor or any other Turing machine.

- Rules
Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.
*/

// Game settings
// Nr of blocks in length and width
let size = 60;
let square_size = 50;
let canvas_size = size * (square_size + 5) + 20;
let grid = []
let game_state = true;

// Node object
class Node {
    constructor() {
        this.state = false;
        this.new_state = false;
        this.neighbours = [];
    }
}


function setup() {
    /*
    Set game settings and create game grid
    */
    createCanvas(canvas_size, canvas_size);
    make_grid()
    // Run draw function with a speed of 5 iterations/sec
    frameRate(5)
}


function draw() {
    /*
    Run game and create visualization of algorithm 
    */
    background(220);
    change_states();
    change_node_colour();
  }


function make_grid() {
    /*
    Create 2d grid with node objects
    */
    // Create rectangular grid with node objects
    for (let x = 0; x < size; x++) {
        let row = []
        for (let y = 0; y < size; y++) {
            row.push(new Node());
        }
        grid.push(row)
    }

    // Add neigbours to nodes
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            // Horizontal neigbours
            if ((x + 1) < size) {
                grid[x][y].neighbours.push(grid[x+1][y])
            }
            if ((x - 1) >= 0) {
                grid[x][y].neighbours.push(grid[x-1][y])
            }
            // Vertical neigbours
            if ((y + 1) < size) {
                grid[x][y].neighbours.push(grid[x][y+1])
            }
            if ((y - 1) >= 0) {
                grid[x][y].neighbours.push(grid[x][y-1])
            }
            // Diagonal neigbours
            if ((x + 1) < size && (y + 1) < size ) {
                grid[x][y].neighbours.push(grid[x+1][y+1])
            }
            if ((x + 1) < size && (y - 1) >= 0 ) {
                grid[x][y].neighbours.push(grid[x+1][y-1])
            }
            if ((x - 1) >= 0 && (y - 1) >= 0 ) {
                grid[x][y].neighbours.push(grid[x-1][y-1])
            }
            if ((x - 1) >= 0 && (y + 1) < size ) {
                grid[x][y].neighbours.push(grid[x-1][y+1])
            }
        }
    }
}


function mousePressed() {
    /*
    Pause/Play game or change node states when user pressed mouse
    */
    // Get node of mousepress position
    let x_coord = round((mouseX + 15) / (square_size + 5)) - 1;
    let y_coord = round((mouseY + 15) / (square_size + 5)) - 1;
    let node = grid[x_coord][y_coord]

    // Check if user clicked outside grid
    if (x_coord > size || y_coord > size) {
        // Pause game
        if (game_state) {
            game_state = false;
            noLoop();
        }
        // Play game
        else {
            game_state = true;
            loop();
        }
    }
    // Change state of clicked node
    else {
        if (node.state) {
            node.state = false;
            node.new_state = false;
        }
        else {
            node.state = true;
            node.new_state = true;
        }
    }
    change_node_colour();
}


function change_states() {
    /*
    Change state of all nodes according to the game rules
    */
    // Loop over every node
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            // Counts nr of living neighbours
            let neighbour_counter = 0
            grid[x][y].neighbours.forEach(function(neighbour) {
                if (neighbour.state) {
                    neighbour_counter++;
                }
            })
            // Living node
            if (grid[x][y].state) {
                if (neighbour_counter != 2 && neighbour_counter != 3) {
                    grid[x][y].new_state = false;
                }
            }
            // Dead node
            else {
                if (neighbour_counter == 3) {
                    grid[x][y].new_state = true;
                }
            }
        }  
    }
    // Refresh all node states
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            grid[x][y].state = grid[x][y].new_state
        }
    }
}


function change_node_colour() {
    /*
    Check node states and change colour according to the state of the node
    */
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            size_x = x * (square_size + 5) + 10;
            size_y = y * (square_size + 5) + 10;

            // Check node state and define colour
            let colour = color(0,0, 255);
            if (grid[x][y].state) {
                colour = color(255, 204, 0);
            }
            fill(colour);
            rect(size_x, size_y, square_size, square_size);
        }
    }
}
    
