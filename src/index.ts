#! /usr/bin/env node
import { setupDomain } from "./domain";
import { setupPackages } from "./init";
import { setupServer } from "./server";

const main = () => {
  setupPackages();
  setupServer();
  setupDomain();
}

main();