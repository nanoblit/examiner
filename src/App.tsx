import React from 'react';
import { Route } from 'react-router';

import Menu from './components/Menu';
import Importer from './components/Importer/Importer';
import Review from './components/Review/Review';
import Editor from './components/Editor/Editor';

const App: React.FC = () => {
  return (
    <div className="App">
      <Route path="/" component={Menu} />
      <Route exact path="/" component={Editor} />
      <Route exact path="/importer" component={Importer} />
      <Route exact path="/review" component={Review} />
    </div>
  );
}

export default App;
