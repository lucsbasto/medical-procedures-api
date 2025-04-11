const Configuration = {
  formatter: "@commitlint/format",
  plugins: [
    {
      rules: {
        'custom-type-enum': ({ type }) => {
          const expectedTypes = ["feat", "fix", "build", "chore", "ci", "docs", "perf", "refactor", "revert", "style", "test"]
          if (!expectedTypes.includes(type)) {
            return [false,
              `
              Type must be one of: ${expectedTypes.join(', ')} \n
              Example: feat: add new feature
              `];
          }
          return [true];
        },
      },
    },
  ],
  rules: {
    'custom-type-enum': [2, 'always'],
  },
  ignores: [(commit) => commit === ""],
  defaultIgnores: true,
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
};

export default Configuration;