# Design Reflection Document

## Design Choices & Trade-Offs

### Express vs Fastify

| Goal            | Description                                                                                      |                                               Express                                                |                                      Fastify                                      |
| --------------- | ------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------: |
| **Validation**  | Validate data in requests to improve security.                                                   | [✅ yes](https://github.com/evanshortiss/express-joi-validation?tab=readme-ov-file#usage-typescript) | [✅ yes](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/) |
| **Scalability** | Respond with a stream that exceeds the server’s memory, to support `GET /logs` with TBs of logs. |        [✅ yes](https://stackoverflow.com/questions/33283989/how-do-i-stream-json-from-node)         |           [✅ yes](https://github.com/fastify/fastify/discussions/5165)           |
| **Performance** | Load logs quickly for faster development and debugging.                                          |                                           🙁 10 501 req/s                                            |                                  ✅ 45 370 req/s                                  |

### Insert Performance

[StackOverflow](https://stackoverflow.com/a/1712873) recommends running batch inserts in a transaction with SQLite.

| Inserts in Transaction | Time to Insert & Read 1 000 000 Logs |
| :--------------------: | :----------------------------------: |
|         ✅ yes         |          ✅ 38.781 seconds           |
|         ❌ no          |          ❌ 343.937 seconds          |
