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

    this.container.addEventListener('click', () => this.togglePlay());
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

    document
      .querySelector('.Lesson__player-controls')
      .appendChild(this.playButton);

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
    this.progression(true);
  }

  pause() {
    this.media.pause();
    this.progression(false);
  }

  togglePlay() {
    if (!this.media.paused) {
      this.pause();
      this.playButton.innerHTML = '\u25B6';
      this.controlsContainer.classList.remove('Lesson__played');
      this.controlsContainer.classList.add('Lesson__paused');
    } else {
      this.play();
      this.playButton.innerHTML = '\u23F8';
      this.controlsContainer.classList.remove('Lesson__paused');
      this.controlsContainer.classList.add('Lesson__played');
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
}

export default LessonMediaPlayer;
