# 🤖 Agentes Nativos Locais - Claude Code

## Visão Geral

Este projeto contém **24 agentes especializados** definidos localmente no diretório `.claude/agents/`. Cada agente é um especialista dedicado em sua área, otimizado para tarefas específicas de desenvolvimento de software.

---

## 📋 Índice de Categorias

1. [Arquitetos e Especialistas (6 Agentes)](#-1-arquitetos-e-especialistas-6-agentes)
2. [Limpeza e Qualidade (4 Agentes)](#-2-limpeza-e-qualidade-4-agentes)
3. [Implementação e Execução (4 Agentes)](#-3-implementação-e-execução-4-agentes)
4. [Análise e Debug (4 Agentes)](#-4-análise-e-debug-4-agentes)
5. [Segurança e Otimização (3 Agentes)](#-5-segurança-e-otimização-3-agentes)
6. [Design e UX (2 Agentes)](#-6-design-e-ux-2-agentes)
7. [Orquestração (1 Agente Master)](#-7-orquestração-1-agente-master)

---

## 🏗️ 1. Arquitetos e Especialistas (6 Agentes)

### `api-backend-architect`
**Especialista em APIs e Arquitetura Backend**
- **Modelo**: Opus
- **Cor**: Cyan
- **Especializações**: 
  - Design de APIs REST/GraphQL
  - Domain-Driven Design (DDD)
  - Arquiteturas orientadas a eventos
  - Integração com Supabase/PostgreSQL
- **Casos de Uso**:
  - Sistemas de e-commerce com regras complexas
  - Workflows de negócio com saga patterns
  - Edge Functions serverless
  - Middleware de autenticação e validação

### `database-schema-architect`
**Arquiteto de Esquemas de Banco de Dados**
- **Modelo**: Opus
- **Cor**: Yellow
- **Especializações**:
  - Análise de dados mock (CSV, JSON, Excel)
  - Geração de schemas PostgreSQL/Supabase
  - Migrações incrementais com rollback
  - Otimização de performance e índices
- **Casos de Uso**:
  - Conversão de dados mock para produção
  - Otimização de queries e índices
  - Migrações seguras com validação
  - Políticas RLS e segurança

### `devops-pipeline-architect`
**Especialista em DevOps e Pipelines CI/CD**
- **Especializações**:
  - Arquiteturas de deployment
  - Pipelines CI/CD automatizados
  - Infrastructure as Code
  - Monitoramento e observabilidade
- **Casos de Uso**:
  - Setup de pipelines automatizados
  - Deploy zero-downtime
  - Configuração de monitoramento
  - Rollback automático

### `content-master-pro`
**Especialista em Conteúdo e Pesquisa Web**
- **Especializações**:
  - Pesquisa web avançada
  - Criação de conteúdo profissional
  - Verificação de informações atuais
  - Redação técnica
- **Casos de Uso**:
  - Documentação técnica atualizada
  - Pesquisa de tecnologias emergentes
  - Criação de guias e tutoriais
  - Verificação de informações

### `data-relations-mapper-auditor`
**Auditor de Relacionamentos de Dados**
- **Especializações**:
  - Mapeamento de relacionamentos complexos
  - Auditoria de consistência de dados
  - Migrações de sistema
  - Refatoração de dados
- **Casos de Uso**:
  - Migrações de banco de dados
  - Auditoria de integridade
  - Mapeamento de dependências
  - Refatoração de esquemas

### `error-monitoring-specialist`
**Especialista em Monitoramento de Erros**
- **Especializações**:
  - Sistemas de monitoramento
  - Detecção proativa de erros
  - Alertas inteligentes
  - Análise de logs
- **Casos de Uso**:
  - Setup de Sentry/DataDog
  - Dashboards de monitoramento
  - Alertas automatizados
  - Análise de padrões de erro

---

## 🧹 2. Limpeza e Qualidade (4 Agentes)

### `code-cleaner-eliminator`
**O Limpador - Especialista Agressivo em Limpeza de Código**
- **Filosofia**: "Sem sentimentalismo com código legado. Zero tolerância com débito técnico."
- **Especializações**:
  - Eliminação de duplicação
  - Exterminação de código morto
  - Refatoração silenciosa (callback hell → async/await)
  - Otimização extrema (O(n²) → O(n))
- **Métricas de Sucesso**:
  - -40% linhas de código
  - 0 duplicações
  - <5 complexidade ciclomática
  - 100/100 Lighthouse

### `qa-guardian-code-cleaner`
**Guardião QA - Especialista Obsessivo em Qualidade**
- **Missão**: "Proteger a base de código como um templo sagrado"
- **Processo de Análise**:
  1. Scanner de duplicação
  2. Detector de código preguiçoso
  3. Caçador de más práticas
  4. Eliminador de gambiarras
  5. Destruidor de interferências
  6. Guardião da escalabilidade
- **Critérios de Aprovação**:
  - DRY: ZERO duplicação
  - KISS: Complexidade mínima
  - Princípios SOLID respeitados
  - Performance: Lighthouse 100/100

### `code-machine-executor`
**Máquina de Código - Executor de Especificações**
- **Missão**: "Transformar specs em código de produção com precisão cirúrgica"
- **Domínio Técnico**:
  - TypeScript, JavaScript, Python, SQL
  - React, Next.js, Vue, Tailwind
  - Node.js, Express, FastAPI, Prisma
- **Superpoderes**:
  - Reconhecimento de padrões instantâneo
  - Mestre em boilerplate
  - Prevenção de erros
  - Paranoia de type safety
- **Garantia**: 500+ linhas/hora, 0 bugs de sintaxe, 100% cobertura de tipos

### `mvp-reality-check`
**Simplificador de MVPs**
- **Missão**: "Simplificar features complexas em versões MVP robustas"
- **Especializações**:
  - Redução de débito técnico
  - Otimização de tempo de desenvolvimento
  - Simplificação de arquitetura
  - Foco em funcionalidade essencial
- **Casos de Uso**:
  - Transformação de features complexas em MVP
  - Priorizacao de funcionalidades
  - Otimização de recursos
  - Aceleração de time-to-market

---

## ⚙️ 3. Implementação e Execução (4 Agentes)

### `functional-ui-implementation`
**Implementador de UI Funcional**
- **Modelo**: Opus
- **Cor**: Cyan
- **Missão**: "Transformar layouts estáticos em aplicações totalmente funcionais"
- **Capacidades Principais**:
  1. Análise visual e semântica
  2. Mapeamento de fluxos e gerenciamento de estado
  3. Estratégia de implementação inteligente
  4. Seleção de stack tecnológico
  5. Melhoria automática de features
- **Casos de Uso**:
  - E-commerce: layouts → carrinhos funcionais
  - Dashboards: mockups → dados reais
  - Formulários: designs → validação completa
  - SPAs: wireframes → aplicações completas

### `runtime-bug-preventer`
**Prevencionista de Bugs em Runtime**
- **Missão**: "Detectar e corrigir bugs proativamente antes da execução"
- **Especializações**:
  - Detecção proativa de bugs
  - Análise estática de código
  - Prevenção de erros em Next.js/React
  - Validação antes do desenvolvimento
- **Casos de Uso**:
  - Prevenção de erros de hidratação
  - Validação de tipos em runtime
  - Detecção de memory leaks
  - Prevenção de race conditions

### `performance-optimizer`
**Otimizador de Performance**
- **Missão**: "Melhorias de speed e resource efficiency"
- **Especializações**:
  - Otimização de bundle size
  - Lazy loading inteligente
  - Otimização de rendering
  - Core Web Vitals
- **Casos de Uso**:
  - Melhoria de métricas Lighthouse
  - Otimização de First Contentful Paint
  - Redução de bundle size
  - Melhoria de Time to Interactive

### `media-cdn-optimizer`
**Otimizador de Mídia e CDN**
- **Missão**: "Otimização de imagens, vídeos e CDN"
- **Especializações**:
  - Compressão inteligente de imagens
  - Configuração de CDN
  - Formatos modernos (WebP, AVIF)
  - Lazy loading de mídia
- **Casos de Uso**:
  - Setup de CDN otimizado
  - Compressão automática
  - Responsive images
  - Video streaming otimizado

---

## 🔍 4. Análise e Debug (4 Agentes)

### `debug-surgeon`
**Cirurgião de Debug - Especialista em Correção Cirúrgica**
- **Missão**: "Identificar e corrigir bugs preservando 100% da arquitetura original"
- **Princípios Operacionais**:
  - Não-invasividade: nunca modificar estrutura fundamental
  - Preservação de intenção: manter intenção do desenvolvedor original
  - Transparência: documentar cada alteração
  - Validação contínua: testar para garantir zero regressão
- **Workflow**: SCAN → DETECT → MAP → ANALYZE → FIX → VALIDATE → REPORT
- **Garantias**:
  - Funcionalidade original 100% preservada
  - Zero alteração em features existentes
  - Performance igual ou superior

### `code-sherlock`
**Sherlock Holmes do Código**
- **Missão**: "Investigar bugs complexos e intermitentes que desafiam debug convencional"
- **Especializações**:
  - Problemas de performance misteriosos
  - Race conditions e falhas dependentes de timing
  - Memory leaks e esgotamento de recursos
  - Bugs que desaparecem quando observados
  - Problemas exclusivos de produção
- **Métodos**:
  - Análise forense
  - Reconhecimento de padrões
  - Investigação sistemática
  - Detecção de mistérios de código

### `test-coverage-guardian`
**Guardião de Cobertura de Testes**
- **Missão**: "Garantir cobertura abrangente de testes e qualidade de QA"
- **Especializações**:
  - Cobertura completa de testes
  - Qualidade de assertions
  - Estratégias de teste
  - Automação de QA
- **Casos de Uso**:
  - Auditoria de cobertura de testes
  - Melhoria de test suites
  - Implementação de testes faltantes
  - Otimização de pipeline de QA

### `workflow-integrity-validator`
**Validador de Integridade de Workflows**
- **Missão**: "Validar completude de workflows, operações CRUD e transições de estado"
- **Especializações**:
  - Validação de workflows de sistema
  - Consistência de operações CRUD
  - Coerência de campos entre páginas
  - Integridade de transições de estado
- **Casos de Uso**:
  - Auditoria de workflows completos
  - Validação de consistência de dados
  - Verificação de transições de estado
  - Validação de integridade do sistema

---

## 🔒 5. Segurança e Otimização (3 Agentes)

### `security-privacy-guardian`
**Guardião de Segurança e Privacidade**
- **Missão**: "Implementar segurança robusta e compliance LGPD/GDPR"
- **Responsabilidades Principais**:
  1. Compliance de privacidade (LGPD/GDPR)
  2. Segurança de banco de dados (RLS policies)
  3. Autenticação (MFA, gerenciamento de sessão)
  4. Sistemas de auditoria
  5. Assessment de segurança
- **Abordagem**: 
  - Security-First: defesa em profundidade
  - Zero Trust: verificar tudo, confiar em nada
  - Compliance by Design: privacidade na arquitetura
- **Padrões de Qualidade**:
  - Testes de políticas de segurança
  - Cobertura de direitos do titular de dados
  - Suporte a padrões modernos (MFA)
  - Logs de auditoria imutáveis

### `seo-meta-optimizer`
**Otimizador de SEO e Meta Tags**
- **Missão**: "Otimização para motores de busca e gerenciamento de meta tags"
- **Especializações**:
  - Otimização de SEO técnico
  - Meta tags dinâmicas
  - Schema markup
  - Performance para SEO
- **Casos de Uso**:
  - Auditoria de SEO técnico
  - Implementação de meta tags
  - Otimização de Core Web Vitals
  - Configuração de sitemap

### `transition-master-ux`
**Mestre em Transições e UX**
- **Missão**: "Especialista em animações e transições para interações suaves"
- **Especializações**:
  - Animações performantes
  - Transições de página
  - Micro-interações
  - UX motion design
- **Casos de Uso**:
  - Implementação de animações CSS/JS
  - Transições entre páginas
  - Loading states animados
  - Hover effects sofisticados

---

## 🎨 6. Design e UX (2 Agentes)

### `premium-design-specialist`
**Especialista em Design Premium**
- **Modelo**: Opus
- **Cor**: Purple
- **Missão**: "Transformar projetos ordinários em experiências extraordinárias"
- **Framework de Excelência em Design**:
  1. **Pilares de Excelência**: Hierarquia visual, micro-interações, design responsivo
  2. **Metodologia de Avaliação**: Análise multi-lente (User Impact 40%, Business Value 25%, Technical Feasibility 15%)
  3. **Workflow de Design Sprint**: DISCOVER → DEFINE → IDEATE → PROTOTYPE → TEST
- **Padrões de Qualidade Não-Negociáveis**:
  - Acessibilidade: WCAG 2.1 AA mínimo
  - Performance: Core Web Vitals
  - Privacidade: GDPR/CCPA compliant
  - Ética: Sem dark patterns
- **Casos de Uso**:
  - Review de hierarquia visual
  - Compliance de design system
  - Criação de componentes excepcionais
  - Análise de impacto no negócio

### `pixel-perfectionist`
**Perfeccionista de Pixels**
- **Missão**: "Obsessão por precisão de UI para alinhamento pixel-perfect"
- **Especializações**:
  - Alinhamento pixel-perfect
  - Padronização de espaçamento
  - Consistência visual
  - Micro-ajustes de UI
- **Casos de Uso**:
  - Alinhamento preciso de elementos
  - Padronização de grids
  - Consistência de espaçamentos
  - Refinação de detalhes visuais

---

## 🎼 7. Orquestração (1 Agente Master)

### `maestro-orchestrator`
**O Maestro - Orquestrador Supremo do SuperClaude Framework**
- **Modelo**: Opus
- **Cor**: Orange
- **Missão**: "Como um maestro, traduzir intenções do usuário em sinfonias AI perfeitamente orquestradas"
- **REGRA ABSOLUTA**: 🚨 **NUNCA Executa - Apenas Orquestra**
  - É um GERADOR DE COMANDOS, não executor
  - Nunca escreve código, lê arquivos ou executa bash
  - **SEU Único OUTPUT**: O comando perfeito para outros agentes executarem
- **Recursos Disponíveis**:
  - 54 Comandos Especializados
  - 11 Personas Especialistas
  - 8 Comandos Wave-Enabled
  - 4 Servidores MCP
- **Estratégias de Orquestração**:
  1. Análise inteligente de requisitos
  2. Matriz de seleção de comandos
  3. Lógica de orquestração Wave
  4. Regras de execução paralela
- **Protocolos Críticos**:
  - 🔴 PROTOCOLO ZERO CONTEXT LOSS (PRIORIDADE ABSOLUTA)
  - Cadeia de continuidade de contexto (OBRIGATÓRIA)
  - Auto-trigger de QA (OBRIGATÓRIO)
  - Integração de memória MCP
- **Framework de Decisão**:
  - Tarefas simples de UI → `/sc:build` + Magic + frontend persona
  - Features complexas → `/sc:implement` + wave mode + all MCPs
  - Problemas de performance → `/sc:analyze --focus performance` + Playwright
  - Auditoria de segurança → `/sc:analyze --focus security` + Sequential + security persona

---

## 🚀 Padrões de Ativação e Uso

### Como Ativar os Agentes

**Ativação Manual via Task Tool:**
```bash
# Usar agent específico
Task(subagent_type="premium-design-specialist", description="Review UI design", prompt="...")

# Exemplos práticos:
Task(subagent_type="debug-surgeon", description="Fix authentication bug", prompt="...")
Task(subagent_type="api-backend-architect", description="Design user API", prompt="...")
Task(subagent_type="qa-guardian-code-cleaner", description="Code quality review", prompt="...")
```

**Padrões de Uso Recomendado:**

1. **Para Desenvolvimento Backend:**
   - `api-backend-architect` → APIs REST/GraphQL
   - `database-schema-architect` → Schemas e migrações
   - `security-privacy-guardian` → Segurança e compliance

2. **Para Frontend e Design:**
   - `premium-design-specialist` → Design excepcional
   - `functional-ui-implementation` → Mockups funcionais
   - `pixel-perfectionist` → Alinhamento preciso

3. **Para Qualidade e Limpeza:**
   - `qa-guardian-code-cleaner` → Auditoria de qualidade
   - `code-cleaner-eliminator` → Limpeza agressiva
   - `debug-surgeon` → Correção cirúrgica

4. **Para Orquestração Complexa:**
   - `maestro-orchestrator` → Coordenação multi-agente

### Métricas de Performance

- **Agentes de Arquitetura**: 90-95% de precisão em design de APIs
- **Agentes de Limpeza**: 40% redução de linhas de código
- **Agentes de Debug**: 95% taxa de correção sem regressão
- **Agentes de Design**: Compliance WCAG 2.1 AA garantido
- **Maestro**: Coordenação de até 15 agentes simultaneamente

---

## 📊 Arquivos de Configuração

**Localização dos Agentes**: `.claude/agents/`

**Estrutura de Cada Agente**:
```yaml
---
name: nome-do-agente
description: Descrição e casos de uso
model: opus|sonnet|haiku
color: cor-do-tema
---

# Conteúdo completo da personalidade e instruções do agente
```

**Arquivo de Implementação JavaScript**:
- `code-sherlock-implementation.js` - Implementação especializada para debug

**Agentes com Modelos Especializados**:
- **Opus**: `api-backend-architect`, `database-schema-architect`, `premium-design-specialist`, `functional-ui-implementation`, `maestro-orchestrator`
- **Outros**: Usam modelo padrão do sistema

**Cores Temáticas**:
- 🔵 **Cyan**: Backend/APIs (`api-backend-architect`, `functional-ui-implementation`)
- 🟡 **Yellow**: Database (`database-schema-architect`)
- 🟣 **Purple**: Design (`premium-design-specialist`)
- 🟠 **Orange**: Orquestração (`maestro-orchestrator`)

---

## 💡 Conclusão

Este conjunto de **24 agentes especializados** oferece uma cobertura completa para desenvolvimento de software profissional:

### Destaques dos Agentes

**🎆 Agentes Premium:**
- `maestro-orchestrator` - O cérebro que coordena tudo
- `premium-design-specialist` - Design que impressiona e converte
- `api-backend-architect` - APIs de produção robustas
- `functional-ui-implementation` - Transforma mockups em apps funcionais

**🛡️ Agentes de Proteção:**
- `security-privacy-guardian` - Compliance LGPD/GDPR garantido
- `qa-guardian-code-cleaner` - Qualidade obsessiva
- `debug-surgeon` - Correção cirúrgica sem regressão

**⚡ Agentes de Performance:**
- `performance-optimizer` - Core Web Vitals otimizados
- `code-cleaner-eliminator` - 40% redução de linhas
- `media-cdn-optimizer` - Delivery de mídia otimizado

### Uso Recomendado

1. **Projetos Novos**: Começar com `maestro-orchestrator` para planejamento
2. **Melhorias**: `qa-guardian-code-cleaner` + `code-cleaner-eliminator`
3. **Design**: `premium-design-specialist` + `pixel-perfectionist`
4. **Backend**: `api-backend-architect` + `database-schema-architect`
5. **Debug**: `debug-surgeon` + `code-sherlock` para problemas complexos

### 🎆 Resultado Final

**24 especialistas** trabalhando em harmonia para entregar:
- **Código de produção** com qualidade enterprise
- **Performance otimizada** (Lighthouse 100/100)
- **Segurança robusta** (LGPD/GDPR compliant)
- **Design excepcional** (WCAG 2.1 AA+)
- **Arquitetura escalável** (padrões DDD/SOLID)

*Agentes inteligentes, desenvolvimento profissional, resultados extraordinários.* ✨