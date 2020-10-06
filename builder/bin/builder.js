#!/usr/bin/env node
process.env.MRBUILDER_PRESETS = `@flump/builder`;
process.env.MRBUILDER_PROFLIE = process.env.MRBUILDER_PROFLIE || process.argv[1].replace(/.*flump-builder-(.+?)(\.js)?/, '$1');

require('@mrbuilder/cli/bin/mrbuilder');
