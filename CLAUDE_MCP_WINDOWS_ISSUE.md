# Claude Code - Problemas com MCP no Windows PowerShell

## 🔴 Problema Identificado

O Claude Code quando executado via linha de comando no Windows (PowerShell ou CMD) **não está reconhecendo ou carregando corretamente os servidores MCP** configurados no arquivo `claude_desktop_config.json`.

### Sintomas:
- Comando `claude mcp list` trava indefinidamente
- Claude Code não lista as ferramentas MCP disponíveis
- Os servidores MCP não são inicializados quando usando CLI

## 📁 Arquivos Criados

### Scripts Básicos (sem MCP):
- **`claude.ps1`** - Script PowerShell básico
- **`claude.bat`** - Script Batch básico

### Scripts com Tentativa de MCP:
- **`claude-mcp.ps1`** - PowerShell com configuração MCP local
- **`claude-mcp.bat`** - Batch com configuração MCP local
- **`mcp.json`** - Arquivo de configuração MCP local

### Scripts com Variáveis de Ambiente:
- **`claude-env.ps1`** - PowerShell com setup de ambiente
- **`claude-env.bat`** - Batch com setup de ambiente

## 🚀 Como Usar (Funcionalidade Básica)

### PowerShell:
```powershell
.\claude.ps1 --help
.\claude.ps1 "Sua pergunta aqui"
```

### CMD:
```cmd
claude.bat --help
claude.bat "Sua pergunta aqui"
```

## ⚠️ Limitações Conhecidas

1. **MCP não funciona via CLI no Windows**: Os servidores MCP configurados no Claude Desktop não são carregados quando o Claude Code é executado via linha de comando.

2. **Possíveis Causas**:
   - Diferenças no contexto de execução entre Claude Desktop App e CLI
   - Problemas de permissão ou acesso aos processos dos servidores MCP
   - Incompatibilidade do sistema de IPC (Inter-Process Communication) no Windows

## 💡 Soluções Alternativas

### 1. Use o Claude Desktop App
O método mais confiável para usar MCP no Windows é através do aplicativo Claude Desktop, onde os servidores MCP funcionam corretamente.

### 2. Use Claude Code sem MCP
Para automação e scripts, use o Claude Code via CLI mas sem depender dos servidores MCP:
```bash
.\claude.ps1 --dangerously-skip-permissions "Sua tarefa aqui"
```

### 3. WSL (Windows Subsystem for Linux)
Se você precisa de funcionalidade completa do Claude Code com MCP via CLI, considere usar WSL:
```bash
# No WSL
claude --mcp-config mcp.json "Sua pergunta"
```

## 🔧 Configuração MCP (para referência)

O arquivo `mcp.json` contém as configurações dos servidores MCP:
- Supabase
- GitHub
- Playwright
- Memory
- Everything
- Sequential Thinking
- Puppeteer
- Desktop Commander
- Excel
- Context7

Estas configurações funcionam no Claude Desktop mas não via CLI no Windows nativo.

## 📝 Notas Técnicas

- O Claude Code usa Node.js v22.14.0
- Localização da instalação: `C:\Users\octav\.claude\local\`
- Config global MCP: `C:\Users\octav\AppData\Roaming\Claude\claude_desktop_config.json`
- O flag `--dangerously-skip-permissions` bypassa verificações de permissão

## 🐛 Status do Bug

Este é um problema conhecido com o Claude Code no Windows quando executado via CLI. A equipe da Anthropic pode estar trabalhando em uma solução. Por enquanto, recomenda-se usar o Claude Desktop App para funcionalidade completa com MCP.

---

**Última atualização**: Setembro 2025