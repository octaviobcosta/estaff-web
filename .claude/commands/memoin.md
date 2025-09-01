# /memoin - Salvar Contexto na Memória MCP

Salva o contexto atual de trabalho no MCP Memory Server para recuperação posterior.

## Uso
```
/memoin "nome-da-memoria" "descrição do contexto"
```

## O que será salvo
- Nome da memória: $ARGUMENTS (primeiro parâmetro)
- Timestamp: Data e hora atual
- Projeto: Portal eShows
- Branch Git: Current branch
- Diretório: Working directory
- Contexto: Descrição fornecida
- Tarefas ativas: Lista de todos pendentes e em progresso
- Arquivos recentes: Últimos arquivos modificados

## Exemplo
```
/memoin "auth-implementation" "Implementação do sistema de autenticação com JWT e refresh tokens"
```

## Implementação

Você deve executar o seguinte processo para salvar a memória:

1. Parse dos argumentos para extrair nome e descrição
2. Coletar informações do contexto atual (git status, pwd, date)
3. Criar entidade no MCP Memory Server com:
   - name: Nome fornecido no argumento
   - entityType: "WorkContext"
   - observations: Array com todas as informações coletadas

Use o comando MCP:
```javascript
mcp__memory__create_entities({
  entities: [{
    name: "$NOME_DA_MEMORIA",
    entityType: "WorkContext",
    observations: [
      "📅 Timestamp: " + new Date().toISOString(),
      "📁 Project: Portal eShows",
      "🌿 Branch: " + git_branch,
      "📂 Directory: " + working_directory,
      "📝 Context: " + description,
      "✅ Active Tasks: " + active_tasks,
      "📄 Recent Files: " + recent_files,
      "🎯 Next Steps: " + next_steps
    ]
  }]
})
```

Ou adicionar a uma existente:
```javascript
mcp__memory__add_observations({
  observations: [{
    entityName: "$NOME_DA_MEMORIA",
    contents: ["Nova sessão: " + timestamp, ...new_observations]
  }]
})
```

## Benefícios
- Persiste entre sessões do Claude Code
- Compartilhável entre diferentes contextos
- Versionamento automático com timestamps
- Integração com o knowledge graph do projeto