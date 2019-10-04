# Contributing to Infra

Infra houses several packages, so this guide only covers the general direction.
For details, please refer to specific package contribution guidelines.

## General development workflow

1. Fork the repo.
2. Make your changes in your local branch.
3. If applicable, also add test to your changes.
4. Make sure the tests are passing before creating a PR.
5. Push and then create a PR in the repo.
6. Wait for status checks to pass before requesting a review.

## Commit message convention

This repo follows [conventional commits specification](https://www.conventionalcommits.org/en) for the commit message.
- `build`: build related changes, e.g. change tsconfig target.
- `chore`: non-user facing code and tooling changes, e.g. update dependencies.
- `ci`: CI related changes, e.g. change circle CI config.
- `docs`: changes in documentation, e.g. add Button example usage.
- `feat`: new features, e.g. add Carousel component.
- `fix`: bug fixes, e.g. fix missing icon in Toast.
- `perf`: changes for improving performance, e.g. optimize Carousel render.
- `refactor`: code refactor, e.g. refactor navigation history.
- `revert`: revert commits, e.g. revert "use momentjs for date formatting".
- `style`: code styling changes, e.g. run prettier on the repo.
- `test`: add or updating tests, e.g. add test for init command.

Make sure the commit message and PR title matches the commit message convention format.
