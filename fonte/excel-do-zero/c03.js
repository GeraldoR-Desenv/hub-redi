// =====================================================================
//  Cápsula 0.3 · Tour pela tela (migrada para o motor único)
// =====================================================================
const PASSOS_03 = [
  { t: "Esta é a tela do <b>Excel online</b>, com o arquivo <b>Gastos do mês</b> que você já conhece. Vamos passear pela tela de cima para baixo, uma parte de cada vez.",
    anim: async (j) => { j.spot("titulo"); await j.moverCursor("arquivo"); j.balao("arquivo", "O nome do arquivo. No Excel online, tudo é <b>salvo sozinho</b>."); await j.w(2600); } },
  { t: "Logo abaixo fica a <span class='dest'>Faixa de Opções</span>. A primeira linha tem as <b>guias</b>, e cada uma reúne um tipo de tarefa: <b>Inserir</b> tem gráficos e imagens, <b>Fórmulas</b> tem as funções, <b>Dados</b> tem filtros… A mais usada é a <b>Página Inicial</b>.",
    anim: async (j) => { j.spot("guias"); for (const g of ["Inserir", "Fórmulas", "Dados"]) { await j.moverCursor('[data-guia="' + g + '"]'); j.balao('[data-guia="' + g + '"]', "Guia <b>" + g + "</b>"); await j.w(1100); } await j.moverCursor('[data-guia="Página Inicial"]'); j.balao('[data-guia="Página Inicial"]', "A guia aberta fica <b>sublinhada</b>"); await j.w(1800); } },
  { t: "Embaixo das guias ficam os <span class='dest'>botões</span>, organizados em <b>grupos</b>: Área de Transferência, Fonte, Alinhamento, Número… O nome do grupo aparece embaixo dele. Não sabe o que um botão faz? <b>Pare o mouse em cima dele</b> e o nome aparece.",
    anim: async (j) => { j.spot("botoes"); await j.moverCursor('[data-grp="Fonte"] .nm'); j.balao('[data-grp="Fonte"] .nm', "Grupo <b>Fonte</b>"); await j.w(1600); await j.moverCursor('[data-cmd="neg"]'); j.balao('[data-cmd="neg"]', "Negrito (Ctrl+N)"); await j.w(2000); } },
  { t: "Vamos usar dois botões. Primeiro selecionamos os títulos <b>Categoria</b> e <b>Valor</b> (A1 e B1). Depois clicamos em <b>N</b> (Negrito) e em <b>Cor de Preenchimento</b>. Repare: um botão só age sobre o que está <b>selecionado</b>.",
    anim: async (j) => { await j.arrastar("A1", "B1"); await j.clicar('[data-cmd="neg"]'); await j.w(500); await j.clicar('[data-cmd="fill"]'); await j.w(300); j.balao("A1", "Títulos em negrito e com fundo colorido"); await j.w(2200); },
    fim: (j) => { j.setSel("A1", "B1"); j.aplicar("neg"); j.aplicar("fill"); j.setSel("A1"); } },
  { t: "O espaço quadriculado é a <span class='dest'>grade</span>. As <b>colunas</b> são identificadas por letras (A, B, C…) e as <b>linhas</b> por números (1, 2, 3…). Cada aba tem mais de 16 mil colunas e mais de 1 milhão de linhas!",
    anim: async (j) => { j.spot("grade"); await j.moverCursor('th[data-c="B"]'); j.balao('th[data-c="B"]', "Coluna <b>B</b>"); await j.w(1600); await j.moverCursor('th[data-r="4"]'); j.balao('th[data-r="4"]', "Linha <b>4</b>"); await j.w(1800); } },
  { t: "O encontro de uma coluna com uma linha é uma <span class='dest'>célula</span>. O endereço dela é <b>letra + número</b>: esta é a <b>B4</b>. A célula selecionada ganha uma <b>borda verde</b>, e a letra e o número dela ficam destacados nos cabeçalhos.",
    anim: async (j) => { await j.clicar("B4"); j.balao("B4", "<b>B4</b> = coluna B, linha 4"); await j.w(2400); },
    fim: (j) => j.setSel("B4") },
  { t: "No canto esquerdo, logo acima da grade, fica a <span class='dest'>Caixa de Nome</span>. Ela sempre mostra o <b>endereço</b> da célula selecionada. Clicando em A6, ela mostra <b>A6</b>.",
    anim: async (j) => { await j.clicar("A6"); j.spot("nb"); j.balao("nb", "<b>A6</b>: a célula selecionada agora"); await j.w(2200); j.balao(null); j.spot(null); await j.clicar("A3"); j.spot("nb"); j.balao("nb", "Mudou a célula, mudou o endereço: <b>A3</b>"); await j.w(2200); },
    fim: (j) => j.setSel("A3") },
  { t: "Ao lado do <b>fx</b> fica a <span class='dest'>Barra de Fórmulas</span>: ela mostra o que está <b>dentro</b> da célula. Em B2 está o número 1200, e a barra mostra 1200. Mas a célula <b>B8</b> mostra 2395 enquanto a barra mostra <code>=SOMA(B2:B7)</code>. <b>A célula mostra o resultado; a barra mostra a receita.</b> (Fórmulas ficam para o Módulo 4.)",
    anim: async (j) => { await j.clicar("B2"); j.spot("fb"); j.balao("fb", "Número digitado: a barra mostra igual"); await j.w(2200); j.balao(null); j.spot(null); await j.clicar("B8"); j.spot("fb"); j.balao("fb", "A conta que está <b>dentro</b> de B8"); await j.w(2600); },
    fim: (j) => j.setSel("B8") },
  { t: "Lá embaixo ficam as <span class='dest'>abas</span>, que você conheceu na cápsula 0.2: cada aba guarda uma parte dos dados do arquivo. Aqui, <b>Janeiro</b> e <b>Fevereiro</b>. O <b>+</b> cria uma aba nova e dois cliques no nome renomeiam.",
    anim: async (j) => { j.spot("abas"); await j.moverCursor("[data-add]"); j.balao("[data-add]", "<b>+</b> cria uma aba nova"); await j.w(1600); await j.clicar('[data-aba="Fevereiro"]'); j.balao('[data-aba="Fevereiro"]', "Mesmo arquivo, outra aba: os gastos de fevereiro"); await j.w(2400); j.balao(null); await j.clicar('[data-aba="Janeiro"]'); await j.w(400); } },
  { t: "A última linha é a <span class='dest'>barra de status</span>. Selecione alguns números e ela mostra a <b>Média</b>, a <b>Contagem</b> e a <b>Soma</b>, sem nenhuma fórmula. Ótimo para conferir um valor rapidinho.",
    anim: async (j) => { await j.arrastar("B2", "B5"); j.spot("calc", 5); j.balao("calc", "1200 + 650 + 140 + 85 = <b>2075</b>"); await j.w(2800); },
    fim: (j) => j.setSel("B2", "B5") },
  { t: "No canto direito da barra de status fica o <span class='dest'>zoom</span>. Ele aumenta ou diminui o tamanho na tela. Atenção: o zoom <b>não muda os dados</b>, só o tamanho com que você enxerga.",
    anim: async (j) => { j.spot("zoom", 4); await j.clicar('[data-zoom="+"]'); await j.clicar('[data-zoom="+"]'); j.balao("zoom", "<b>120%</b>: tudo maior, os números são os mesmos"); await j.w(2400); j.balao(null); await j.clicar('[data-zoom="-"]'); await j.clicar('[data-zoom="-"]'); } },
  { t: "Pronto, você conhece a tela! De cima para baixo: <b>Faixa de Opções</b> (guias e botões), <b>Caixa de Nome</b>, <b>Barra de Fórmulas</b>, <b>grade</b>, <b>abas</b> e <b>barra de status</b>. Agora é a sua vez: clique em <b>Pratique junto</b>.",
    anim: async (j) => { for (const [z, n] of [["guias", "Guias"], ["botoes", "Botões"], ["nb", "Caixa de Nome"], ["fb", "Barra de Fórmulas"], ["grade", "Grade"], ["abas", "Abas"], ["status", "Barra de status"]]) { j.spot(z); j.balao(z, n); await j.w(1300); } j.spot(null); j.balao(null); } },
];

