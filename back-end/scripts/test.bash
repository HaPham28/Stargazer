#!/bin/bash

export RUST_BACKTRACE=1
cargo +nightly test --manifest-path ../Cargo.toml --bin server_side
