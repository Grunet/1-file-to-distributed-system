FROM denoland/deno:1.32.1
EXPOSE 8081
WORKDIR /
COPY . .
CMD ["deno", "run", "--allow-net", "--allow-env", "index.ts"]