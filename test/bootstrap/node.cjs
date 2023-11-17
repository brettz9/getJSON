/*
// Should be able to use this import block instead if this issue is fixed
// https://github.com/mochajs/mocha/issues/4281
import chai from 'chai';
import {buildGetJSON} from '../../src/index-polyglot.js';

// See https://github.com/chaijs/chai/pull/1317 on current need for this
const {assert} = chai;
*/

'use strict';
const {assert} = require('chai');

global.assert = assert;
