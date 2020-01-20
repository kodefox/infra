# ESLint Config for KodeFox

ESLint configuration used for TypeScript projects.

## Install

```
$ yarn add --dev eslint-config-kodefox
```

## Usage

Modify `eslintConfig` in `package.json` as follows.

### TypeScript

```json
{
  "name": "cool-node-server",
  "eslintConfig": {
    "extends": "kodefox"
  }
}
```

### TypeScript + React

```json
{
  "name": "awesome-react-website",
  "eslintConfig": {
    "extends": "kodefox/react"
  }
}
```

### TypeScript + React Native

```json
{
  "name": "amazing-native-app",
  "eslintConfig": {
    "extends": "kodefox/react-native"
  }
}
```
