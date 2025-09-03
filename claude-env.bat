@echo off
REM Claude Code wrapper script for Windows with MCP support
REM Sets up environment and configuration for MCP servers

REM Set environment variables for MCP
set APPDATA=C:\Users\octav\AppData\Roaming
set CLAUDE_DESKTOP_CONFIG=C:\Users\octav\AppData\Roaming\Claude\claude_desktop_config.json

REM Change to project directory
cd /d C:\Users\octav\Projetos\estaff-web

REM Display configuration info
echo Starting Claude Code with MCP support...
echo MCP config location: %APPDATA%\Claude\claude_desktop_config.json

REM Execute Claude Code
"C:\Users\octav\.claude\local\node_modules\.bin\claude.cmd" --dangerously-skip-permissions %*