var divElement = document.querySelector("div"),
  tableElement = document.querySelector("table");

// objeto que terá as funçoes para ocorrer o jogo

var Game = {
  // irá iniciar todo o jogo
  start() {
    this.field = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.currentPlayer = "X";
    this.isFinished = false;
    this.round = 0;
    this.render();
  },

  // irá inverter os jogares
  nextPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  },

  // verifica os espaços disponiveis para serem clicados
  setField(line, column) {
    if (!this.isFinished && this.field[line][column] === "") {
      this.field[line][column] = this.currentPlayer;
      this.nextPlayer();
      this.round++;
      this.render();
    }
  },

  // verifica se o jogo já foi finalizado e mostra quem venceu
  isGameOver() {
    var field = this.field,
      rows = 3,
      cols = 3,
      totalRow = 0;
    totalCol = 0;

    for (var i = 0; i < rows; i++) {
      totalRow = 0;
      totalCol = 0;
      for (var j = 0; j < cols; j++) {
        if (field[i][j] === "X") {
          totalRow++;
        }

        if (field[i][j] === "O") {
          totalRow--;
        }

        if (field[j][i] === "X") {
          totalCol++;
        }

        if (field[j][i] === "O") {
          totalCol--;
        }
      }

      if (totalRow === 3 || totalCol === 3) {
        return "X";
      }

      if (totalRow === -3 || totalCol === -3) {
        return "O";
      }
    }

    if (
      field[0][0] !== "" &&
      field[0][0] === field[1][1] &&
      field[1][1] === field[2][2]
    ) {
      return field[0][0];
    }

    if (
      field[0][2] !== "" &&
      field[0][2] === field[1][1] &&
      field[1][1] === field[2][0]
    ) {
      return field[0][2];
    }
    if (this.round === rows * cols) {
      return "Empate";
    }
  },

  // irá desenhar o tabuleiro e iniciará a lógica do jogo
  render() {
    var winner = this.isGameOver();
    divElement.textContent = winner
      ? `Winner: ${winner}`
      : `Current Player: ${this.currentPlayer}`;

    if (winner) {
      this.isFinished = true;
    }

    var template = "";
    this.field.forEach((line, lineIndex) => {
      template += "<tr>";
      line.forEach((column, columnIndex) => {
        template += `<td onclick="Game.setField(${lineIndex}, ${columnIndex})" >${column}</td>`;
      });
      template += "</tr>";
    });

    tableElement.innerHTML = template;
  },
};

Game.start();
