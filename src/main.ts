import * as core from '@actions/core'
import { createActionAuth } from '@octokit/auth-action';
import { Octokit } from '@octokit/rest';
import { wait } from './wait'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.info('Hello!')
    // auth
    const auth = createActionAuth();
    const authentication = await auth();
    core.debug(authentication.token)
    const octokit = new Octokit({authStrategy: createActionAuth})
    core.debug('octokit initiated')
    const {data: {login}} = await octokit.rest.users.getAuthenticated();
    core.debug('octokit auth response')
    core.info(`Hello ${login}`)
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())
    
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()