<h1 align="center">Balancer</h1>

<div align="center">
  :bulb::bulb::bulb:
</div>

<div align="center">
  <strong>Balance your work and play time!</strong>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About](#about)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Running](#running)

## About

Balancer is a desktop and mobile app that is built on ElectronJS. It helps you, the user, in keeping track of the time you spend on fun activities and work activities, and balancing the time you spend on the two.

## Prerequisites

Before installing the source of this package, you will need to install several prerequisite technologies such as:

* [Git](https://git-scm.com/)
* NodeJS via [nvm](https://github.com/creationix/nvm) or from [NodeJS directly](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/en/docs/install)

Make sure to install NodeJS before installing yarn. 
If you install NodeJS it comes with npm, which is also required by yarn.
If you install NodeJS via nvm, you do not need to install it from the NodeJS website (nvm does that for you).

## Installing

Once all the prerequisites are installed, run the following commands from this directory:
```bash
yarn # Installs all packages
```
You are now ready to run the project and start development.

## Running

From this directory, run the following command:
```bash
yarn start # Runs script found in package.json though yarn
```

When developing, you will need to relaunch this command to reload changes to source, as there is no hot-reloading enabled in current configuration.
