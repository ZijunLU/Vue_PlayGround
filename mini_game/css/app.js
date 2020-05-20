new Vue({
  el: "#app",
  data: {
    gameIsRunning: false,
    gameOver: false,
    yourLife: 100,
    monsterLife: 100,
    gameLogs: [],
  },
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.yourLife = 100;
      this.monsterLife = 100;
      this.gameLogs = [];
    },
    calculateDamage: function (min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    attack: function () {
      let damage = this.calculateDamage(5, 12);
      this.monsterLife -= damage;
      this.playerTurnsLogs(damage);
      if (this.checkResults()) {
        return;
      }
      this.monsterAttach();
    },
    specialAttack: function () {
      let damage = this.calculateDamage(10, 20);
      this.monsterLife -= damage;
      this.playerTurnsLogs(damage);
      if (this.checkResults()) {
        return;
      }
      this.monsterAttach();
    },
    playerTurnsLogs: function (damage) {
      this.gameLogs.unshift({
        isPlayer: true,
        text: "player hits monster hard for " + damage,
      });
    },
    monsterAttach: function () {
      let damage = this.calculateDamage(5, 12);
      this.yourLife -= damage;
      this.gameLogs.unshift({
        isPlayer: false,
        text: "monster hits player for " + damage,
      });
      this.checkResults();
    },
    heal: function () {
      if (this.yourLife <= 90) {
        this.yourLife += 10;
      } else {
        this.yourLife = 100;
      }
      this.gameLogs.unshift({
        isPlayer: true,
        text: "player heals for 10",
      });
      this.monsterAttach();
    },

    checkResults: function () {
      if (this.monsterLife <= 0) {
        this.monsterLife = 0;
        if (confirm("you won, want a new game")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.yourLife <= 0) {
        this.yourLife = 0;
        if (confirm("you lose, want a new game")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    giveUp: function () {
      this.gameIsRunning = false;
    },
  },

  computed: {
    userHealthBar: function () {
      return {
        backgroundColor: "green",
        margin: 0,
        color: "white",
        width: this.yourLife + "%",
      };
    },
    monsterHealthBar: function () {
      this.healthbarWidth = this.yourLife;
      return {
        backgroundColor: "green",
        margin: 0,
        color: "white",
        width: this.monsterLife + "%",
      };
    },
  },
});
