// Log with the debug priority level
console.debug("debug");

// The following log levels are also provided
// console.info("info");
// console.notice("notice");
// console.warn("warn");
// console.error("error");
// console.critical("critical");
// console.alert("alert");
// console.emerg("emerg");
// console.log("log/info")
// console.trace("trace/debug");

// Advanced printf style formatting is supported
// logged as 10011010010 Ӓ 1234 1234 1.234e+3 1.234E+3 1234 2322 'abcd' abcd ABCD 1234 4d2 4D2 "abcd"
console.log ("%1$b %1$c %1$i %1$d %1$e %1$E %1$f %1$o %2$O %2$s %2$S %1$u %1$x %1$X %2$j", 1234, "abcd");

// %b binary
// %c unsigned char
// %i unsigned decimal
// %d unsigned decimal
// %e scientific notation
// %E scientific notation uppercase
// %f floating point
// %o unsigned octal
// %O object inspect
// %s string - toString()
// %S string uppercase
// %u unsigned decimal
// %x unsigned hexadecimal
// %X unsigned hexadecimal uppercase
// %j JSON.stringify