const naJaneiro = (j) => j.ativa === "Janeiro";
const conteudo = (j, a) => { const v = j.valor(a); return v === "" ? "vazia" : typeof v === "number" ? "o número " + fmtNum(v) : "o texto \"" + v + "\""; };
const TAREFAS_03 = [
  { txt: "Clique na <b>Caixa de Nome</b>: o lugar que mostra o endereço da célula selecionada.", alvo: "nb",
    teste: (ev) => ev.tipo === "zona" && ev.zona === "caixa-nome",
    erro: (ev) => {
      if (ev.tipo !== "zona") return null;
      if (ev.zona === "barra-formulas") return "Essa é a <b>Barra de Fórmulas</b>: ela mostra o conteúdo da célula. A Caixa de Nome é a caixinha <b>à esquerda</b> dela, antes do <b>fx</b>. Essa é a confusão mais comum de todas!";
      const [n, d] = ZONAS[ev.zona] || ["outra parte da tela", ""];
      return "Você clicou em " + n + ". " + d + " A Caixa de Nome fica <b>à esquerda do fx</b>, logo acima da grade.";
    },
    ok: (j) => "Isso! A Caixa de Nome está mostrando <b>" + j.sel.a + "</b>, o endereço da célula selecionada agora.",
    dicas: ["Ela fica logo acima da grade, no canto esquerdo.", "Olhe à esquerda do símbolo <b>fx</b>. Destaquei para você."] },
  { txt: "Clique na célula com o <b>valor da Luz</b>.", alvo: "B4",
    teste: (ev, j) => ev.tipo === "sel" && naJaneiro(j) && rotulo(ev.a, ev.b) === "B4",
    erro: (ev, j) => {
      if (ev.tipo !== "sel") return null;
      if (!naJaneiro(j)) return "Você está na aba <b>" + j.ativa + "</b>. Volte para <b>Janeiro</b>, lá embaixo nas abas.";
      const r = rotulo(ev.a, ev.b);
      if (r === "A4") return "Essa é a célula <b>A4</b>, com o <b>texto</b> Luz. O valor fica ao lado, na coluna <b>B</b>.";
      return "Você clicou em <b>" + r + "</b>" + (r.includes(":") ? "" : ", que tem " + conteudo(j, r)) + ". O valor da Luz está na coluna B, na mesma linha da palavra Luz.";
    },
    ok: () => "Certo! Repare na Caixa de Nome: <b>B4</b> (coluna B, linha 4).",
    dicas: ["O valor fica na coluna B (Valor), na mesma linha da palavra Luz.", "É a célula <b>B4</b>. Destaquei para você."] },
  { txt: "Clique no <b>Total</b> (o número, não a palavra) e olhe a <b>Barra de Fórmulas</b>.", alvo: "B8",
    teste: (ev, j) => ev.tipo === "sel" && naJaneiro(j) && rotulo(ev.a, ev.b) === "B8",
    erro: (ev, j) => {
      if (ev.tipo !== "sel") return null;
      if (!naJaneiro(j)) return "Você está na aba <b>" + j.ativa + "</b>. Volte para <b>Janeiro</b>.";
      const r = rotulo(ev.a, ev.b);
      if (r === "A8") return "Essa é a <b>palavra</b> Total (A8). O número do total fica ao lado, na coluna B.";
      return "Você clicou em <b>" + r + "</b>. O total está na última linha da lista, na coluna B.";
    },
    ok: () => "Viu? A célula mostra <b>2395</b>, mas a Barra de Fórmulas mostra <code>=SOMA(B2:B7)</code>: a conta que está dentro dela.",
    dicas: ["O total fica na linha 8.", "É a célula <b>B8</b>. Destaquei para você."] },
  { txt: "Selecione os valores do <b>Aluguel até a Água</b> (B2 até B5): clique em B2, <b>segure</b> o botão do mouse e arraste até B5. Depois leia a Soma na barra de status.", alvo: ["B2", "B5"],
    teste: (ev, j) => ev.tipo === "sel" && naJaneiro(j) && rotulo(ev.a, ev.b) === "B2:B5",
    erro: (ev, j) => {
      if (ev.tipo !== "sel") return null;
      if (!naJaneiro(j)) return "Você está na aba <b>" + j.ativa + "</b>. Volte para <b>Janeiro</b>.";
      const r = rotulo(ev.a, ev.b);
      if (!r.includes(":")) return "Você clicou só em <b>" + r + "</b>. Para selecionar várias células: clique em B2, <b>segure</b> o botão e arraste até B5. Outro jeito: clique em B2 e depois, segurando <kbd>Shift</kbd>, clique em B5.";
      if (r === "B1:B5") return "Quase! Você incluiu o cabeçalho <b>Valor (R$)</b>. Comece no B2, no valor do Aluguel.";
      return "Você selecionou <b>" + r + "</b>. O certo vai de <b>B2</b> (Aluguel) até <b>B5</b> (Água).";
    },
    ok: () => "Perfeito! Olhe lá embaixo, na barra de status: <b>Soma: 2075</b>. O Excel somou sem você escrever nenhuma fórmula.",
    dicas: ["Comece clicando em B2 e não solte o botão do mouse até chegar em B5.", "Se arrastar estiver difícil: clique em B2 e depois, segurando <kbd>Shift</kbd>, clique em B5."] },
  { txt: "Deixe a palavra <b>Total</b> (A8) em <b>negrito</b>: selecione a célula e clique no botão <b>N</b>.", alvo: '[data-cmd="neg"]',
    teste: (ev, j) => ev.tipo === "cmd" && naJaneiro(j) && !!(j.folhas.Janeiro.fmt.A8 && j.folhas.Janeiro.fmt.A8.neg),
    erro: (ev, j) => {
      if (ev.tipo !== "cmd") return null;
      const r = rotulo(j.sel.a, j.sel.b);
      if (ev.cmd === "neg") return "Você aplicou negrito em <b>" + r + "</b>" + (j.ativa !== "Janeiro" ? " da aba " + j.ativa : "") + ". Primeiro clique na célula <b>A8</b> (aba Janeiro), depois no <b>N</b>.";
      return "Esse é o botão <b>" + (NOME_CMD[ev.cmd] || $('[data-cmd="' + ev.cmd + '"]', j.el).title) + "</b>. O negrito é o botão <b>N</b>, no grupo Fonte.";
    },
    ok: () => "Ficou em negrito! No Excel em português, o atalho é <kbd>Ctrl</kbd> + <kbd>N</kbd> (N de Negrito).",
    dicas: ["Clique primeiro em A8. O botão fica no grupo <b>Fonte</b> da Página Inicial.", "Com A8 selecionada, clique no <b>N</b>. Destaquei o botão."] },
  { txt: "Aumente o <b>zoom</b> para <b>120%</b>.", alvo: "zoom",
    teste: (ev) => ev.tipo === "zoom" && ev.zoom === 120,
    erro: (ev) => (ev.tipo === "zoom" && (ev.zoom > 120 || ev.zoom < 100) ? "O zoom está em <b>" + ev.zoom + "%</b>. Cada clique muda 10%: " + (ev.zoom > 120 ? "passou! Use o <b>−</b> para voltar a 120%." : "o <b>−</b> diminui. Use o <b>+</b> para aumentar até 120%.") : ev.tipo === "zona" && ev.zona !== "zoom" && ev.zona !== "status" ? "O zoom fica no <b>canto inferior direito</b>, na barra de status." : null),
    ok: () => "Tudo ficou maior, mas os números são os mesmos: o zoom muda só o tamanho na tela.",
    dicas: ["O zoom fica no canto inferior direito, na barra de status.", "Clique duas vezes no <b>+</b> destacado (100% → 110% → 120%)."] },
];

