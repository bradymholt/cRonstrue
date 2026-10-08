The [.github/workflows/publish.yml](https://github.com/bradymholt/cRonstrue/actions?query=workflow%3APublish) GitHub Actions Workflow publishes new versions of cRonstrue.

It runs automatically after the Build workflow succeeds on `main` (i.e. after a pull request is merged) and bumps the minor version. A release is skipped if nothing other than docs, tests, or CI/editor config has changed since the last release tag.

It can also be run manually at any time with a chosen version type (major, minor, or patch).
