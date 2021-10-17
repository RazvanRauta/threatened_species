# Red List of Threatened Species

[![Netlify Status](https://api.netlify.com/api/v1/badges/441ff614-29ad-4643-b73b-286106d9c284/deploy-status)](https://app.netlify.com/sites/red-list-rr/deploys)

[![Continuous Integration](https://github.com/RazvanRauta/threatened_species/actions/workflows/main.yml/badge.svg)](https://github.com/RazvanRauta/threatened_species/actions/workflows/main.yml)

## Details

React app that is using data provided by [The International Union for Conservation of Nature’s Red List of Threatened Species](https://www.iucnredlist.org/) to display the species that are threatened.

## Install

### Prerequisites

- Node JS
- Yarn
- Api token from [here](https://apiv3.iucnredlist.org/api/v3/token)

#### Clone this repo

`git clone git@github.com:RazvanRauta/threatened_species.git`

### Install dependencies

`cd threatened_species && yarn`

### Add token

Add your token in the [.env](./.env) file:

`REACT_APP_API_TOKEN=token here`

## Run project locally

In the root folder run:

`yarn start`

the app will start on `http://localhost:3000`

<img src="./frontpage.png" width="600" >

## Build project

In the root folder run:

`yarn build`

## Demo

### [redlist.rrazvan.dev](https://redlist.rrazvan.dev/)