function faseAprenda03() {
  montaAprenda({ titulo: "Tour pela tela", lead: "Antes de ir fundo, vamos conhecer o \"painel\" do Excel: onde fica cada parte e para que ela serve.", passos: PASSOS_03 });
}
function fasePratique03() {
  main.innerHTML = '<h1>Pratique junto</h1><p class="lead">Agora é você quem clica. Faça uma tarefa de cada vez: a tela confere e explica se algo sair diferente.</p><div id="t1"></div><div class="row" style="margin-top:16px"><button class="btn pri" id="seg">Ir para o desafio ▶</button></div>';
  tarefasGuiadas({ host: $("#t1"), tarefas: TAREFAS_03,
    aoTerminar: () => { concluiFase(1); return '<div class="fbk ok"><b>Você explorou a tela toda! 🎉</b>Achou a Caixa de Nome, leu a Barra de Fórmulas, selecionou células, usou um botão da Faixa de Opções e mexeu no zoom. Agora tente sem ajuda, no desafio.</div>'; } });
  $("#seg").onclick = () => abrirFase(2);
}
function faseSozinho03() {
  main.innerHTML = '<h1>Agora sozinho</h1><p class="lead">Sem destaque e sem passo a passo. Use a tela do Excel logo abaixo para descobrir as respostas: é explorando que o conhecimento gruda.</p>' +
    '<div class="card"><div class="passo-n">Desafio · descubra usando a tela</div><div class="qs"><div class="q" id="d1"></div><div class="q" id="d2"></div><div class="q" id="d3"></div></div></div>' +
    '<div id="jw" style="margin-top:14px"></div>' +
    '<div class="card" style="margin-top:16px"><div class="passo-n">Perguntas rápidas</div><div class="qs"><div class="q" id="c1"></div><div class="q" id="c2"></div></div></div>' +
    '<div class="row" style="margin-top:16px"><button class="btn pri" id="seg">Ver o resumo ▶</button></div>';
  new Janela($("#jw"), { interativo: true });
  escolha($("#d1"), { enun: "<b>1.</b> Na aba <b>Fevereiro</b>, a célula do Transporte mostra <b>180</b>. O que está escrito <b>dentro</b> dela?",
    ops: ["<code>180</code>, um número digitado", "<code>=4*45</code>", "<code>=SOMA(B2:B7)</code>", "<code>Transporte</code>"], certo: 1,
    okMsg: "A Barra de Fórmulas mostra <code>=4*45</code>: 4 semanas de passe a R$ 45. A célula mostra só o resultado, 180.",
    ruimMsg: "Vá até a aba Fevereiro, clique na célula do Transporte (coluna B) e olhe a <b>Barra de Fórmulas</b>." });
  resposta($("#d2"), { enun: "<b>2.</b> Sem fazer conta de cabeça: quanto foi gasto com as <b>contas da casa</b> (Luz, Água e Internet) em <b>Fevereiro</b>?", ph: "ex.: 500",
    checar: (s) => { const n = lerNumero(s);
      if (n === 345) return { ok: true, msg: "155 + 90 + 100 = <b>345</b>, lido direto na barra de status, sem nenhuma fórmula." };
      if (n === 325) return { ok: false, msg: "325 é o valor de <b>Janeiro</b>. Confira se você está na aba Fevereiro." };
      if (n === 2445 || n === 2395) return { ok: false, msg: "Esse é o total do mês inteiro. Selecione só Luz, Água e Internet." };
      return { ok: false, msg: "Na aba Fevereiro, selecione os valores de Luz, Água e Internet (coluna B) e leia a <b>Soma</b> lá embaixo, na barra de status." }; } });
  resposta($("#d3"), { enun: "<b>3.</b> Qual é o <b>endereço</b> da célula que tem o texto <b>Internet</b>?", ph: "ex.: C2",
    checar: (s) => { const t = s.toUpperCase().replace(/\s/g, "");
      if (t === "A6") return { ok: true, msg: "Coluna A, linha 6. A Caixa de Nome mostra isso quando você clica na célula." };
      if (t === "B6") return { ok: false, msg: "B6 é o <b>valor</b> da Internet. O texto fica na coluna da categoria." };
      if (/^\d+$/.test(t)) return { ok: false, msg: "Faltou a <b>letra</b> da coluna. O endereço é letra + número." };
      if (/^[A-Z]+$/.test(t)) return { ok: false, msg: "Faltou o <b>número</b> da linha. O endereço é letra + número." };
      if (/^\d+[A-Z]$/.test(t)) return { ok: false, msg: "Quase! Primeiro vem a <b>letra</b> (coluna), depois o número (linha)." };
      return { ok: false, msg: "Clique na célula com o texto Internet e olhe a <b>Caixa de Nome</b>." }; } });
  escolha($("#c1"), { enun: "Na aba <b>Janeiro</b>, a célula B8 mostra <b>2395</b>, mas a Barra de Fórmulas mostra <code>=SOMA(B2:B7)</code>. Por quê?",
    ops: ["A célula está com erro", "A célula mostra o resultado; a Barra de Fórmulas mostra o que está dentro dela", "A Barra de Fórmulas mostra a célula de cima", "Alguém digitou o número errado"], certo: 1,
    okMsg: "A célula mostra o <b>resultado</b>; a barra mostra a <b>receita</b>. Sempre que um número parecer estranho, clique na célula e olhe a barra.",
    ruimMsg: "Lembre o que a Barra de Fórmulas mostra: o conteúdo de dentro da célula." });
  escolha($("#c2"), { enun: "Você quer saber o <b>endereço</b> da célula selecionada. Onde olha?",
    ops: ["Na Barra de Fórmulas", "Na Caixa de Nome", "Na barra de status", "Nas guias"], certo: 1,
    okMsg: "A Caixa de Nome mostra o endereço. A Barra de Fórmulas, ao lado, mostra o conteúdo.",
    ruimMsg: (k) => (k === 0 ? "A Barra de Fórmulas mostra o <b>conteúdo</b>, não o endereço. É a vizinha dela, à esquerda." : "Essa parte não mostra o endereço. Pense na caixinha à esquerda do fx.") });
  $("#seg").onclick = () => { concluiFase(2); abrirFase(3); };
}

