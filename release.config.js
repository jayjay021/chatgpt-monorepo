module.exports = {
  branches: ['main'],
  repositoryUrl: 'https://github.com/your-repo/your-repo',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    '@semantic-release/docker',
  ],
};
