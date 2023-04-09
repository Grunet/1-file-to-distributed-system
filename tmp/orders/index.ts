import { serve } from "https://deno.land/std@0.178.0/http/server.ts";

// Orders service

const ordersHandler = async (request: Request): Promise<Response> => {
  await fetch(
    Deno.env.get(getServiceMetadata().inventory.envVarNames.hostname) ?? "",
  );

  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

if (Deno.env.get(getServiceMetadata().orders.envVarNames.startup)) {
  await serve(ordersHandler, { port: getServiceMetadata().orders.port });
}

// Inventory service

const inventoryHandler = (request: Request): Response => {
  const body = `Your user-agent is:\n\n${
    request.headers.get("user-agent") ?? "Unknown"
  }`;

  return new Response(body, { status: 200 });
};

if (Deno.env.get(getServiceMetadata().inventory.envVarNames.startup)) {
  await serve(inventoryHandler, { port: getServiceMetadata().inventory.port });
}

function getServiceMetadata() {
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

export { getServiceMetadata };
