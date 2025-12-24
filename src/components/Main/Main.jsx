import Background from "./Background/Background.jsx";
import LocalTime from "./Clock/LocalTime.jsx";

function Main() {
  return (
    <div className="desktop-background w-full relative h-screen">
      <Background />
      <LocalTime />
    </div>
  );
}

export default Main;
