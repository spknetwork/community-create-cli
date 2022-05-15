import { exec } from "child_process"
import { Color } from "../color"

export const setupPackages = async () => {
  await exec('sudo apt install git', (error, stdout) => {
    if (error) {
      console.log(error)
      console.log(Color.FgRed + 'Couldn\'t download git' + Color.Reset)
      return;
    }

    console.log(Color.FgBlue + stdout + Color.Reset)
  })

  await exec('sudo apt install docker', (error, stdout) => {
    if (error) {
      console.log(error)
      console.log(Color.FgRed + 'Couldn\'t download docker' + Color.Reset)
      return;
    }

    console.log(Color.FgBlue + stdout + Color.Reset)
  })

  await exec('curl -SL https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose', (error, stdout) => {
    if (error) {
      console.log(error)
      console.log(Color.FgRed + 'Couldn\'t download docker-compose' + Color.Reset)
      return;
    }

    console.log(Color.FgBlue + stdout + Color.Reset)
  })
}