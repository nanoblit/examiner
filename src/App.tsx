import React from "react";
import { Route, Switch } from "react-router";

import Navbar from "./components/Navbar/Navbar";
import Revision from "./components/Revision/Revision";
import Questions from "./components/Questions/Questions";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/questions">
          <Questions />
        </Route>
        <Route path="/revision">
          <Revision />
        </Route>
        {/* <Route path="/exam" component={} /> */}
      </Switch>
    </div>
  );
};

export default App;
