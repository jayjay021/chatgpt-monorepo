module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/github",
  ],
  prepare: ["@semantic-release/changelog", "@semantic-release/git"],
  publish: ["@semantic-release/github"],
  output: [
    {
      path: "semantic",
      setOutput: true,
    },
  ],
};
