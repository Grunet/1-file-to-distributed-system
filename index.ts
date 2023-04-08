import { serve } from "https://deno.land/std@0.178.0/http/server.ts";

// Orders service

const ordersHandler = async (request: Request): Promise<Response> => {
  await fetch(Deno.env.get(serviceMap.inventory.envVarNames.hostname) ?? "");

  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

if (Deno.env.get(serviceMap.orders.envVarNames.startup)) {
  await serve(ordersHandler, { port: serviceMap.orders.port });
}

// Inventory service

const inventoryHandler = (request: Request): Response => {
  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

if (Deno.env.get(serviceMap.orders.envVarNames.startup)) {
  await serve(inventoryHandler, { port: serviceMap.inventory.port });
}

const serviceMap = {
  orders: {
    envVarNames: {
      startup: "START_ORDERS_SERVICE",
      hostname: "ORDERS_SERVICE_HOSTNAME",
    },
    port: 8080,
  },
  inventory: {
    envVarNames: {
      startup: "START_INVENTORY_SERVICE",
      hostname: "INVENTORY_SERVICE_HOSTNAME",
    },
    port: 8081,
  },
};

export { serviceMap };
