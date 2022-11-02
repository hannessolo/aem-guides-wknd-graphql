/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';

import { ModelManager } from "@adobe/aem-spa-page-model-manager";

// Initialize the ModelManager before rendering app.
ModelManager.initialize().then(() => {
  const root = createRoot(document.getElementById('root'))
  root.render(<React.StrictMode>
    <App />
  </React.StrictMode>)
});

