import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlameFile from './pages/blamefile';
import Home from './pages/home';
import PageNotFound from './pages/pagenotfound';
import RepoStats from './pages/repostats';
import UsernameSearch from './pages/usernamesearch';

function App() {
  return (
    <Routes>
      <Route path='/GitHubGo/' element={<Home />} />
      <Route path='/GitHubGo/repostats' element={<RepoStats />} />
      <Route path='/GitHubGo/usernamesearch' element={<UsernameSearch />} />
      <Route path='/GitHubGo/blamefile' element={<BlameFile />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
