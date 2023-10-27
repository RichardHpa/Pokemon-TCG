const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    const myToken = process.env.GITHUB_TOKEN
    const octokit = github.getOctokit(myToken)

    const number = github.context.payload.pull_request.number
    const { data: pullRequest } = await octokit.rest.pulls.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: number,
    })

    if (!pullRequest) {
      throw new Error(
        `Pull request not found for ${github.context.repo.owner}/${github.context.repo.repo}#${number}, Github Action failed.`,
      )
    }
    // const currentSha = core.getInput('commitSha')

    // const { data } = await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
    //   owner: 'RichardHpa',
    //   repo: 'Pokemon-TCG',
    //   commit_sha: currentSha,
    // })

    // let pullRequests = data
    // core.debug(`Found ${pullRequests.length} pull requests with the sha ${currentSha}.`)

    // if (!pullRequests.length) {
    //   throw new Error(
    //     `No pull requests found for ${github.context.repo.owner}/${github.context.repo.repo}@${currentSha}, Github Action failed.`,
    //   )
    // }

    setOutput('number', pullRequest.number)
    setOutput('title', pullRequest.title || '')
    setOutput('body', pullRequest.body || '')
    setOutput('url', pullRequest.html_url || '')
    setOutput('base-ref', pullRequest.base?.ref || '')
    setOutput('base-sha', pullRequest.base?.sha || '')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
