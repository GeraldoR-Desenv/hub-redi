// =====================================================================
//  Cápsula 0.4 · Salvar, abrir e formatos
// =====================================================================
const TAB_FORMATOS = '<table class="tabela2"><tr><th>Formato</th><th>O que guarda</th><th>Quando usar</th></tr>' +
  "<tr><td><b>.xlsx</b></td><td>Tudo: abas, fórmulas, formatação, gráficos</td><td>O padrão do Excel. Use quase sempre.</td></tr>" +
  "<tr><td><b>.csv</b></td><td>Só texto: os dados de <b>uma</b> aba, sem fórmulas nem formatação</td><td>Levar dados de um sistema para outro.</td></tr>" +
  "<tr><td><b>.pdf</b></td><td>Uma \"foto\" para ler e imprimir</td><td>Enviar para quem só vai ler.</td></tr>" +
  "<tr><td><b>.xls</b></td><td>Formato antigo (Excel 2003 ou anterior)</td><td>Só quando aparecer um arquivo antigo.</td></tr>" +
  "<tr><td><b>.xlsm</b></td><td>Planilha com <b>macros</b> (pequenos programas)</td><td>Só abra se confiar em quem mandou.</td></tr></table>";
const TAB_VERSOES = '<table class="tabela2"><tr><th></th><th>Excel online</th><th>Excel instalado</th><th>Google Sheets</th></tr>' +
  "<tr><td><b>Custo</b></td><td>Grátis (conta Microsoft)</td><td>Pago (Microsoft 365)</td><td>Grátis (conta Google)</td></tr>" +
  "<tr><td><b>Onde roda</b></td><td>Navegador, com internet</td><td>No computador, funciona sem internet</td><td>Navegador, com internet</td></tr>" +
  "<tr><td><b>Salvar</b></td><td>Automático (OneDrive)</td><td><kbd>Ctrl</kbd>+<kbd>B</kbd>, ou automático se estiver no OneDrive</td><td>Automático (Google Drive)</td></tr>" +
  "<tr><td><b>Recursos</b></td><td>O essencial (tudo deste curso)</td><td>Completo (inclusive macros)</td><td>O essencial, com pequenas diferenças</td></tr></table>";
const DLG_SALVAR = (nome) => '<div class="dt">Salvar como</div><div class="dc"><label>Nome do arquivo<div class="campo" data-p="dlg-nome">' + nome + '</div></label><label>Local<div class="campo">📁 Documentos (Este Computador)</div></label><label>Tipo<div class="campo">Pasta de Trabalho do Excel (*.xlsx)</div></label><div class="bts"><span>Cancelar</span><span class="pri" data-p="dlg-salvar">Salvar</span></div></div>';
const ARQ_RECENTES = { ...ARQ_GASTOS, recentes: [["Gastos do mês.xlsx", "OneDrive › Documentos"], ["vendas_sistema.csv", "Downloads"], ["Relatório antigo.xls", "OneDrive › Arquivo morto"], ["Folha com macros.xlsm", "E-mail de um colega"]] };

