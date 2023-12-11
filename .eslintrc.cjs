module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-standard-with-typescript',
        'prettier'
    ],
    'overrides': [],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'project': './tsconfig.json'
    },
    'plugins': [
        'react',
        '@typescript-eslint',
        'prettier'
    ],
    'rules': {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-explicit-any':['off']
    },
    'settings': {
        'react': {
            'version': 'detect',
        }
    }
}
