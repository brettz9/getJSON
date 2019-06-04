/* eslint-env node */
import 'core-js-bundle';
import 'regenerator-runtime/runtime.js';

import getJSON from '../src/index.js';

global.getJSON = getJSON;

import('./test.js');
