function randomAttackValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}







const app = Vue.createApp({
    data() {
        return {
          playerHealth: 100,  
          monsterHealth: 100,
          currentRound: 0,
          winner: '',
          logMessages: [],

        };
    },
    methods: {
        attack() {
          this.currentRound++;
          const dmg = randomAttackValue(5, 12);
          this.monsterHealth = this.monsterHealth - dmg;
          this.addLogMessage("player", "attack", dmg);
          // Counter hit
          this.monsterAttackBack();
        },
        monsterAttackBack() {
          const dmg = randomAttackValue(8, 15);
          this.playerHealth -= dmg;
          this.addLogMessage("monster", "attack", dmg);
        },
        specialAttack() {
          this.currentRound++;
          const dmg = randomAttackValue(10, 25);
          this.monsterHealth -= dmg;
          this.addLogMessage("player", "attack", dmg);
          this.monsterAttackBack();
        },
        healPlayer() {
          this.currentRound++;
          const healValue = randomAttackValue(10,25);
          this.addLogMessage("player", "heals", healValue);
          if(this.playerHealth + healValue > 100) {
            this.playerHealth = 100;
          } else {
            this.playerHealth += healValue;
          }

          this.monsterAttackBack();
        },
        startGame() {
          this.playerHealth = 100; 
          this.monsterHealth = 100;
          this.currentRound = 0;
          this.winner = '';
          this.logMessages = [];
        },
        surrender() {
          this.winner = "Monster";
          this.playerHealth = 0;
        },
        addLogMessage(who, what, value) {
          this.logMessages.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value
          });
        },
    },
    computed: {
      // Monster Bar Style
      monsterBarStyles() {
        if(this.monsterHealth < 0) {
          // if after attack healt goes below 0 show empty bar
          return {width: '0%'};
        }
        return {width: this.monsterHealth + '%'};
      },
      // Player Bar Style
      playerBarStyles() {
        if(this.playerHealth < 0) {
          return {width: '0%'};
        }
        return {width: this.playerHealth + '%'};
      },
      // Check if you can use special attack
      specialAttackDisabled() {
        return this.currentRound % 3 !== 0;
      },
      // Check if you can heal yourself
      healingDisabled() {
        return this.currentRound % 5 !== 0;
      },
    },
    watch: {
      playerHealth(value) {
        if( value <= 0 && this.monsterHealth <= 0) {
          // A draw
          this.winner = "Draw";
          // this.logMessages("Draw)
        } else if (value <= 0) {
          // Player lost
          this.winner = "Monster";
        }
      },
      monsterHealth(value) {
        if( value <= 0 && this.playerHealth <= 0) {
          // A draw
          this.winner = "Draw";
        } else if (value <= 0) {
          // Monster lost
          this.winner = "Player";
        }
      },
    }
});

app.mount("#game");