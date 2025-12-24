// src/App.jsx
import { useState } from "react";
import "./App.css";

import Main from "./components/Main/Main.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Window from "./components/Window/Window.jsx";

// App components
import StartApp from "./apps/StartApp.jsx";
import GoogleApp from "./apps/GoogleApp.jsx";
import PaintApp from "./apps/PaintApp.jsx";
import MusicApp from "./apps/MusicApp.jsx";
import WeatherApp from "./apps/WeatherApp.jsx";

// App registry (windowId -> component)
const APP_COMPONENTS = {
  window: StartApp,
  google: GoogleApp,
  paint: PaintApp,
  music: MusicApp,
  weather: WeatherApp,
};

export default function App() {
  const [topZ, setTopZ] = useState(10);
  const [activeId, setActiveId] = useState(null);

  const [windows, setWindows] = useState({
    window: {
      open: false,
      minimized: false,
      x: 140,
      y: 120,
      z: 1,
      title: "Start",
    },
    google: {
      open: false,
      minimized: false,
      x: 240,
      y: 160,
      z: 2,
      title: "Google",
    },
    paint: {
      open: false,
      minimized: false,
      x: 320,
      y: 200,
      z: 3,
      title: "Paint",
    },
    music: {
      open: false,
      minimized: false,
      x: 420,
      y: 240,
      z: 4,
      title: "Spotify",
    },
    weather: {
      open: false,
      minimized: false,
      x: 520,
      y: 280,
      z: 5,
      title: "Weather",
    },
  });

  const focusWindow = (id) => {
    setTopZ((prev) => {
      const newZ = prev + 1;
      setWindows((win) => ({
        ...win,
        [id]: { ...win[id], z: newZ, minimized: false },
      }));
      return newZ;
    });
    setActiveId(id);
  };

  const openWindow = (id) => {
    setTopZ((prev) => {
      const newZ = prev + 1;

      setWindows((win) => {
        const w = win[id];

        if (w.open) {
          return {
            ...win,
            [id]: { ...w, minimized: false, z: newZ },
          };
        }

        return {
          ...win,
          [id]: { ...w, open: true, minimized: false, z: newZ },
        };
      });

      setActiveId(id);
      return newZ;
    });
  };

  const closeWindow = (id) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false, minimized: false },
    }));
    if (activeId === id) setActiveId(null);
  };

  const moveWindowStop = (id, x, y) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], x, y },
    }));
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Sidebar windows={windows} activeId={activeId} onLaunch={openWindow} />

      {/* Render open windows */}
      {Object.entries(windows).map(([id, w]) => {
        if (!w.open || w.minimized) return null;

        const AppComponent = APP_COMPONENTS[id];

        return (
          <Window
            key={id}
            id={id}
            title={w.title}
            x={w.x}
            y={w.y}
            z={w.z}
            active={activeId === id}
            onFocus={focusWindow}
            onClose={closeWindow}
            onMoveStop={moveWindowStop}
          >
            {AppComponent ? (
              <AppComponent />
            ) : (
              <div>No app registered for “{id}”</div>
            )}
          </Window>
        );
      })}

      <Main />
    </div>
  );
}