// =============== FASE 4: Resumo ===============
function faseResumo03() {
  main.innerHTML = '<h1>Resumo da cápsula</h1><p class="lead">As partes da tela que você vai usar em todas as cápsulas daqui para frente.</p><div class="resumo">' +
    '<div class="card"><h3>🗂️ Faixa de Opções</h3>No alto: <b>guias</b> (Página Inicial, Inserir, Fórmulas…) e, embaixo delas, <b>botões em grupos</b>. Parou o mouse em cima, aparece o nome. O botão age sobre o que está selecionado.</div>' +
    '<div class="card"><h3>📍 Caixa de Nome</h3>Mostra o <b>endereço</b> da célula selecionada (ex.: <code>B4</code>). Fica à esquerda do <b>fx</b>.</div>' +
    '<div class="card"><h3>fx Barra de Fórmulas</h3>Mostra o <b>conteúdo</b> da célula. A célula mostra o resultado; a barra mostra a receita (<code>=SOMA(B2:B7)</code>).</div>' +
    '<div class="card"><h3>▦ Grade</h3>Colunas são letras, linhas são números. Célula = coluna + linha. A célula selecionada fica com borda verde.</div>' +
    '<div class="card"><h3>📑 Abas (lembrete da 0.2)</h3>Cada aba guarda uma parte dos dados do arquivo. <b>+</b> cria, dois cliques renomeiam. Ao citar uma célula, diga a aba: “B8 da aba Janeiro”.</div>' +
    '<div class="card"><h3>Σ Barra de status</h3>Selecione números e veja <b>Média, Contagem e Soma</b> sem fórmula. O zoom fica à direita e não muda os dados.</div>' +
    '<div class="card"><h3>⚠️ Erros comuns</h3><ul><li>Confundir Caixa de Nome (endereço) com Barra de Fórmulas (conteúdo).</li><li>Clicar na palavra (A4) quando queria o valor (B4).</li><li>Procurar os dados na aba errada.</li><li>Achar que o zoom muda os números.</li></ul></div>' +
    '<div class="card"><h3>⌨️ Atalho</h3><kbd>Ctrl</kbd> + <kbd>N</kbd> aplica negrito no Excel em português (no Excel em inglês é Ctrl + B). Lembre: no português, <kbd>Ctrl</kbd> + <kbd>B</kbd> é <b>salvar</b>..</div>' +
    '<div class="card"><h3>🔗 Ponte para o Excel de verdade</h3>Entre em <b>office.com</b> com uma conta Microsoft gratuita e abra o Excel. Depois de entrar, digitar <b>excel.new</b> na barra do navegador abre um arquivo novo. Encontre as 6 partes que você viu aqui.</div>' +
    '<div class="card"><h3>🟩 No Google Sheets é assim</h3>Também tem Caixa de Nome e Barra de Fórmulas (fx), no mesmo lugar. A soma da seleção aparece no <b>canto inferior direito</b>; clique nela para ver média, contagem e outras.</div>' +
    '</div><div class="card" style="margin-top:14px"><div class="passo-n">Próxima cápsula</div><div class="big" style="margin-top:4px">0.4 · Salvar, abrir e formatos</div><p class="hint" style="margin:4px 0 0">Onde o arquivo fica guardado, o que é .xlsx e as diferenças entre Excel online, Excel instalado e Google Sheets.</p></div>';
  concluiFase(3);
}

// =============== navegação entre fases ===============
iniciarCapsula([faseAprenda03, fasePratique03, faseSozinho03, faseResumo03]);
