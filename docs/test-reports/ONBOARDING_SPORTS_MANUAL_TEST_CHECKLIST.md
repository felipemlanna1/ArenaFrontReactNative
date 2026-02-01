# Checklist de Testes Manuais - OnboardingSportsScreen

**Data:** 2026-02-01
**URL:** http://localhost:8081/OnboardingSports

---

## Instruções
1. Abra a URL no browser
2. Execute cada teste na ordem
3. Marque ✅ ou ❌ para cada item
4. Anote observações se necessário

---

## 1. RENDERIZAÇÃO INICIAL

| # | Teste | Esperado | Resultado |
|---|-------|----------|-----------|
| 1.1 | Tela carrega sem erros | Sem crash, sem tela branca | ⬜ |
| 1.2 | Título visível | "QUAIS ESPORTES VOCÊ PRATICA?" | ⬜ |
| 1.3 | Subtítulo visível | "Selecione um ou mais esportes" | ⬜ |
| 1.4 | Campo de busca visível | Input com placeholder "Buscar..." | ⬜ |
| 1.5 | Grid de esportes | 3 colunas, múltiplos esportes | ⬜ |
| 1.6 | Botão PULAR visível | Borda cinza, texto cinza | ⬜ |
| 1.7 | Botão CONTINUAR visível | Cor laranja mas desabilitado | ⬜ |
| 1.8 | Botão voltar visível | Seta no canto superior esquerdo | ⬜ |

---

## 2. SELEÇÃO DE ESPORTE

| # | Teste | Ação | Esperado | Resultado |
|---|-------|------|----------|-----------|
| 2.1 | Abrir modal | Clique em "Futebol" | Modal abre com slide-up | ⬜ |
| 2.2 | Nome no modal | - | "Futebol" visível | ⬜ |
| 2.3 | Ícone no modal | - | Ícone de bola de futebol | ⬜ |
| 2.4 | Pergunta visível | - | "Qual seu nível?" | ⬜ |
| 2.5 | 4 níveis | - | Iniciante, Intermediário, Avançado, Profissional | ⬜ |
| 2.6 | Indicadores de pontos | - | ●○○○, ●●○○, ●●●○, ●●●● | ⬜ |
| 2.7 | Nenhum pré-selecionado | - | Nenhum nível destacado | ⬜ |
| 2.8 | CONFIRMAR desabilitado | - | Botão não clicável sem nível | ⬜ |
| 2.9 | Selecionar nível | Clique em "Intermediário" | Borda laranja, pontos laranjas | ⬜ |
| 2.10 | CONFIRMAR habilitado | - | Botão laranja clicável | ⬜ |

---

## 3. CONFIRMAR SELEÇÃO

| # | Teste | Ação | Esperado | Resultado |
|---|-------|------|----------|-----------|
| 3.1 | Confirmar | Clique CONFIRMAR | Modal fecha | ⬜ |
| 3.2 | Badge aparece | - | "Futebol • Intermediário" na seção Selecionados | ⬜ |
| 3.3 | Card selecionado | - | Card Futebol com fundo laranja | ⬜ |
| 3.4 | Checkmark verde | - | ✓ no canto superior direito do card | ⬜ |
| 3.5 | Contador | - | "Selecionados (1)" | ⬜ |
| 3.6 | CONTINUAR habilitado | - | Botão CONTINUAR agora clicável | ⬜ |

---

## 4. ESPORTE PRINCIPAL

| # | Teste | Ação | Esperado | Resultado |
|---|-------|------|----------|-----------|
| 4.1 | Abrir modal novamente | Clique no card Futebol | Modal abre com nível pré-selecionado | ⬜ |
| 4.2 | Switch visível | - | "Esporte principal" com toggle | ⬜ |
| 4.3 | Ativar principal | Ative o switch | Switch fica laranja | ⬜ |
| 4.4 | Confirmar | Clique CONFIRMAR | Modal fecha | ⬜ |
| 4.5 | Estrela no badge | - | ⭐ aparece antes do nome no badge | ⬜ |
| 4.6 | Estrela no card | - | ⭐ no canto superior esquerdo do card | ⬜ |

---

## 5. MÚLTIPLOS ESPORTES

