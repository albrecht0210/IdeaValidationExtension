import { useState } from 'react';
import Thread from './features/thread/Thread.jsx';
import Settings from './features/settings/Settings.jsx';
import { SettingsContext } from './context/SettingsContext.js';

function App() {
  const [isSettings, setIsSettings] = useState(false);
  const [slider, setSlider] = useState({
    general_specific: localStorage.getItem("general_specific") ? Number(localStorage.getItem("general_specific")) : 0.5,
    lenient_harsh: localStorage.getItem("lenient_harsh") ? Number(localStorage.getItem("lenient_harsh")) : 0.5,
    optimistic_pessimistic: localStorage.getItem("optimistic_pessimistic") ? Number(localStorage.getItem("optimistic_pessimistic")) : 0.5
  });

  return (
    <SettingsContext.Provider value={{ isSettings, slider, setIsSettings, setSlider }}>
      <div className="App">
        {isSettings ? (
          <Settings />
        ) : (
          <Thread />
        )}
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
