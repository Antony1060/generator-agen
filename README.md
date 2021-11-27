# agen
### a simple generator mostly for bootstrapping react and express apps

## Installation
### NPM
```bash
npm i -g yo generator-agen
```
### Yarn
```bash
yarn global add yo generator-agen
```

## Usage
```
yo agen
```
And that's basically it!

## Templates
1. React (Parcel)
    ```
    .
    ├── src
    │   ├── components
    │   │   └── App.tsx
    │   ├─── state
    │   │   └── index.ts
    │   ├── index.html
    │   ├── index.tsx
    │   └── parcel.d.ts
    ├── .env
    ├── .env.example
    ├── tsconfig.json
    └── package.json
    ```
2. Express
    ```
    .
    ├── src
    │   ├── app.ts
    ├── typings
    │   └── environment.d.ts
    ├── .env
    ├── .env.example
    ├── tsconfig.json
    └── package.json
    ```
3. Simple node app
    ```
    .
    ├── src
    │   └── index.jss
    └── package.json
    ```