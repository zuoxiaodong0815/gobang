class gobangGame {
    constructor() {
        this._color = 1;
        this._gameOver = true;
        this._map = [];
        for (let i = 0;i < 15; i++) {
            let rowmap = [];
            for (let j = 0;j < 15; j++) {
                rowmap[j] = 0;
            }
            this._map[i] = rowmap;
        }
    }
    get map() {
        return this._map;
    }
    move(i, j) {
        if (this._gameOver == true) {
            alert(`游戏结束, ${this._color == 1 ? '白子' : '黑子'}胜出！`)
            return false;
        }
        if (this.map[i][j] !== 0) {
            return false;
        }
        this.map[i][j] = this._color;

        this._color = 3 - this._color;
        return true;
    }
    gameover() {
        
    }
}

class gobangView {
    constructor(container) {
        this._container = container;
        this._game = new gobangGame();
    }
    render() {
        this._container.innerHTML = "";
        for (let i = 0;i < this._game.map.length; i++) {
            if (i > 0) {
                this._container.appendChild(document.createElement("br"));
            }
            let rowmap = this._game.map[i];
            for (let j = 0;j < rowmap.length; j++) {
                let e = document.createElement("div");
                e.className = `cell ${rowmap[j] == 1 ? "white" : ""} ${rowmap[j] == 2 ? "black" : ""}`;
                
                let topleft = document.createElement("div");
                topleft.className = "topleft";
                e.appendChild(topleft);
                let topright = document.createElement("div");
                topright.className = "topright";
                e.appendChild(topright);
                let bottomleft = document.createElement("div");
                bottomleft.className = "bottomleft";
                e.appendChild(bottomleft);
                let bottomright = document.createElement("div");
                bottomright.className = "bottomright";
                e.appendChild(bottomright);

                e.addEventListener("click", event => {
                    if (this._game.move(i, j)) {
                        this.render();
                    }
                });

                this._container.appendChild(e);
            }
        }
    }
}

let container = document.getElementById("container");
(new gobangView(container)).render();