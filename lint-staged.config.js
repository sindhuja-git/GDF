module.exports = {
  '**/*.{css,gql,graphql,html,json,less,md,mdx,scss,vue,yaml,yml}': [
    'prettier --write',
    'git add',
  ],
  '**/*.{js,jsx,ts,tsx}': [
    'prettier --write',
    "eslint --cache --ext '.js,.jsx,.ts,.tsx' --fix",
    'git add',
  ],
};
