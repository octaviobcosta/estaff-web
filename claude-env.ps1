# Claude Code wrapper script for PowerShell with MCP support
# Sets up environment and configuration for MCP servers

# Set environment variables for MCP
$env:APPDATA = "C:\Users\octav\AppData\Roaming"
$env:CLAUDE_DESKTOP_CONFIG = "C:\Users\octav\AppData\Roaming\Claude\claude_desktop_config.json"

# Change to project directory
Set-Location "C:\Users\octav\Projetos\estaff-web"

# Run Claude Code with permissions flag
Write-Host "Starting Claude Code with MCP support..." -ForegroundColor Cyan
Write-Host "MCP config location: $env:APPDATA\Claude\claude_desktop_config.json" -ForegroundColor Gray

# Execute Claude Code
& "C:\Users\octav\.claude\local\node_modules\.bin\claude.cmd" --dangerously-skip-permissions $args