module.exports = {
  apps: [
    {
      name: "lokmanya",
      script: "npm",
      args: "start",
      node_args: "--max-old-space-size=1024",
      max_memory_restart: "400M"
    }
  ]
};
