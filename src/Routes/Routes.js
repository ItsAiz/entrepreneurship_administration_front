import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Toolbar from '../components/mdc/toolbar';

const RoutesApp = () => {
  return (
    <Routes>
        <Route path={'/'} element={<Toolbar/>}>
        </Route>
    </Routes>
  );
}

export default RoutesApp;
