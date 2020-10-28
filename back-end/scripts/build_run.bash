#!/bin/bash

set -e
export RUST_BACKTRACE=full
./build_debug.bash
./run.bash
