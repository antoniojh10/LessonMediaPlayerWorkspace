import LessonMediaPlayer from './LessonMediaPlayer/LessonMediaPlayer.ts';

const video = document.querySelector('video');
const player = new LessonMediaPlayer({
  element: video,
  plugins: [],
});
