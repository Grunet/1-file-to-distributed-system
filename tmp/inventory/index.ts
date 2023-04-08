import { serve } from "https://deno.land/std@0.178.0/http/server.ts";

// Orders service

const ordersHandler = async (request: Request): Promise<Response> => {
  await fetch(
    Deno.env.get(getServiceMap().inventory.envVarNames.hostname) ?? "",
  );

  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

if (Deno.env.get(getServiceMap().orders.envVarNames.startup)) {
  await serve(ordersHandler, { port: getServiceMap().orders.port });
}

// Inventory service

const inventoryHandler = (request: Request): Response => {
  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

if (Deno.env.get(getServiceMap().inventory.envVarNames.startup)) {
  await serve(inventoryHandler, { port: getServiceMap().inventory.port });
}

function getServiceMap() {
  const serviceMap = {
    orders: {
      entrypoint: true,
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

  return serviceMap;
}

export { getServiceMap };