const PASSOS_04 = [
  { t: "Boa notícia: no <b>Excel online</b> você <b>não precisa salvar</b>. Cada mudança é guardada sozinha. Veja o aviso ao lado do nome do arquivo enquanto mudamos o valor do Mercado…",
    anim: async (j) => { j.spot("titulo"); await j.moverCursor("salvo"); j.balao("salvo", "Tudo salvo"); await j.w(1600); j.balao(null); j.spot(null); await j.clicar("B3"); await j.digitar("B3", "700"); await j.confirmar("B3", 700); j.spot("titulo"); j.balao("salvo", "Salvando… e pronto: <b>Salvo</b>"); await j.w(2600); },
    fim: (j) => { j.setValor("B3", 700); } },
  { t: "Salvo onde? No <span class='dest'>OneDrive</span>, o espaço na internet (a \"nuvem\") ligado à sua conta Microsoft. Por isso você abre o mesmo arquivo de qualquer computador ou do celular. Para ver seus arquivos, use o menu <b>Arquivo</b>.",
    anim: async (j) => { await j.clicar('[data-guia="Arquivo"]'); await j.w(400); await j.moverCursor(".bk-arq"); j.balao(".bk-arq", "Seus arquivos, guardados no OneDrive"); await j.w(2800); } },
  { t: "No <b>Excel instalado</b> no computador é diferente. Um arquivo novo nasce com o nome <b>Pasta1</b>, e o salvamento automático fica <b>desativado</b> enquanto o arquivo não estiver no OneDrive. Repare no aviso <b>Não salvo</b> quando digitamos algo.",
    anim: async (j) => { j.setModo("desktop", "Pasta1"); j.spot("titulo"); await j.moverCursor("autosave"); j.balao("autosave", "AutoSalvamento desligado"); await j.w(2200); j.balao(null); j.spot(null); await j.clicar("B3"); await j.digitar("B3", "700"); await j.confirmar("B3", 700); j.spot("titulo"); j.balao("salvo", "Se fechar agora, perde a mudança!"); await j.w(2600); },
    fim: (j) => { j.setModo("desktop", "Pasta1"); j.setValor("B3", 700); } },
  { t: "Para salvar no Excel instalado em português, o atalho é <kbd>Ctrl</kbd> + <kbd>B</kbd> (no Excel em inglês é Ctrl + S). Na <b>primeira vez</b>, ele pergunta o <b>nome</b> e o <b>lugar</b> do arquivo. Depois, cada <kbd>Ctrl</kbd> + <kbd>B</kbd> salva direto.",
    anim: async (j) => {
      await j.tecla("Ctrl + B", 900); j.dialogo(DLG_SALVAR("Pasta1")); await j.w(700);
      const c = $('[data-p="dlg-nome"]', j.el); await j.moverCursor(c); j.anel(); c.textContent = "";
      for (const ch of "Gastos do mês") { c.textContent += ch; await j.w(90); }
      await j.w(400); await j.clicar("dlg-salvar"); j.dialogo(null); j.setModo("desktop", "Gastos do mês.xlsx"); $(".salvo", j.el).textContent = "· Salvo neste PC";
      j.spot("titulo"); j.balao("arquivo", "Agora o arquivo tem nome e lugar"); await j.w(2800); },
    fim: (j) => { j.setModo("online", "Gastos do mês"); } },
  { t: "O nome do arquivo tem um \"sobrenome\" depois do ponto: a <span class='dest'>extensão</span>, que diz o <b>formato</b>. O padrão do Excel é <b>.xlsx</b>, que guarda tudo: abas, fórmulas, formatação e gráficos. No Excel online, <b>Arquivo › Salvar como › Baixar uma Cópia</b> traz um .xlsx para o seu computador.",
    anim: async (j) => { await j.clicar('[data-guia="Arquivo"]'); await j.clicar('[data-bk-sec="Salvar como"]'); await j.moverCursor('[data-bk-acao="copia"]'); j.balao('[data-bk-acao="copia"]', "Uma cópia .xlsx no seu computador"); await j.w(1800); j.balao(null); await j.clicar('[data-bk-acao="copia"]'); j.balao("baixa", "Baixado: <b>Gastos do mês.xlsx</b>"); await j.w(2600); } },
  { t: "Agora o <span class='dest'>.csv</span>: só <b>texto</b>, com os dados de <b>uma aba</b> separados por ponto e vírgula. Ele perde as fórmulas (fica só o resultado), a formatação e as outras abas. Então por que existe? Porque <b>quase todo sistema</b> lê e gera CSV. Como analista de dados, você vai usar muito.",
    anim: async (j) => { await j.clicar('[data-guia="Arquivo"]'); await j.clicar('[data-bk-sec="Exportar"]'); await j.clicar('[data-bk-acao="csv"]'); await j.w(600); j.balao(".bloco pre", "O Total virou só um número, sem a fórmula. E a aba Fevereiro não veio"); await j.w(3600); } },
  { t: "O <span class='dest'>.pdf</span> é como uma \"foto\" da planilha: ótimo para mandar para quem só vai <b>ler</b> ou <b>imprimir</b>, porque ninguém edita. Fica em <b>Arquivo › Exportar › Baixar como PDF</b>.",
    anim: async (j) => { await j.clicar('[data-guia="Arquivo"]'); await j.clicar('[data-bk-sec="Exportar"]'); await j.clicar('[data-bk-acao="pdf"]'); j.balao("baixa", "Baixado: <b>Gastos do mês.pdf</b>"); await j.w(2600); } },
  { t: "Outros formatos que você vai encontrar por aí:" + TAB_FORMATOS,
    anim: async (j) => { j.carregarArquivo(ARQ_RECENTES); await j.clicar('[data-guia="Arquivo"]'); await j.w(300); const xs = $$(".bk-arq", j.el); for (const x of xs) { await j.moverCursor(x); await j.w(500); } j.balao(xs[3], "<b>.xlsm</b> de alguém que você não conhece? Não abra."); await j.w(2600); } },
  { t: "E qual Excel usar? Neste curso usamos o <b>Excel online</b>, que é grátis. Tudo o que você aprender vale também para o instalado e, quase sempre, para o Google Sheets:" + TAB_VERSOES,
    anim: async (j) => { j.spot("titulo"); await j.w(2500); } },
  { t: "Resumindo: no Excel online tudo é <b>salvo sozinho</b> no OneDrive; no instalado, <kbd>Ctrl</kbd> + <kbd>B</kbd>. Use <b>.xlsx</b> no dia a dia, <b>.csv</b> para levar dados a outro sistema e <b>.pdf</b> para quem só vai ler. Agora é a sua vez!",
    anim: async (j) => { j.spot("salvo", 5); await j.w(1500); j.spot(null); } },
];

