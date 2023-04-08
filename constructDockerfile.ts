const port = 8080;
const entrypoint = "index.ts";

const dockefileAsString = `
FROM denoland/deno:1.32.1
EXPOSE ${port}
WORKDIR /
COPY . .
CMD ["deno", "run", "--allow-net", ${entrypoint}]
`;

console.log(dockefileAsString);
