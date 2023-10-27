const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    const myToken = process.env.GITHUB_TOKEN
    const octokit = github.getOctokit(myToken)
    const currentSha = core.getInput('commitSha', { required: false })

    const { data } = await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
      owner: 'RichardHpa',
      repo: 'Pokemon-TCG',
      commit_sha: currentSha,
    })

    let pullRequests = data
    core.debug(`Found ${pullRequests.length} pull requests with the sha ${currentSha}.`)

    if (!allowClosed) {
      pullRequests = pullRequests.filter((pr) => pr.state === 'open')
      core.debug(`Filtered to find ${pullRequests.length} open pull requests.`)
    }

    if (!pullRequests.length) {
      if (failIfNotFound) {
        core.setFailed(
          `No pull requests found for ${context.repo.owner}/${context.repo.repo}@${currentSha}, Github Action failed.`,
        )
      }
    }

    let pullRequest = pullRequests[0]
    setOutput('number', pullRequest.number)
    setOutput('title', title || '')
    setOutput('body', body || '')
    setOutput('url', pullRequest.html_url || '')
    setOutput('base-ref', pullRequest.base?.ref || '')
    setOutput('base-sha', pullRequest.base?.sha || '')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
