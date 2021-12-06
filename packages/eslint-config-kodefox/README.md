# ESLint Config for KodeFox

ESLint configuration used for TypeScript projects.

## Install

```
yarn add --dev eslint-config-kodefox @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-eslint-comments eslint-plugin-import eslint-plugin-prettier
```

When using the `react` config, these additional dependencies are needed:
```
yarn add --dev eslint-plugin-react eslint-plugin-react-hooks
```

When using the `react-native` config, these additional dependencies are needed:
```
yarn add --dev eslint-plugin-react-native
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
