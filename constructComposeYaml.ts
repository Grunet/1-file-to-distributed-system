import yaml from "npm:js-yaml";
import { serviceMap } from "./index.ts";

// const output = yaml.dump({
//   version: "3.9",
//   services: {
//     web: {
//       build: ".",
//       ports: [
//         "8000:5000",
//       ],
//     },
//     redis: {
//       image: "redis:alpine",
//     },
//   },
// });

// console.log(output);

const output = yaml.dump({
  version: "3.9",
  services: {
    orders: {
      build: "./tmp/orders",
      ports: [
        "3000:8080",
      ],
      environment: [
        "START_ORDER_SERVICE=true",
        "ORDER_SERVICE_HOSTNAME=http://orders:3000/",
        "INVENTORY_SERVICE_HOSTNAME=http://inventory:3001/",
      ],
      network_mode: "host",
    },
    inventory: {
      build: "./tmp/inventory",
      ports: [
        "3001:8081",
      ],
      environment: [
        "START_INVENTORY_SERVICE=true",
        "ORDER_SERVICE_HOSTNAME=http://orders:3000/",
        "INVENTORY_SERVICE_HOSTNAME=http://inventory:3001/",
      ],
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
//      environment:
//       - START_ORDER_SERVICE=true
//       - ORDER_SERVICE_HOSTNAME=http://orders:3000/
//       - INVENTORY_SERVICE_HOSTNAME=http://inventory:3001/
//      network_mode: host
//   inventory:
//     build: ./tmp/inventory/
//     ports:
//       - "8081:3001"
//      environment:
//       - START_INVENTORY_SERVICE=true
//       - ORDER_SERVICE_HOSTNAME=http://orders:3000/
//       - INVENTORY_SERVICE_HOSTNAME=http://inventory:3001/

// TODO - construct the YAML dynamically for the service map info