const TAREFAS_04 = [
  { txt: "Mude o valor da <b>Luz</b> para <b>150</b> e repare no aviso ao lado do nome do arquivo.", alvo: "B4",
    teste: (ev) => ev.tipo === "edit" && ev.a === "B4" && ev.raw === 150,
    erro: (ev) => { if (ev.tipo === "travada") return "Clique no <b>valor</b> da Luz (coluna B)."; if (ev.tipo === "edit") return ev.a === "B4" ? "Você digitou <b>" + ev.raw + "</b>. O valor pedido é <b>150</b>." : "Essa não é a célula da Luz."; return null; },
    ok: () => "Viu? Apareceu <b>Salvando…</b> e depois <b>Salvo</b>. Você não precisou fazer nada.",
    dicas: ["O valor da Luz é o número ao lado da palavra Luz.", "Clique na célula destacada, digite 150 e aperte Enter."] },
  { txt: "Abra o menu <b>Arquivo</b>.", alvo: '[data-guia="Arquivo"]',
    teste: (ev) => ev.tipo === "guia" && ev.guia === "Arquivo",
    erro: (ev) => (ev.tipo === "guia" ? "Essa é a guia <b>" + ev.guia + "</b>. O menu Arquivo é o primeiro, bem à esquerda." : null),
    ok: () => "Esse é o menu Arquivo: à esquerda as seções, à direita os detalhes. A seta ← volta para a planilha.",
    dicas: ["Fica na mesma linha de Página Inicial, Inserir…", "É a primeira guia, destacada."] },
  { txt: "Baixe uma cópia do arquivo no formato <b>padrão do Excel</b>.", alvo: '[data-bk-sec="Salvar como"]',
    teste: (ev) => ev.tipo === "arquivo" && ev.acao === "copia",
    erro: (ev) => { if (ev.tipo !== "arquivo") return null;
      if (ev.acao === "csv") return "Você baixou um <b>.csv</b>, que leva só os dados de uma aba. O formato padrão do Excel é o <b>.xlsx</b>: Arquivo › Salvar como › Baixar uma Cópia.";
      if (ev.acao === "pdf") return "Você baixou um <b>.pdf</b>, que é só para ler. O padrão do Excel é o <b>.xlsx</b>.";
      if (ev.acao === "ods") return "O <b>.ods</b> é o formato do LibreOffice. O padrão do Excel é o <b>.xlsx</b>.";
      return "Quase. Procure a opção que <b>baixa</b> uma cópia para o seu computador."; },
    ok: () => "Baixou <b>Gastos do mês.xlsx</b>: o arquivo completo, com abas, fórmulas e formatação.",
    dicas: ["Abra o menu Arquivo e procure a seção <b>Salvar como</b>.", "Em Salvar como, clique em <b>Baixar uma Cópia</b>."] },
  { txt: "Agora exporte a aba <b>Fevereiro</b> como <b>CSV</b>. (Dica: o CSV leva a aba que estiver aberta.)", alvo: '[data-aba="Fevereiro"]',
    teste: (ev) => ev.tipo === "arquivo" && ev.acao === "csv" && ev.aba === "Fevereiro",
    erro: (ev) => { if (ev.tipo !== "arquivo") return null;
      if (ev.acao === "csv") return "Você exportou a aba <b>" + ev.aba + "</b>. O CSV leva só a aba que está aberta. Feche o Bloco de Notas, abra a aba <b>Fevereiro</b> e exporte de novo.";
      return "Esse não é o CSV. Ele fica em Arquivo › <b>Exportar</b>."; },
    ok: () => "Esse é o CSV de Fevereiro: só texto, valores separados por <b>;</b>. Repare que o Total virou um número (2445), sem a fórmula.",
    dicas: ["Primeiro abra a aba Fevereiro (feche o menu Arquivo com a seta ← se ele estiver aberto). Depois: Arquivo › Exportar.", "Com a aba Fevereiro aberta: Arquivo › Exportar › Baixar esta planilha como CSV."] },
  { txt: "Gere um <b>PDF</b> para mandar a alguém que só vai ler.", alvo: '[data-guia="Arquivo"]',
    teste: (ev) => ev.tipo === "arquivo" && ev.acao === "pdf",
    erro: (ev) => (ev.tipo === "arquivo" ? "Essa opção gera outro formato. O PDF fica em Arquivo › <b>Exportar</b>." : null),
    ok: () => "PDF pronto: ninguém consegue mudar os números, só ler e imprimir.",
    dicas: ["O PDF fica no mesmo lugar do CSV.", "Arquivo › Exportar › Baixar como PDF."] },
];

