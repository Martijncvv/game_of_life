SIZE = 10;
grid = [];

// create cell object
function cell(x_coord, y_coord)  {
    this.x_coord = x_coord;
    this.y_coord = y_coord;
    this.state = false;
    this.new_state = false;
    this.neighbours = [];
}

 // create 2d grd of cell objects
function make_grid(size) {
    for (x in range(size)) {
        for (y in range(size)) {
            grid[x][y] = cell(x, y)
        }
    }
    // get neigbours of each node
    for (x in range(size)) {
        for (y in range(size)) {
            if ((x + 1) < size) {
                grid[x][y].neighbours.push(grid[x+1][y])
            }
            if ((x - 1) >= 0) {
                grid[x][y].neighbours.push(grid[x-1][y])
            }
            if ((y + 1) < size) {
                grid[x][y].neighbours.push(grid[x][y+1])
            }
            if ((y - 1) >= 0) {
                grid[x][y].neighbours.push(grid[x][y-1])
            }
        }
    }
    return grid
}






// create GoL rules function
console.log(grid)
// 
