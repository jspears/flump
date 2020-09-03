#!/usr/bin/env node
process.env.MRBUILDER_INTERNAL_PRESETS=`@flump/builder`
require('@mrbuilder/cli/bin/mrbuilder');
