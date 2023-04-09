import yaml from "npm:js-yaml";
import { getServiceMetadata } from "./index.ts";

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
        "8080:8080",
      ],
      environment: [
        "START_ORDER_SERVICE=true",
        "ORDER_SERVICE_HOSTNAME=http://orders:8080/",
        "INVENTORY_SERVICE_HOSTNAME=http://inventory:8081/",
      ],
      network_mode: "host",
    },
    inventory: {
      build: "./tmp/inventory",
      ports: [
        "8081:8081",
      ],
      environment: [
        "START_INVENTORY_SERVICE=true",
        "ORDER_SERVICE_HOSTNAME=http://orders:8080/",
        "INVENTORY_SERVICE_HOSTNAME=http://inventory:8081/",
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
//       - "8080:8080"
//      environment:
//       - START_ORDER_SERVICE=true
//       - ORDER_SERVICE_HOSTNAME=http://orders:8080/
//       - INVENTORY_SERVICE_HOSTNAME=http://inventory:8081/
//      network_mode: host
//   inventory:
//     build: ./tmp/inventory/
//     ports:
//       - "8081:8081"
//      environment:
//       - START_INVENTORY_SERVICE=true
//       - ORDER_SERVICE_HOSTNAME=http://orders:8080/
//       - INVENTORY_SERVICE_HOSTNAME=http://inventory:8081/

// TODO - construct the YAML dynamically for the service map info
