/**
 * Core State Management - Modular Store Entry Point
 * 
 * This file now serves as a facade to the modularized stores located in ./stores/
 * ensuring backward compatibility for the rest of the application.
 */

import { AppState as Facade } from './stores/index.js';

export const AppState = Facade;
window.AppState = AppState;

// Attach to unified namespace
window.ESPHomeDesigner = window.ESPHomeDesigner || {};
window.ESPHomeDesigner.state = AppState;
