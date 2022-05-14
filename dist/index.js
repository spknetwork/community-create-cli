#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("./domain");
const server_1 = require("./server");
const main = () => {
    (0, server_1.setupServer)();
    (0, domain_1.setupDomain)();
};
main();
