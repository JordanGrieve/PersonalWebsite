function Sidebar({ windows, activeId, onLaunch }) {
  const IconButton = ({ id, src, alt }) => {
    const isOpen = windows?.[id]?.open;
    const isActive = activeId === id;

    return (
      <button
        type="button"
        onClick={() => onLaunch(id)}
        className={`p-1 rounded-2xl transition
          ${isOpen ? "bg-white/10 ring-2 ring-white/30" : "hover:bg-white/10"}
          ${isActive ? "ring-4 ring-white/60" : ""}
        `}
      >
        <img src={src} alt={alt} className="w-14 h-14" />
      </button>
    );
  };

  return (
    <div className="absolute left-0 top-0 z-999 bg-black/98 min-h-screen w-22.5 flex flex-col justify-between items-center">
      <div className="flex flex-col items-center gap-4 pt-4">
        <IconButton id="window" src="/icons/window.png" alt="Window Icon" />
        <IconButton id="google" src="/icons/google.png" alt="Google Icon" />
        <IconButton id="paint" src="/icons/paint.png" alt="Paint Icon" />
        <IconButton id="music" src="/icons/spotify.png" alt="Spotify Icon" />
        <IconButton id="weather" src="/icons/weather.png" alt="Weather Icon" />
      </div>

      <div className="pb-4 text-xs text-white/70">JG OS</div>
    </div>
  );
}

export default Sidebar;
