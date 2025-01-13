# Contributing to Hive

We love your input! We want to make contributing to Hive as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with GitHub

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [GitHub Flow](https://guides.github.com/introduction/flow/index.html)

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `develop`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issue tracker](https://github.com/oneirocom/hive/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/oneirocom/hive/issues/new/choose).

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Development Process

We follow a trunk-based development workflow:

1. Create a feature branch from `develop`
2. Commit your changes (see below for commit message format)
3. Push your branch and create a Pull Request
4. After review and approval, your PR will be merged to `develop`
5. Periodically, `develop` is merged to `main` for production releases

## Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This leads to more readable messages that are easy to follow when looking through the project history.

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Scope

The scope should be the name of the package/component affected (as perceived by the person reading the changelog generated from commit messages).

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

## Code Style

- We use ESLint and Prettier for code formatting
- Run `yarn lint` before committing
- Configure your editor to use the provided `.eslintrc` and `.prettierrc`

## Testing

- Write tests for all new features and fixes
- Maintain test coverage above 80%
- Run `yarn test` to ensure all tests pass

## Documentation

- Update documentation for any changed functionality
- Use JSDoc comments for function documentation
- Keep the README.md up to date

## Questions?

Don't hesitate to ask in our [Discord community](https://discord.gg/hive) or create a discussion on GitHub. 