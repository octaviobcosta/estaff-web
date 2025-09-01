# /memoout - Recuperar Contexto da Memória MCP

Recupera contexto salvo anteriormente do MCP Memory Server.

## Uso
```
/memoout "nome-da-memoria"  # Recupera memória específica
/memoout --list             # Lista todas as memórias disponíveis
/memoout --search "termo"   # Busca memórias por termo
```

## Implementação

### Listar Memórias
Quando $ARGUMENTS contém "--list" ou "-l":
```javascript
// Buscar todas as entidades do tipo WorkContext
mcp__memory__search_nodes({ query: "WorkContext" })

// Ou ler todo o grafo e filtrar
mcp__memory__read_graph()
// Depois filtrar entities onde entityType === "WorkContext"
```

Exibir como lista formatada:
```
📚 Memórias Disponíveis:
────────────────────────
1. auth-implementation (2025-01-18 14:30)
   📝 Implementação do sistema de autenticação

2. home-cleanup (2025-01-17 10:15)
   📝 Limpeza e otimização da página Home

3. admin-refactor (2025-01-16 16:45)
   📝 Refatoração completa do painel admin
```

### Recuperar Memória Específica
Quando $ARGUMENTS contém um nome:
```javascript
// Buscar entidade específica
mcp__memory__search_nodes({ query: "$NOME_DA_MEMORIA" })

// Ou abrir nós específicos
mcp__memory__open_nodes({ names: ["$NOME_DA_MEMORIA"] })
```

Exibir contexto completo:
```
📦 Memória: auth-implementation
═══════════════════════════════
📅 Timestamp: 2025-01-18T14:30:00Z
📁 Project: Portal eShows
🌿 Branch: feature/authentication
📂 Directory: C:\Users\octav\Projetos\portaleshows
📝 Context: Implementação do sistema de autenticação com JWT

✅ Active Tasks:
- Implementar login endpoint
- Criar middleware de autenticação
- Adicionar refresh token

📄 Recent Files:
- app/api/auth/login/route.ts
- app/middleware/auth.ts
- app/lib/jwt.ts

🎯 Next Steps:
- Testar fluxo completo
- Adicionar testes unitários
- Documentar API
```

### Buscar Memórias
Quando $ARGUMENTS contém "--search" seguido de termo:
```javascript
mcp__memory__search_nodes({ query: "$TERMO_BUSCA" })
```

## Exemplos

### Listar todas as memórias
```
/memoout --list
```

### Recuperar memória específica
```
/memoout "auth-implementation"
```

### Buscar memórias relacionadas
```
/memoout --search "admin"
```

## Integração com Workflow

1. **Início de sessão**: Use `/memoout --list` para ver contextos disponíveis
2. **Recuperar contexto**: Use `/memoout "nome"` para carregar contexto específico
3. **Continuar trabalho**: O contexto mostra onde parou e próximos passos
4. **Salvar progresso**: Use `/memoin "nome" "atualização"` para salvar novo estado

## Benefícios
- Recuperação rápida de contexto entre sessões
- Histórico completo de trabalho
- Busca inteligente por palavras-chave
- Visualização estruturada das informações