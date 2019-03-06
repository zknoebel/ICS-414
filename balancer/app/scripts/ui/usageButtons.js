// Class used for setting button state.


class Buttons {
  constructor(state) {
    this.gameBtn = document.getElementById('game-btn');
    this.studyBtn = document.getElementById('study-btn');
    this.gameLockBtn = document.getElementById('game-lock-btn');
    this.studyLockBtn = document.getElementById('study-lock-btn');

    this.setState(state);
  }

  setState(state) {
    // Reset toggles to default toggle state.
    this.gameBtn.classList.remove('active');
    this.studyBtn.classList.remove('active');
    this.gameLockBtn.classList.remove('active');
    this.studyLockBtn.classList.remove('active');


    if (state.pressed === true) {
      if (state.mode === 'game') {
        this.gameBtn.classList.add('active');
        if (state.locked === true) {
          this.gameLockBtn.classList.add('active');
        }
      } else if (state.mode === 'study') {
        this.studyBtn.classList.add('active');
        if (state.locked === true) {
          this.studyLockBtn.classList.add('active');
        }
      }
    }
  }
}


module.exports = Buttons;
