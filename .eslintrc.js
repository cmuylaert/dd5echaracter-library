module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "parser":"babel-eslint",
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "commonjs":true,
        "jquery":true
    },
    "rules": {
        "no-underscore-dangle":"off",
        "no-unused-vars": ["error", { "argsIgnorePattern": "next|res|req" }],
        "forbid-prop-types":"off",
        "react/no-string-refs":"warn",
        "no-param-reassign":["error", {"props":false}]

    }
};