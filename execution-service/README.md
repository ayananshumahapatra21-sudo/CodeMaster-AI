# CodeMaster AI - Code Execution Service (Sandboxed Runner)

The Code Execution Service is an isolated sandbox engine dedicated to securely compiling, executing, and evaluating untrusted user code against test cases.

## Security Architecture
- **Process Isolation**: Code runs inside hardened, unprivileged container sandboxes.
- **Resource Constraints**:
  - Max Execution Time: 2.0 seconds (Time Limit Exceeded protection).
  - Max Memory Allocation: 256MB (Memory Limit Exceeded protection).
  - Max Output Size: 1MB.
- **Zero Network Access**: Network interfaces (`--network none`) are disabled during execution.
- **Read-Only Root Filesystem**: Temporary directories (`/tmp`) are mounted with `noexec` or strict isolated volume bounds.

## Supported Languages
- Java 21+ (`javac` / `java`)
- Python 3.12+ (`python3`)
- C++ 20 (`g++ -O3`)
- JavaScript / Node.js 22+ (`node`)

## Communication Flow
1. Spring Boot receives user submission and publishes execution request.
2. Execution Runner creates isolated temporary environment.
3. Code is compiled (if applicable) and executed against test cases.
4. Results (`status`, `runtimeMs`, `memoryKb`, `verdict`) are returned to the API server.
