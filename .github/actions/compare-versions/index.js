const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  try {
    // // `who-to-greet` input defined in action metadata file
    // const nameToGreet = core.getInput('who-to-greet')
    // console.log(`Hello ${nameToGreet}!`)
    // const time = new Date().toTimeString()
    // core.setOutput('time', time)
    // // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`)
    const myToken = process.env.GITHUB_TOKEN
    const octokit = github.getOctokit(myToken)

    const currentVersion = core.getInput('currentVersion')

    const { data: releases } = await octokit.rest.repos.listReleases({
      owner: 'RichardHpa',
      repo: 'Demo-App',
      per_page: 1,
    })
    const latestVersionRaw = releases[0].tag_name
    const latestVersion = latestVersionRaw.replace('v', '')
    console.log(`The current package.json version is ${currentVersion}`)
    console.log(typeof currentVersion)
    console.log(`The latest release: ${latestVersion}`)
    console.log(typeof latestVersion)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
