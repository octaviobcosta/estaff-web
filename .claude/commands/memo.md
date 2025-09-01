# /memo - Sistema de Memória MCP Completo

Sistema unificado de memória usando MCP Memory Server para salvar e recuperar contextos de trabalho.

## Comandos Disponíveis

### Salvar Contexto
```
/memo save "nome" "descrição"     # Salva contexto atual
/memo in "nome" "descrição"       # Alias para save
```

### Recuperar Contexto
```
/memo get "nome"                  # Recupera contexto específico
/memo out "nome"                  # Alias para get
```

### Listar e Buscar
```
/memo list                        # Lista todas as memórias
/memo search "termo"              # Busca memórias por termo
/memo recent                      # Lista 5 memórias mais recentes
```

### Gerenciar Memórias
```
/memo update "nome" "nova info"   # Adiciona informação a memória existente
/memo delete "nome"               # Remove memória (use com cuidado!)
/memo graph                       # Visualiza todo o knowledge graph
```

## Implementação Detalhada

### 1. SAVE - Salvar Contexto
```javascript
// Parse: /memo save "project-x" "Working on authentication"
const [command, name, ...descParts] = $ARGUMENTS.split(' ')
const description = descParts.join(' ').replace(/"/g, '')

// Coletar contexto
const timestamp = new Date().toISOString()
const gitBranch = await bash('git branch --show-current')
const gitStatus = await bash('git status --short')
const recentFiles = await bash('git diff --name-only HEAD~5..HEAD')

// Salvar no MCP
mcp__memory__create_entities({
  entities: [{
    name: name.replace(/"/g, ''),
    entityType: "WorkContext",
    observations: [
      `📅 Saved: ${timestamp}`,
      `📝 Description: ${description}`,
      `🌿 Git Branch: ${gitBranch}`,
      `📊 Git Status: ${gitStatus}`,
      `📄 Recent Files: ${recentFiles}`,
      `📂 Directory: ${process.cwd()}`,
      `🎯 Claude Session: Active`
    ]
  }]
})
```

### 2. GET - Recuperar Contexto
```javascript
// Parse: /memo get "project-x"
const name = $ARGUMENTS.split(' ')[1].replace(/"/g, '')

// Buscar no MCP
const result = await mcp__memory__search_nodes({ query: name })

// Formatar e exibir
if (result.entities.length > 0) {
  const entity = result.entities[0]
  console.log(`
📦 Contexto: ${entity.name}
${'═'.repeat(50)}
${entity.observations.map(obs => `  ${obs}`).join('\n')}

💡 Dica: Use /memo update "${entity.name}" "nova informação" para adicionar dados
  `)
} else {
  console.log(`❌ Memória "${name}" não encontrada. Use /memo list para ver disponíveis.`)
}
```

### 3. LIST - Listar Memórias
```javascript
// Buscar todas WorkContext entities
const graph = await mcp__memory__read_graph()
const workContexts = graph.entities.filter(e => e.entityType === "WorkContext")

// Ordenar por data (mais recente primeiro)
const sorted = workContexts.sort((a, b) => {
  const dateA = a.observations.find(o => o.includes('Saved:'))
  const dateB = b.observations.find(o => o.includes('Saved:'))
  return dateB.localeCompare(dateA)
})

// Exibir lista formatada
console.log(`
📚 Memórias Disponíveis (${sorted.length} total)
${'─'.repeat(50)}
${sorted.map((ctx, i) => {
  const date = ctx.observations.find(o => o.includes('Saved:'))?.split('Saved: ')[1]
  const desc = ctx.observations.find(o => o.includes('Description:'))?.split('Description: ')[1]
  return `
${i + 1}. 📦 ${ctx.name}
   📅 ${date || 'Data desconhecida'}
   📝 ${desc || 'Sem descrição'}
`}).join('\n')}

💡 Use: /memo get "nome" para recuperar contexto completo
`)
```

