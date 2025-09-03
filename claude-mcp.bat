@echo off
REM Claude Code wrapper script for Windows with MCP support
REM Auto-includes --dangerously-skip-permissions and MCP config

set MCP_CONFIG=%~dp0mcp.json

if exist "%MCP_CONFIG%" (
    echo Loading MCP configuration from: %MCP_CONFIG%
    "C:\Users\octav\.claude\local\node_modules\.bin\claude.cmd" --dangerously-skip-permissions --mcp-config "%MCP_CONFIG%" -- %*
) else (
    echo MCP configuration not found, running without MCP servers
    "C:\Users\octav\.claude\local\node_modules\.bin\claude.cmd" --dangerously-skip-permissions %*
)