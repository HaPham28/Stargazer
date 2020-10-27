#!/bin/bash

export RUST_BACKTRACE=full
cargo +nightly test --manifest-path ../Cargo.toml --bin server_side
