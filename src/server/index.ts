import fs from 'fs';
import {exec} from 'child_process';
import { Color } from '../color';

const prompt = require("prompt-sync")({ sigint: true });

const getRepo = () => {
  console.log(Color.FgBlue + 'Pulling community-fork repository', Color.Reset)
  if (!fs.existsSync('community-fork')) {
    exec('git clone https://github.com/spknetwork/community-fork', (error, stdout) => {
      if (error) {
        console.log(error)
        console.log(Color.FgRed + 'Couldn\'t copy repository' + Color.Reset)
        return;
      }

      console.log(Color.FgBlue + stdout + Color.Reset)
    })
  }
  console.log(Color.FgGreen + 'Successfully pulled community-fork repo', Color.Reset)
}

const createEnv = () => {
  console.log(Color.FgBlue + 'Creating .env.local file', Color.Reset)
  let hive_id = prompt(Color.FgWhite + "Community hive ID <hive-12345>: " + Color.Reset);
  let theme = prompt(Color.FgWhite + "Theme <sky|burning|dusk>: " + Color.Reset);
  let tags = prompt(Color.FgWhite + "Tags <3spk,spk,OTHERTAG>: " + Color.Reset);

  fs.writeFileSync('community-fork/.env.local', `HIVE_ID=${hive_id}\nTHEME=${theme}\nTAGS=${tags}`)
  console.log(Color.FgGreen + 'Successfully created .env.local file' + Color.Reset)
}

const runDockerCompose = () => {
  console.log(Color.FgBlue + 'Running project on port 9000', Color.Reset)
  exec('sudo docker-compose up -d', {cwd: 'community-fork'}, (error, stdOut) => {
    if (error) {
      console.log(error)
      console.log(Color.FgRed + 'Couldn\'t run project' + Color.Reset)
      return;
    }

    console.log(stdOut)
  })
  console.log(
    Color.FgGreen + "Successfully ran project" + Color.Reset
  );

}


export const setupServer = () => {
  getRepo();
  console.log()
  createEnv();
  console.log();
  runDockerCompose();
}
