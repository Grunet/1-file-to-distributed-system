import { serve } from "https://deno.land/std@0.178.0/http/server.ts";

const serviceMap = {
  orders: {
    envVarNames: {
      startup: "START_ORDER_SERVICE",
      hostname: "ORDER_SERVICE_HOSTNAME",
    },
    port: 8000,
  },
  inventory: {
    envVarNames: {
      startup: "START_INVENTORY_SERVICE",
      hostname: "INVENTORY_SERVICE_HOSTNAME",
    },
    port: 8081,
  },
};

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

const inventoryHandler = (request: Request): Response => {
  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

if (Deno.env.get(serviceMap.orders.envVarNames.startup)) {
  await serve(inventoryHandler, { port: serviceMap.inventory.port });
}

export { serviceMap };
