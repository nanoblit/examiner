import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <div>
      <Link to="/">Edit Questions</Link>
      <Link to="/importer">Importer</Link>
      <Link to="/review">Review</Link>
      <button>Export Questions</button>
    </div>
  );
}

export default Menu;
