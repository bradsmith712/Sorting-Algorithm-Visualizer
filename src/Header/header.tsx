import * as React from 'react';

function Header() {
  return (
    <header className="app-header">
      <svg className="app-header-logo" viewBox="0 0 28 28" aria-hidden="true">
        <rect x="2" y="14" width="5" height="12" rx="2.5" />
        <rect x="9" y="8" width="5" height="18" rx="2.5" />
        <rect x="16" y="2" width="5" height="24" rx="2.5" />
        <rect x="23" y="11" width="5" height="15" rx="2.5" />
      </svg>
      <h1 className="app-header-title">Sorting Visualizer</h1>
    </header>
  )
}

export default Header;