| # | Teste | Ação | Esperado | Resultado |
|---|-------|------|----------|-----------|
| 5.1 | Selecionar Vôlei | Clique Vôlei → Avançado → CONFIRMAR | Segundo badge aparece | ⬜ |
| 5.2 | Contador atualiza | - | "Selecionados (2)" | ⬜ |
| 5.3 | Dois cards laranjas | - | Futebol e Vôlei com fundo laranja | ⬜ |
| 5.4 | Marcar Vôlei principal | Clique Vôlei → Ative switch → CONFIRMAR | Estrela move para Vôlei | ⬜ |
| 5.5 | Futebol perde estrela | - | Futebol não tem mais estrela | ⬜ |

---

## 6. REMOÇÃO

| # | Teste | Ação | Esperado | Resultado |
|---|-------|------|----------|-----------|
| 6.1 | Remover via badge | Clique X no badge de Vôlei | Badge desaparece | ⬜ |
| 6.2 | Card volta ao normal | - | Card Vôlei com fundo escuro | ⬜ |
| 6.3 | Contador atualiza | - | "Selecionados (1)" | ⬜ |
| 6.4 | Abrir modal Futebol | Clique no card Futebol | Modal abre | ⬜ |
| 6.5 | Link Remover | - | "Remover" em vermelho visível | ⬜ |
| 6.6 | Remover via modal | Clique "Remover" | Modal fecha, badge desaparece | ⬜ |
| 6.7 | Seção some | - | "Selecionados" não aparece mais | ⬜ |
| 6.8 | CONTINUAR desabilitado | - | Botão volta a ficar desabilitado | ⬜ |

---

## 7. BUSCA

| # | Teste | Ação | Esperado | Resultado |
|---|-------|------|----------|-----------|
| 7.1 | Filtrar | Digite "fut" na busca | Apenas Futebol, Futsal, Futevôlei | ⬜ |
| 7.2 | Case insensitive | Digite "FUT" | Mesmo resultado | ⬜ |
| 7.3 | Limpar busca | Apague o texto ou clique X | Todos esportes aparecem | ⬜ |
| 7.4 | Seleção persiste | Selecione Futebol, depois filtre por "vol" | Futebol continua selecionado | ⬜ |

---

## 8. FECHAR MODAL

| # | Teste | Ação | Esperado | Resultado |
|---|-------|------|----------|-----------|
| 8.1 | Fechar pelo X | Abra modal, clique no X | Modal fecha | ⬜ |
| 8.2 | Fechar pelo overlay | Abra modal, clique fora | Modal fecha | ⬜ |
| 8.3 | Estado não salvo | Selecione nível, feche sem confirmar, reabra | Nível não está selecionado | ⬜ |

---

## 9. FINALIZAÇÃO

| # | Teste | Ação | Esperado | Resultado |
|---|-------|------|----------|-----------|
| 9.1 | Selecionar esporte | Selecione Basquete → Iniciante → CONFIRMAR | Badge aparece | ⬜ |
| 9.2 | Clicar CONTINUAR | Clique no botão | Loading aparece no botão | ⬜ |
| 9.3 | Sucesso | - | Navega para tela principal (MainTabs) | ⬜ |

---

## 10. PULAR

| # | Teste | Ação | Esperado | Resultado |
|---|-------|------|----------|-----------|
| 10.1 | Recarregar página | F5 ou refresh | Volta ao estado inicial | ⬜ |
| 10.2 | Clicar PULAR | Clique no botão | Navega para tela principal | ⬜ |
| 10.3 | Sem esportes | - | Usuário não tem esportes salvos | ⬜ |

---

## RESUMO

| Categoria | Total | ✅ Pass | ❌ Fail |
|-----------|-------|--------|--------|
| Renderização | 8 | | |
| Seleção | 10 | | |
| Confirmar | 6 | | |
| Principal | 6 | | |
| Múltiplos | 5 | | |
| Remoção | 8 | | |
| Busca | 4 | | |
| Fechar Modal | 3 | | |
| Finalização | 3 | | |
| Pular | 3 | | |
| **TOTAL** | **56** | | |

---

## OBSERVAÇÕES

_Anote aqui qualquer bug ou comportamento inesperado encontrado:_

1.
2.
3.

---

**Testado por:** ________________
**Data:** ________________