function faseAprenda04() {
  montaAprenda({ titulo: "Salvar, abrir e formatos", lead: "Onde o seu trabalho fica guardado, como salvar no Excel online e no instalado, e qual formato usar em cada situação.", passos: PASSOS_04 });
}
function fasePratique04() {
  main.innerHTML = '<h1>Pratique junto</h1><p class="lead">Mude um valor, use o menu Arquivo e baixe o mesmo arquivo em três formatos diferentes.</p><div id="t1"></div><div class="row" style="margin-top:16px"><button class="btn pri" id="seg">Ir para o desafio ▶</button></div>';
  tarefasGuiadas({ host: $("#t1"), tarefas: TAREFAS_04, opcoesJanela: { editaveis: ["B4"], msgTravada: "Neste exercício, só o valor da <b>Luz</b> pode ser mudado." },
    aoTerminar: () => { concluiFase(1); return '<div class="fbk ok"><b>Você já domina salvar e exportar! 🎉</b>Viu o salvamento automático e baixou o mesmo arquivo em .xlsx, .csv e .pdf.</div>'; } });
  $("#seg").onclick = () => abrirFase(2);
}
function faseSozinho04() {
  main.innerHTML = '<h1>Agora sozinho</h1><p class="lead">Sem destaque e sem passo a passo.</p>' +
    '<div class="card"><div class="passo-n">Desafio</div><div class="qs"><div class="q" id="d1"></div></div></div>' +
    '<div id="jw" style="margin-top:14px"></div>' +
    '<div class="card" style="margin-top:16px"><div class="passo-n">Perguntas rápidas</div><div class="qs"><div class="q" id="c1"></div><div class="q" id="c2"></div><div class="q" id="c3"></div><div class="q" id="c4"></div></div></div>' +
    '<div class="row" style="margin-top:16px"><button class="btn pri" id="seg">Ver o resumo ▶</button></div>';
  const j = new Janela($("#jw"), { interativo: true });
  $("#d1").innerHTML = '<div class="enun">O sistema da empresa precisa importar os gastos de <b>Janeiro</b> e só aceita arquivo de texto. Gere o arquivo certo. Depois, gere uma versão do arquivo para o seu gestor <b>ler</b>, sem poder alterar os números.</div><div class="row"><button class="btn pri">Conferir</button></div><div class="out"></div>';
  $("#d1 .btn").onclick = () => {
    const b = j.baixados, csvJan = b.some((x) => x.acao === "csv" && x.aba === "Janeiro"), pdfFev = b.some((x) => x.acao === "pdf");
    let msg;
    if (csvJan && pdfFev) msg = '<div class="fbk ok"><b>Isso! ✅</b>CSV de Janeiro para o sistema (texto puro) e PDF para o gestor (só leitura).</div>';
    else {
      const f = [];
      if (!csvJan) f.push(b.some((x) => x.acao === "csv") ? "O CSV que você gerou não é da aba <b>Janeiro</b>: abra a aba certa antes de exportar." : "Falta o arquivo de <b>texto</b> de Janeiro para o sistema. Qual formato é só texto?");
      if (!pdfFev) f.push("Falta a versão para o gestor, que não pode ser alterada. Qual formato é só para ler?");
      msg = '<div class="fbk bad"><b>Ainda não.</b>' + f.join("<br>") + "</div>";
    }
    $("#d1 .out").innerHTML = msg;
  };
  escolha($("#c1"), { enun: "Você estava no <b>Excel online</b> e a energia acabou. O que aconteceu com o seu trabalho?",
    ops: ["Perdeu tudo desde a última vez que apertou Ctrl+B", "Está salvo até a última mudança, no OneDrive", "Ficou salvo só no computador", "O arquivo foi apagado"], certo: 1,
    okMsg: "O Excel online salva cada mudança sozinho, na nuvem.",
    ruimMsg: "Lembre do aviso \"Salvando… Salvo\" que aparece a cada mudança." });
  escolha($("#c2"), { enun: "No <b>Excel instalado em português</b>, qual atalho salva o arquivo?",
    ops: ["Ctrl + S", "Ctrl + B", "Ctrl + N", "Ctrl + P"], certo: 1,
    okMsg: "Ctrl + B salva no Excel em português. No Excel em inglês é Ctrl + S.",
    ruimMsg: (k) => (k === 0 ? "Ctrl + S salva no Excel em <b>inglês</b>. No português, Ctrl + S é sublinhado." : k === 2 ? "Ctrl + N é negrito." : "Ctrl + P é imprimir.") });
  escolha($("#c3"), { enun: "Você exportou para <b>CSV</b> um arquivo com 3 abas, fórmulas e cores. O que vai no CSV?",
    ops: ["Tudo, igualzinho ao .xlsx", "Só os dados da aba aberta, com os resultados das fórmulas e sem formatação", "Só as fórmulas", "As 3 abas, mas sem cores"], certo: 1,
    okMsg: "CSV é texto puro: uma aba, só valores.",
    ruimMsg: "Lembre do Bloco de Notas: o Total virou só um número e a outra aba não veio." });
  escolha($("#c4"), { enun: "Chegou por e-mail, de alguém que você não conhece, o arquivo <b>bonus_2026.xlsm</b>. O que fazer?",
    ops: ["Abrir logo, pode ser dinheiro", "Não abrir: .xlsm pode ter macros, que são programas e podem fazer mal ao computador", "Renomear para .xlsx e abrir", "Abrir no celular, que é seguro"], certo: 1,
    okMsg: "Macros são programas. Arquivo .xlsm de quem você não conhece é um risco: não abra.",
    ruimMsg: "Repare na extensão <b>.xlsm</b>. O que ela pode ter dentro?" });
  $("#seg").onclick = () => { concluiFase(2); abrirFase(3); };
}
function faseResumo04() {
  main.innerHTML = '<h1>Resumo da cápsula</h1><p class="lead">Seu trabalho guardado e no formato certo.</p><div class="resumo">' +
    '<div class="card"><h3>☁️ Excel online</h3>Salva <b>sozinho</b>, a cada mudança, no <b>OneDrive</b>. Fique de olho no aviso "Salvo" ao lado do nome.</div>' +
    '<div class="card"><h3>💻 Excel instalado</h3>Arquivo novo nasce "Pasta1". Salve com <kbd>Ctrl</kbd> + <kbd>B</kbd>; na 1ª vez ele pede nome e lugar. Com o arquivo no OneDrive, o AutoSalvamento liga.</div>' +
    '<div class="card"><h3>📂 Menu Arquivo</h3><b>Salvar como › Baixar uma Cópia</b> = .xlsx no computador. <b>Exportar</b> = CSV (da aba aberta) ou PDF.</div>' +
    '<div class="card"><h3>🏷️ Formatos</h3>' + TAB_FORMATOS + "</div>" +
    '<div class="card"><h3>⚖️ Qual Excel?</h3>' + TAB_VERSOES + "</div>" +
    '<div class="card"><h3>⚠️ Erros comuns</h3><ul><li>Fechar o Excel instalado sem salvar.</li><li>Mandar um CSV achando que vão as fórmulas e as outras abas.</li><li>Exportar o CSV com a aba errada aberta.</li><li>Abrir .xlsm de quem você não conhece.</li></ul></div>' +
    '<div class="card"><h3>⌨️ Atalhos</h3><kbd>Ctrl</kbd> + <kbd>B</kbd> salva (Excel instalado em português). <kbd>F12</kbd> abre o "Salvar como".</div>' +
    '<div class="card"><h3>🔗 Ponte para o Excel de verdade</h3>No Excel online (<b>excel.new</b>), clique no nome do arquivo lá no alto e dê um nome a ele. Depois, baixe uma cópia em .xlsx e abra a pasta Downloads para ver o arquivo.</div>' +
    '<div class="card"><h3>🟩 No Google Sheets é assim</h3>Também salva sozinho (no Google Drive). Para baixar: <b>Arquivo › Fazer download</b>, e escolha .xlsx, .csv ou .pdf.</div>' +
    '</div><div class="card" style="margin-top:14px"><div class="passo-n">Fim do Módulo 0 · Próximo passo</div><div class="big" style="margin-top:4px">Mini projeto: meu primeiro arquivo</div><p class="hint" style="margin:4px 0 0">No Excel de verdade: criar um arquivo, dar nome, criar e renomear abas e baixar uma cópia. Tudo o que você viu no Módulo 0.</p></div>';
  concluiFase(3);
}
iniciarCapsula([faseAprenda04, fasePratique04, faseSozinho04, faseResumo04]);
