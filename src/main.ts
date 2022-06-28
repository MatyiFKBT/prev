import * as core from '@actions/core'
import { createActionAuth } from '@octokit/auth-action';
import { Octokit } from '@octokit/rest';

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')

    const octokit = new Octokit({ authStrategy: createActionAuth })
    core.debug('octokit initiated')
    const [owner, repo] = process.env.GITHUB_REPOSITORY!.split('/');
    const { data: { total_count, workflow_runs } } = await octokit.actions.listWorkflowRunsForRepo({ owner, repo, status: 'completed' })
    core.debug('octokit auth response')
    core.info(`total ${total_count}`)
    const runPromises = workflow_runs.map(run => octokit.actions.deleteWorkflowRun({ run_id: run.id, owner, repo }))
    await Promise.all(runPromises)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()