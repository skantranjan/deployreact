export default {
    branches: ["main"],
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/github",
        [
            "@codedependant/semantic-release-docker",
            {
                dockerTags: ["latest", "{{version}}"],
                dockerImage: "sdp-ui",
                dockerFile: "Dockerfile",
                dockerRegistry: "ghcr.io",
                dockerProject: "consumer-tech",
                dockerPublish: true,
                dockerLogin: false,
            },
        ],
    ],
};
