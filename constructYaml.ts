import yaml from "npm:js-yaml";

const output = yaml.dump({
  version: "3.9",
  services: {
    web: {
      build: ".",
      ports: [
        "8000:5000",
      ],
    },
    redis: {
      image: "redis:alpine",
    },
  },
});

console.log(output);

// version: "3.9"
// services:
//   orders:
//     build: ./tmp/orders/
//     ports:
//       - "8080:3000"
//   inventory:
//     build: ./tmp/inventory/
//     ports:
//       - "8081:3001"
