#!/bin/bash

# Function to output a random quote
random_quote() {
    # Use the fortune utility or fallback to a random quote from `quotes.txt`
    if command -v fortune > /dev/null; then
        fortune
    else
        shuf -n 1 quotes.txt
    fi
}

# Start a Python server on port 8080, serving a random quote for every request
while true; do
    printf 'HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n%s' "$(random_quote)" | nc -l -p 8080 -q 1
done
