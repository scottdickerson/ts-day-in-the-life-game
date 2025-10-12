The `/api/arduino-events` route constructs a `ReadableStream` to emit Server-Sent Events (SSE), connects it to the Arduino service, and enqueues `UTF8Array` data to the stream based on callbacks from the Arduino service.

The Client code in the `useArduinoButtons` hook "subscribes" to the `ReadableStream`s Server Sent Events (SSE) with a `EventSource` object that just takes a URL and has it's own set of callback handlers for when the connection is established, when a message is received, and when the connection is closed. It's a relatively simple interface whose most important parts are the `onmessage` and `onerror` callbacks.

Another really interesting part that the `services/arduinoService` is a class that extends `EventEmitter` so that the OOTB `EventEmitter` methods like `on`, `off`, `emit`, etc. are available on the `arduinoService` instance.

This means that the the `ReadableStream` is really just a bridge between the `arduinoService` and the `EventSource` object in the client code.
