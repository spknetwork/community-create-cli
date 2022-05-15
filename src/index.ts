#! /usr/bin/env node
import { setupDomain } from "./domain";
import { setupServer } from "./server";

const main = async () => {
  setupServer();
  setupDomain();
}

main();