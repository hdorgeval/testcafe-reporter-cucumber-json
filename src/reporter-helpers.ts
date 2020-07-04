import { ReporterlPluginHost } from './reporter-interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReporterPluginHost = require('testcafe/lib/reporter/plugin-host');
const outStream = '';
const plugin: ReporterlPluginHost = new ReporterPluginHost({}, outStream);

export const nativeWrite = plugin.write;
export const nativeSetIndent = plugin.setIndent;
export const nativeNewLine = plugin.newline;
export const nativeFormatError = plugin.formatError;
