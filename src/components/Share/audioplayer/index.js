const AudioPlayer = () => {
  // const [audio] = useState(
  //   new Audio(process.env.PUBLIC_URL + "/assets/audio/cny.mp3")
  // );
  // const [playing, setPlaying] = useState(true);

  // const toggle = () => setPlaying(!playing);

  // useEffect(() => {
  //   playing ? audio.play() : audio.pause();
  // }, [playing]);

  // useEffect(() => {
  //   audio.addEventListener("ended", () => setPlaying(false));
  //   return () => {
  //     audio.removeEventListener("ended", () => setPlaying(false));
  //   };
  // }, []);

  return (
    <div style={{ display: "none" }}>
      <audio controls id="audio" loop>
        <source
          src={process.env.PUBLIC_URL + "/assets/audio/cny.mp3"}
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default AudioPlayer;