### 4. SEARCH - Buscar Memórias
```javascript
const searchTerm = $ARGUMENTS.split(' ').slice(1).join(' ').replace(/"/g, '')
const results = await mcp__memory__search_nodes({ query: searchTerm })

console.log(`
🔍 Resultados para "${searchTerm}" (${results.entities.length} encontrados)
${'─'.repeat(50)}
${results.entities.map(entity => `
📦 ${entity.name} (${entity.entityType})
${entity.observations.slice(0, 3).map(o => `   • ${o}`).join('\n')}
   ...
`).join('\n')}
`)
```

### 5. UPDATE - Atualizar Memória
```javascript
const [command, name, ...infoParts] = $ARGUMENTS.split(' ')
const newInfo = infoParts.join(' ').replace(/"/g, '')

await mcp__memory__add_observations({
  observations: [{
    entityName: name.replace(/"/g, ''),
    contents: [
      `📅 Updated: ${new Date().toISOString()}`,
      `📝 ${newInfo}`
    ]
  }]
})

console.log(`✅ Memória "${name}" atualizada com sucesso!`)
```

### 6. DELETE - Remover Memória
```javascript
const name = $ARGUMENTS.split(' ')[1].replace(/"/g, '')

// Confirmar antes de deletar
console.log(`⚠️ Tem certeza que deseja deletar "${name}"? Esta ação não pode ser desfeita.`)
// Em produção, aguardar confirmação do usuário

await mcp__memory__delete_entities({
  entityNames: [name]
})

console.log(`🗑️ Memória "${name}" removida com sucesso.`)
```

### 7. GRAPH - Visualizar Knowledge Graph
```javascript
const graph = await mcp__memory__read_graph()

console.log(`
🌐 Knowledge Graph Overview
${'═'.repeat(50)}
📊 Total Entities: ${graph.entities.length}
🔗 Total Relations: ${graph.relations.length}

📦 Entity Types:
${Object.entries(
  graph.entities.reduce((acc, e) => {
    acc[e.entityType] = (acc[e.entityType] || 0) + 1
    return acc
  }, {})
).map(([type, count]) => `   • ${type}: ${count}`).join('\n')}

🏷️ Top Entities:
${graph.entities.slice(0, 10).map(e => `   • ${e.name} (${e.entityType})`).join('\n')}
`)
```

## Exemplos de Uso

### Workflow Típico
```bash
# Início do dia - ver o que estava fazendo
/memo list
/memo get "auth-feature"

# Trabalhar no projeto...

# Salvar progresso antes de pausa
/memo save "auth-feature" "Login endpoint completo, falta refresh token"

# Adicionar nota importante
/memo update "auth-feature" "Bug encontrado: token expira muito rápido"

# Buscar contextos relacionados
/memo search "authentication"
```

### Organização de Projetos
```bash
# Salvar diferentes contextos
/memo save "sprint-23-backend" "API refactoring sprint 23"
/memo save "sprint-23-frontend" "UI improvements sprint 23"
/memo save "hotfix-prod-001" "Production bug fix - payment gateway"

# Recuperar contexto específico
/memo get "hotfix-prod-001"
```

## Vantagens

✅ **Persistência Total**: Memórias salvas no MCP Memory Server persistem entre sessões
✅ **Busca Inteligente**: Encontre contextos rapidamente
✅ **Histórico Completo**: Todas as atualizações são registradas com timestamp
✅ **Integração Natural**: Funciona com o knowledge graph existente do projeto
✅ **Comandos Simples**: Interface intuitiva e consistente

## Notas Técnicas

- As memórias são salvas como entidades do tipo "WorkContext" no MCP Memory Server
- Cada memória pode ter múltiplas observações (histórico de updates)
- O sistema se integra com o knowledge graph existente do projeto
- Memórias podem ter relações com outras entidades (features, bugs, etc.)

---

💡 **Dica Pro**: Use nomes descritivos e consistentes para suas memórias, como:
- `feature-[nome]` para features
- `bug-[numero]` para bugs
- `sprint-[numero]` para sprints
- `hotfix-[id]` para hotfixes