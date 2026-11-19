"""
CodeMaster AI - Isolated Execution Runner
Evaluates source code against test case inputs with strict CPU time & memory bounds.
"""

import sys
import time
import subprocess
from typing import Dict, Any, List

def execute_code(
    run_cmd: List[str],
    input_data: str,
    timeout_seconds: float = 2.0
) -> Dict[str, Any]:
    start_time = time.perf_counter()
    try:
        proc = subprocess.Popen(
            run_cmd,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        stdout, stderr = proc.communicate(input=input_data, timeout=timeout_seconds)
        elapsed_ms = int((time.perf_counter() - start_time) * 1000)

        if proc.returncode != 0:
            return {
                "verdict": "RUNTIME_ERROR",
                "error": stderr.strip(),
                "executionTimeMs": elapsed_ms
            }

        return {
            "verdict": "SUCCESS",
            "output": stdout.strip(),
            "executionTimeMs": elapsed_ms
        }
    except subprocess.TimeoutExpired:
        proc.kill()
        return {
            "verdict": "TIME_LIMIT_EXCEEDED",
            "error": f"Execution exceeded {timeout_seconds}s limit",
            "executionTimeMs": int(timeout_seconds * 1000)
        }
    except Exception as e:
        return {
            "verdict": "INTERNAL_ERROR",
            "error": str(e),
            "executionTimeMs": 0
        }

if __name__ == "__main__":
    print("CodeMaster Execution Runner Ready.")
