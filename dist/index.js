#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("./domain");
const init_1 = require("./init");
const server_1 = require("./server");
const main = async () => {
    await (0, init_1.setupPackages)();
    (0, server_1.setupServer)();
    (0, domain_1.setupDomain)();
};
main();
