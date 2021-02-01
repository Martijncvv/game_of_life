document.addEventListener('DOMContentLoaded', function() {  
    play_game();
});

// Cell object
class Cell {
    constructor(x_coord, y_coord) {
        this.x_coord = x_coord;
        this.y_coord = y_coord;
        this.state = false;
        this.new_state = false;
        this.neighbours = [];
    }
}

function play_game() {
    SIZE = 10;
    grid = make_grid(SIZE);
    console.log(grid);
    // while (true) {
        grid = start_loop(SIZE, grid);
        draw_grid(grid)
    // }    
};

function draw_grid(grid) {
    
}

function start_loop(size, grid) {
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            neighbour_counter = 0
            // Counts nr of neighbours
            grid[x][y].neighbours.forEach(function(neighbour) {
                if (neighbour.state) {
                    neighbour_counter++;
                }
            })
            // Any dead cell with 3 live neighbours becomes a live cell.
            // Any live cell with 2 or 3 live neighbours survives.
            // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
            // If alive
            if (grid[x][y].state) {
                if (neighbour_counter != 2 || neighbour_counter != 3) {
                    grid[x][y].new_state == false
                }
            }
            // If dead
            else {
                if (neighbour_counter == 3) {
                    grid[x][y].new_state == true
                }
            }
        }  
    }
    // change all states to new states
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            grid[x][y].state = grid[x][y].new_state
        }
    }
    return grid
}



// create 2d grd of cell objects
function make_grid(size) {
    let grid = [];
    for (let x = 0; x < size; x++) {
        let row = []
        for (let y = 0; y < size; y++) {
            row.push(new Cell(x, y));
        }
        grid.push(row)
    }

    // get neigbours of each node
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            // horizontal
            if ((x + 1) < size) {
                grid[x][y].neighbours.push(grid[x+1][y])
            }
            if ((x - 1) >= 0) {
                grid[x][y].neighbours.push(grid[x-1][y])
            }
            // vertical
            if ((y + 1) < size) {
                grid[x][y].neighbours.push(grid[x][y+1])
            }
            if ((y - 1) >= 0) {
                grid[x][y].neighbours.push(grid[x][y-1])
            }
            // diagonal
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
    return grid
}



