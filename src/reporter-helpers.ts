import { IReporterlPluginHost } from "./reporter-interface";

// tslint:disable:no-var-requires
const ReporterPluginHost = require("testcafe/lib/reporter/plugin-host");
const outStream: string = "";
const plugin: IReporterlPluginHost = new ReporterPluginHost({}, outStream);

export const nativeWrite = plugin.write;
export const nativeSetIndent = plugin.setIndent;
export const nativeNewLine = plugin.newline;
export const nativeFormatError = plugin.formatError;
