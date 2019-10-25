import React from 'react';
import MainView from "./views/MainView";

import "./scss/views/appView.scss";
import LoginWindow from "./components/MainView/LoginWindow/LoginWindow";

function App() {
  return (
      <main className="main-container">
          <LoginWindow/>
          <MainView/>
      </main>
  );
}

export default App;
