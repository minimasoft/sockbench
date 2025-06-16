#!/usr/bin/env bash
#(cd ../minicomms && node main.js &)
#serve_pid=$!
#warm-up
#deno run --allow-net main.ts
#deno run --allow-net main.ts
#deno run --allow-net main.ts
#deno run --allow-net main.ts
for a in `seq 1 100`;
do
    echo "run "$a
    #deno --allow-net --allow-read ../minicomms/main.ts &
    #node ../minicomms/main.js &
    (cd ../minicomms && node main.js &)
    serve_pid=$!
    sleep 0.1s
    deno run --allow-net main.ts >> times_tls_hot_uWS.json;
    kill -9 $serve_pid
done
#kill -9 $serve_pid