# Claude Code wrapper script for PowerShell with MCP support
# Auto-includes --dangerously-skip-permissions and MCP config

$mcpConfig = Join-Path $PSScriptRoot "mcp.json"

if (Test-Path $mcpConfig) {
    Write-Host "Loading MCP configuration from: $mcpConfig" -ForegroundColor Green
    & "C:\Users\octav\.claude\local\node_modules\.bin\claude.cmd" --dangerously-skip-permissions --mcp-config $mcpConfig $args
} else {
    Write-Host "MCP configuration not found, running without MCP servers" -ForegroundColor Yellow
    & "C:\Users\octav\.claude\local\node_modules\.bin\claude.cmd" --dangerously-skip-permissions $args
}