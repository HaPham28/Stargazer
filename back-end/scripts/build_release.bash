#!/bin/bash

cargo build --manifest-path ../Cargo.toml --bin server_side --package server_side --release

mkdir ../bin
cp ../target/release/server_side ../bin/server_side
chmod +x ../bin/server_side
