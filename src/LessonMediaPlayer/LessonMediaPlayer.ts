class LessonMediaPlayer {
  media: HTMLMediaElement;
  plugins: Array<any>;
  container: HTMLElement;
  controlsContainer: HTMLElement;
  playButton: HTMLElement;
  spanishSubsButton: HTMLElement;
  englishSubsButton: HTMLElement;
  settingsButton: HTMLElement;
  progressionBar: HTMLElement;
  volumeControl: HTMLInputElement;

  constructor(config: any) {
    this.media = config.element;
    this.plugins = config.plugins || [];
    this.initPlayer();
    this.initControls();
    this.initPlugins();
  }

  private initPlayer() {
    this.container = document.createElement('div');
    this.container.classList.add('Lesson__player-container');
    this.media.parentNode.insertBefore(this.container, this.media);
    this.container.appendChild(this.media);
  }

  private initControls() {
    this.controlsContainer = document.createElement('div');
    this.container.appendChild(this.controlsContainer);
    this.controlsContainer.classList.add('Lesson__player-layout');
    this.controlsContainer.classList.add('Lesson__paused');

    this.controlsContainer.innerHTML = `<div id="controls"><div class="Lesson__player-controls"></div></div>`;

    this.container.appendChild(this.controlsContainer);

    /* --------------------------- Progresion Bar ------------------------------- */
    this.progressionBar = document.createElement('div');
    this.progressionBar.classList.add('Lesson__progression');

    this.progressionBar.innerHTML = `<div id="progression"></div>`;

    document
      .querySelector('#controls')
      .insertBefore(
        this.progressionBar,
        document.querySelector('.Lesson__player-controls'),
      );

    /* --------------------------- Create Buttons ------------------------------- */
    /* ----------------------------- Play/Pause ----------------------------- */
    this.playButton = document.createElement('button');
    this.playButton.classList.add('Lesson__player-button');
    this.playButton.classList.add('Lesson__play');
    this.playButton.innerHTML = '\u25B6';
    this.playButton.onclick = () => this.togglePlay();

    document
      .querySelector('.Lesson__player-controls')
      .appendChild(this.playButton);

    /* ----------------------------- Volume Control ----------------------------- */
    this.volumeControl = document.createElement('input');
    this.volumeControl.classList.add('Lesson__volume-control');
    this.volumeControl.type = 'range';
    this.volumeControl.min = '0';
    this.volumeControl.max = '100';
    this.volumeControl.step = '1';
    this.volumeControl.onchange = () =>
      this.changeVolume(this.volumeControl.value);
    this.volumeControl.oninput = () =>
      this.changeVolume(this.volumeControl.value);

    document
      .querySelector('.Lesson__player-controls')
      .appendChild(this.volumeControl);

    /* --------------------- Spanish Subtitles Button --------------------------- */
    this.spanishSubsButton = document.createElement('button');
    this.spanishSubsButton.classList.add('Lesson__player-button');
    this.spanishSubsButton.innerHTML = 'Spanish';

    document
      .querySelector('.Lesson__player-controls')
      .appendChild(this.spanishSubsButton);

    /* --------------------- English Subtitles Button --------------------------- */
    this.englishSubsButton = document.createElement('button');
    this.englishSubsButton.classList.add('Lesson__player-button');
    this.englishSubsButton.innerHTML = 'English';

    document
      .querySelector('.Lesson__player-controls')
      .appendChild(this.englishSubsButton);

    /* -------------------------- Settings Button ------------------------------- */
    this.settingsButton = document.createElement('button');
    this.settingsButton.classList.add('Lesson__player-button');
    this.settingsButton.innerHTML = '\u23E3';

    document
      .querySelector('.Lesson__player-controls')
      .appendChild(this.settingsButton);
  }

  private initPlugins() {
    this.plugins.forEach((plugin) => {
      plugin.run(this);
    });
  }

  play() {
    this.media.play();
    this.playButton.innerHTML = '\u23F8';
    this.controlsContainer.classList.remove('Lesson__paused');
    this.controlsContainer.classList.add('Lesson__played');
    this.progression(true);
  }

  pause() {
    this.media.pause();
    this.playButton.innerHTML = '\u25B6';
    this.controlsContainer.classList.remove('Lesson__played');
    this.controlsContainer.classList.add('Lesson__paused');
    this.progression(false);
  }

  togglePlay() {
    if (!this.media.paused) {
      this.pause();
    } else {
      this.play();
    }
  }

  progression(togglePlay: boolean) {
    const elem = document.getElementById('progression');

    let intervalId = setInterval(
      () => this.frame(elem, intervalId, togglePlay),
      100,
    );
  }

  private frame(
    elem: HTMLElement,
    intervalId: any,
    tooglePlay: boolean,
  ) {
    let width = (this.media.currentTime / this.media.duration) * 100;

    if (!tooglePlay || width >= 100) {
      clearInterval(intervalId);
    } else {
      width = (this.media.currentTime / this.media.duration) * 100;
      elem.style.width = width + '%';
    }
  }

  private changeVolume(value: string) {
    this.media.volume = Number(value) / 100;
  }
}

export default LessonMediaPlayer;
