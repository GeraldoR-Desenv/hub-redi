// =====================================================================
//  Cápsula 0.2 · Arquivo e abas (e modelos)
// =====================================================================
const TABELA_TERMOS = '<table class="termo"><tr><th>No dia a dia</th><th>Nome oficial no Excel</th><th>Neste curso</th></tr><tr><td>"a planilha" (o arquivo todo)</td><td><b>Pasta de trabalho</b></td><td><b>arquivo</b></td></tr><tr><td>"a aba"</td><td><b>Planilha</b></td><td><b>aba</b></td></tr></table>';

const CAB = { A1: { neg: true, fill: true }, B1: { neg: true, fill: true } };
const ARQ_VENDEDORES = { nome: "Cadastro de vendedores", larguras: { A: 130, B: 100 }, abas: [
  { nome: "São Paulo", fmt: CAB, dados: { A1: "Vendedor", B1: "Vendas (R$)", A2: "Ana Souza", B2: 52000, A3: "Marcos Rocha", B3: 47000, A4: "Júlia Prado", B4: 39000 } },
  { nome: "Carapicuíba", fmt: CAB, dados: { A1: "Vendedor", B1: "Vendas (R$)", A2: "Bruno Lima", B2: 38000, A3: "Fernanda Reis", B3: 44000 } },
  { nome: "Osasco", fmt: CAB, dados: { A1: "Vendedor", B1: "Vendas (R$)", A2: "Carla Dias", B2: 61000, A3: "Diego Alves", B3: 47000, A4: "Paulo Nunes", B4: 35000 } },
] };
const ARQ_ORCAMENTO = { nome: "Orçamento mensal pessoal", larguras: { A: 150, B: 100 }, abas: [
  { nome: "Resumo", fmt: { A1: { neg: true }, A3: { fill: true }, A4: { fill: true }, A5: { neg: true, fill: true }, B5: { neg: true, fill: true } }, dados: { A1: "Meu orçamento do mês", A3: "Total de receitas", B3: 3500, A4: "Total de despesas", B4: 2400, A5: "Saldo", B5: "=B3-B4" } },
  { nome: "Receitas", fmt: CAB, dados: { A1: "Receita", B1: "Valor (R$)", A2: "Salário", B2: 3200, A3: "Extra", B3: 300 } },
  { nome: "Despesas", fmt: CAB, dados: { A1: "Despesa", B1: "Valor (R$)", A2: "Moradia", B2: 1300, A3: "Alimentação", B3: 700, A4: "Transporte", B4: 250, A5: "Lazer", B5: 150 } },
] };
const pv = (c) => '<div class="pv" style="--c:' + c + '"><i class="h"></i><i></i><i></i><i></i><i></i></div>';
const PAINEL_NOVO = '<h4>Novo</h4><div class="modelos">' +
  '<div class="modelo" data-modelo="branco"><div class="pv"></div>Pasta de trabalho em branco</div>' +
  '<div class="modelo" data-modelo="orcamento" data-p="m-orc">' + pv("#107c41") + "Orçamento mensal pessoal</div>" +
  '<div class="modelo" data-modelo="calendario">' + pv("#2b6cb0") + "Calendário</div>" +
  '<div class="modelo" data-modelo="tarefas">' + pv("#b7791f") + "Lista de tarefas</div>" +
  '<div class="modelo" data-modelo="fatura">' + pv("#6b46c1") + "Controle de despesas da viagem</div></div>";

const PASSOS_02 = [
  { t: "Tudo o que você faz no Excel fica guardado num <span class='dest'>arquivo</span>. O nome dele aparece lá no alto: este se chama <b>Gastos do mês</b>. Pense no arquivo como um <b>caderno</b>.",
    anim: async (j) => { j.spot("titulo"); await j.moverCursor("arquivo"); j.balao("arquivo", "O nome do <b>arquivo</b>"); await j.w(2600); } },
  { t: "Dentro do arquivo ficam as <span class='dest'>abas</span>, como as folhas do caderno. Este arquivo tem duas: <b>Janeiro</b> e <b>Fevereiro</b>. A aba aberta fica destacada; para trocar, é só clicar.",
    anim: async (j) => { j.spot("abas"); await j.moverCursor('[data-aba="Janeiro"]'); j.balao('[data-aba="Janeiro"]', "A aba aberta agora"); await j.w(1800); j.balao(null); await j.clicar('[data-aba="Fevereiro"]'); j.balao('[data-aba="Fevereiro"]', "Clicou, trocou de aba"); await j.w(2000); j.balao(null); await j.clicar('[data-aba="Janeiro"]'); } },
  { t: "Cada aba tem a <b>sua própria grade</b>. A célula <b>B8 da aba Janeiro</b> mostra 2395; a <b>B8 da aba Fevereiro</b> mostra 2445. Mesmo endereço, valores diferentes! Por isso, ao falar de uma célula, diga <b>sempre a aba</b> junto.",
    anim: async (j) => { await j.clicar("B8"); j.balao("B8", "B8 da aba <b>Janeiro</b>: 2395"); await j.w(2200); j.balao(null); await j.clicar('[data-aba="Fevereiro"]'); await j.clicar("B8"); j.balao("B8", "B8 da aba <b>Fevereiro</b>: 2445"); await j.w(2600); } },
  { t: "Agora os <b>nomes oficiais</b>. No dia a dia muita gente chama o arquivo todo de \"planilha\". Mas o Excel chama o arquivo de <span class='dest'>pasta de trabalho</span> e cada aba de <span class='dest'>planilha</span>. Neste curso, falamos <b>arquivo</b> e <b>aba</b>, mas você vai ver os nomes oficiais no Excel." + TABELA_TERMOS,
    anim: async (j) => { j.spot("arquivo", 6); j.balao("arquivo", "Pasta de trabalho = <b>arquivo</b>"); await j.w(2800); j.balao(null); j.spot(".abas-lista", 4); j.balao(".abas-lista", "Planilhas = <b>abas</b>"); await j.w(2800); } },
  { t: "Para criar uma aba nova, clique no <b>+</b> lá embaixo. Ela aparece logo depois da aba aberta, vazia e com um nome automático, como <b>Planilha3</b>. É daí que vem o nome oficial: cada aba é uma planilha.",
    anim: async (j) => { j.spot("abas"); await j.clicar('[data-aba="Fevereiro"]'); const n = await j.criarAbaAnim(); j.balao(j.tab(n), "Aba nova, com nome automático"); await j.w(2800); },
    fim: (j) => { j.trocarAba("Fevereiro"); j.novaAba(); } },
  { t: "\"Planilha3\" não diz nada. Vamos <b>renomear</b>: dê <b>dois cliques</b> no nome da aba, digite o nome novo e aperte <kbd>Enter</kbd>. (Também funciona clicando com o <b>botão direito</b> na aba e escolhendo <b>Renomear</b>.)",
    anim: async (j) => { j.spot("abas"); await j.renomearAnim("Planilha3", "Março"); j.balao(j.tab("Março"), "Agora o nome diz o que tem dentro"); await j.w(2600); },
    fim: (j) => { j.renomear("Planilha3", "Março"); } },
  { t: "O Excel tem <b>regras</b> para nome de aba: no máximo <b>31 caracteres</b>, sem repetir o nome de outra aba e sem os símbolos <code>/ \\ ? * [ ] :</code>. Veja o que acontece se tentarmos <b>Mar/Abr</b>…",
    anim: async (j) => { j.spot("abas"); await j.renomearAnim("Março", "Mar/Abr"); await j.w(3200); } },
  { t: "Como organizar? Uma boa regra: <b>um arquivo por assunto</b> e <b>uma aba por período ou categoria</b>. Exemplo: o arquivo <b>Cadastro de vendedores</b>, com uma aba para cada cidade. Lá no Módulo 7, você vai aprender a buscar dados de uma aba (ou de outro arquivo) para usar em outra.",
    anim: async (j) => { j.carregarArquivo(ARQ_VENDEDORES); await j.w(300); j.spot("arquivo", 6); j.balao("arquivo", "Arquivo: o assunto"); await j.w(2200); j.balao(null); j.spot(".abas-lista", 4); j.balao(".abas-lista", "Abas: uma por cidade"); await j.w(2200); j.balao(null); j.spot(null); await j.clicar('[data-aba="Osasco"]'); await j.w(1500); } },
  { t: "E não precisa começar do zero: ao criar um arquivo novo, o Excel oferece <span class='dest'>modelos</span> prontos, como orçamento, calendário e lista de tarefas. Você escolhe um e só preenche com os seus dados.",
    anim: async (j) => { j.abrirPainel(PAINEL_NOVO); await j.w(600); await j.moverCursor("m-orc"); j.balao("m-orc", "Um modelo pronto"); await j.w(1800); j.balao(null); j.anel(); await j.w(300); j.carregarArquivo(ARQ_ORCAMENTO); await j.w(500); j.spot(".abas-lista", 4); j.balao(".abas-lista", "Já vem com abas, títulos e contas prontas"); await j.w(3000); } },
  { t: "Resumindo: o <b>arquivo</b> (pasta de trabalho) é o caderno; as <b>abas</b> (planilhas) são as folhas. Criar: <b>+</b>. Renomear: <b>dois cliques</b> na aba. Ao citar uma célula, diga a aba: \"B8 da aba Janeiro\". Agora é a sua vez!",
    anim: async (j) => { j.spot("arquivo", 6); await j.w(1300); j.spot("abas"); await j.w(1300); } },
];

const naAba = (j, n) => j.ativa === n;
const TAREFAS_02 = [
  { txt: "Abra a aba <b>Fevereiro</b>.", alvo: '[data-aba="Fevereiro"]',
    teste: (ev) => ev.tipo === "aba" && ev.nome === "Fevereiro",
    erro: (ev) => (ev.tipo === "nova-aba" ? "Você criou uma aba nova. Tudo bem, mas a tarefa é <b>abrir</b> a aba Fevereiro, que já existe." : null),
    ok: () => "Você está na aba Fevereiro. Repare que os números mudaram: é outra folha do mesmo caderno.",
    dicas: ["As abas ficam lá embaixo, à esquerda.", "Clique na aba destacada, Fevereiro."] },
  { txt: "Clique no <b>Total da aba Fevereiro</b> (o número).", alvo: "B8",
    teste: (ev, j) => ev.tipo === "sel" && naAba(j, "Fevereiro") && rotulo(ev.a, ev.b) === "B8",
    erro: (ev, j) => {
      if (ev.tipo !== "sel") return null;
      if (!naAba(j, "Fevereiro")) return "Você está na aba <b>" + j.ativa + "</b>. O total pedido é o da aba <b>Fevereiro</b>.";
      return rotulo(ev.a, ev.b) === "A8" ? "Essa é a palavra Total. O número fica ao lado, na coluna B." : "O total fica na linha 8, coluna B.";
    },
    ok: () => "Isso: <b>B8 da aba Fevereiro</b> = 2445. Na aba Janeiro, a mesma B8 mostra 2395.",
    dicas: ["O total fica na linha da palavra Total.", "É a célula destacada, B8."] },
  { txt: "Crie uma <b>aba nova</b>.", alvo: "[data-add]",
    teste: (ev) => ev.tipo === "nova-aba",
    erro: () => null,
    ok: (j) => "Nasceu a aba <b>" + j.ativa + "</b>, vazia e com nome automático.",
    dicas: ["Procure o sinal de <b>+</b> perto das abas.", "Clique no <b>+</b> destacado."] },
  { txt: "Renomeie a aba nova para <b>Março</b>: dois cliques no nome dela, digite e aperte <kbd>Enter</kbd>.", alvo: ".abas-lista",
    teste: (ev) => ev.tipo === "renomear" && /^mar[çc]o$/i.test(ev.para) && /^Planilha\d+$/.test(ev.de),
    erro: (ev) => {
      if (ev.tipo === "renomear-erro") return "O Excel recusou o nome: " + ev.msg;
      if (ev.tipo === "renomear" && !/^Planilha\d+$/.test(ev.de)) return "Você renomeou a aba <b>" + ev.de + "</b>, que já existia. A tarefa é renomear a aba <b>nova</b> (a que se chama PlanilhaN). Dica: dê dois cliques em <b>" + ev.para + "</b> e volte o nome para " + ev.de + ".";
      if (ev.tipo === "renomear") return "Você deu o nome <b>" + ev.para + "</b>. O pedido é <b>Março</b>.";
      return null;
    },
    ok: () => "A aba agora se chama <b>Março</b>. Nome que diz o que tem dentro!",
    dicas: ["Dê dois cliques rápidos em cima do nome da aba nova. Ou clique nela com o botão direito e escolha Renomear.", "Quando o nome ficar editável, apague, digite Março e aperte Enter."] },
  { txt: "Volte para a aba <b>Janeiro</b> e clique no <b>valor do Aluguel</b>.", alvo: '[data-aba="Janeiro"]',
    teste: (ev, j) => ev.tipo === "sel" && naAba(j, "Janeiro") && rotulo(ev.a, ev.b) === "B2",
    erro: (ev, j) => {
      if (ev.tipo !== "sel") return null;
      if (!naAba(j, "Janeiro")) return "Você está na aba <b>" + j.ativa + "</b>. Primeiro clique na aba <b>Janeiro</b>.";
      return rotulo(ev.a, ev.b) === "A2" ? "Essa é a palavra Aluguel. O valor fica ao lado." : "O valor do Aluguel fica na coluna B, na linha da palavra Aluguel.";
    },
    ok: () => "Perfeito: <b>B2 da aba Janeiro</b> = 1200. Você navegou entre abas como no Excel de verdade.",
    dicas: ["Primeiro troque para a aba Janeiro, lá embaixo.", "Na aba Janeiro, o valor do Aluguel é a célula B2."] },
];

function faseAprenda02() {
  montaAprenda({ titulo: "Arquivo e abas", lead: "Onde ficam guardados os seus dados, como dividir um arquivo em abas e os nomes oficiais que o Excel usa para essas coisas.", passos: PASSOS_02 });
}
function fasePratique02() {
  main.innerHTML = '<h1>Pratique junto</h1><p class="lead">Navegue entre as abas, crie uma nova e dê um nome a ela. A tela confere cada passo.</p><div id="t1"></div><div class="row" style="margin-top:16px"><button class="btn pri" id="seg">Ir para o desafio ▶</button></div>';
  tarefasGuiadas({ host: $("#t1"), tarefas: TAREFAS_02,
    aoTerminar: () => { concluiFase(1); return '<div class="fbk ok"><b>Você já organiza um arquivo! 🎉</b>Trocou de aba, achou uma célula na aba certa, criou e renomeou uma aba. Agora, sem ajuda.</div>'; } });
  $("#seg").onclick = () => abrirFase(2);
}
function faseSozinho02() {
  main.innerHTML = '<h1>Agora sozinho</h1><p class="lead">Este é o arquivo <b>Cadastro de vendedores</b>, com uma aba por cidade. Explore e responda.</p>' +
    '<div class="card"><div class="passo-n">Desafio</div><div class="qs"><div class="q" id="d1"></div><div class="q" id="d2"></div><div class="q" id="d3"></div></div></div>' +
    '<div id="jw" style="margin-top:14px"></div>' +
    '<div class="card" style="margin-top:16px"><div class="passo-n">Perguntas rápidas</div><div class="qs"><div class="q" id="c1"></div><div class="q" id="c2"></div><div class="q" id="c3"></div></div></div>' +
    '<div class="row" style="margin-top:16px"><button class="btn pri" id="seg">Ver o resumo ▶</button></div>';
  const j = new Janela($("#jw"), { interativo: true, arquivo: ARQ_VENDEDORES });
  resposta($("#d1"), { enun: "<b>1.</b> Quantas <b>abas</b> tem o arquivo Cadastro de vendedores (antes de você criar alguma)?", ph: "ex.: 5",
    checar: (s) => { const n = lerNumero(s);
      if (n === 3) return { ok: true, msg: "São Paulo, Carapicuíba e Osasco: 3 abas, uma por cidade." };
      if (n === 1) return { ok: false, msg: "1 é o arquivo. Conte as <b>abas</b> lá embaixo." };
      return { ok: false, msg: "Conte as abas que aparecem lá embaixo, ao lado do +." }; } });
  resposta($("#d2"), { enun: "<b>2.</b> Qual vendedor está na <b>célula A3 da aba Osasco</b>?", ph: "nome",
    checar: (s) => { const t = s.toLowerCase().replace(/\s+/g, " ").trim();
      if (t.startsWith("diego")) return { ok: true, msg: "Diego Alves. A mesma A3 na aba São Paulo é o Marcos Rocha: por isso a aba importa." };
      if (t.startsWith("marcos")) return { ok: false, msg: "Marcos Rocha está na A3 da aba <b>São Paulo</b>. Troque para a aba Osasco." };
      if (t.startsWith("fernanda")) return { ok: false, msg: "Fernanda Reis está na A3 da aba <b>Carapicuíba</b>. Troque para a aba Osasco." };
      return { ok: false, msg: "Clique na aba <b>Osasco</b> e depois na célula A3 (coluna A, linha 3)." }; } });
  $("#d3").innerHTML = '<div class="enun"><b>3.</b> A empresa abriu uma loja em <b>Barueri</b>. Crie uma aba com esse nome no arquivo.</div><div class="row"><button class="btn pri">Conferir</button></div><div class="out"></div>';
  $("#d3 .btn").onclick = () => {
    const tem = j.ordem.find((n) => n.toLowerCase() === "barueri"), auto = j.ordem.filter((n) => /^Planilha\d+$/.test(n));
    $("#d3 .out").innerHTML = tem ? '<div class="fbk ok"><b>Isso! ✅</b>A aba <b>' + tem + "</b> está no arquivo. Uma aba por cidade, como as outras.</div>"
      : auto.length ? '<div class="fbk bad"><b>Quase.</b>Você criou a aba <b>' + auto[0] + "</b>, mas falta renomear para Barueri (dois cliques no nome).</div>"
      : '<div class="fbk bad"><b>Ainda não.</b>Não encontrei a aba Barueri. Crie uma aba com o <b>+</b> e renomeie.</div>';
  };
  escolha($("#c1"), { enun: "No Excel, qual é o <b>nome oficial</b> de cada aba?",
    ops: ["Pasta de trabalho", "Planilha", "Célula", "Guia"], certo: 1,
    okMsg: "Cada aba é uma <b>planilha</b>; o arquivo inteiro é a <b>pasta de trabalho</b>.",
    ruimMsg: (k) => (k === 0 ? "Pasta de trabalho é o <b>arquivo</b> inteiro, com todas as abas." : k === 3 ? "Guia é o nome das abas da Faixa de Opções, lá em cima (Página Inicial, Inserir…)." : "Célula é o quadradinho da grade.") });
  escolha($("#c2"), { enun: "Você quer dizer a um colega onde está o total de fevereiro. Qual frase é mais clara?",
    ops: ["Está na B8", "Está na B8 da aba Fevereiro", "Está lá embaixo", "Está na planilha"], certo: 1,
    okMsg: "Endereço + aba: sem chance de confusão. É o mesmo jeito que o Excel escreve: <code>Fevereiro!B8</code>.",
    ruimMsg: "Lembre que a B8 existe em <b>todas</b> as abas, com valores diferentes." });
  escolha($("#c3"), { enun: "Qual destes nomes de aba o Excel <b>não</b> aceita?",
    ops: ["Vendas 2026", "Jan-Fev", "Jan/Fev", "Resumo"], certo: 2,
    okMsg: "A barra <code>/</code> é proibida em nome de aba, assim como <code>\\ ? * [ ] :</code>. Hífen e espaço podem.",
    ruimMsg: "Esse é aceito. Lembre dos símbolos proibidos: / \\ ? * [ ] :" });
  $("#seg").onclick = () => { concluiFase(2); abrirFase(3); };
}
function faseResumo02() {
  main.innerHTML = '<h1>Resumo da cápsula</h1><p class="lead">Como os dados ficam organizados no Excel.</p><div class="resumo">' +
    '<div class="card"><h3>📁 Arquivo</h3>Onde tudo fica guardado. O nome aparece no alto da tela. Nome oficial: <b>pasta de trabalho</b>.</div>' +
    '<div class="card"><h3>📑 Abas</h3>As folhas do arquivo, cada uma com sua própria grade. Nome oficial: <b>planilha</b>. Clique para trocar de aba.</div>' +
    '<div class="card"><h3>📖 Dicionário</h3>' + TABELA_TERMOS + "</div>" +
    '<div class="card"><h3>➕ Criar e renomear</h3>Criar: <b>+</b> ao lado das abas. Renomear: <b>dois cliques</b> no nome (ou botão direito → Renomear), digite e <kbd>Enter</kbd>.</div>' +
    '<div class="card"><h3>📏 Regras de nome</h3>Até 31 caracteres, sem repetir outra aba, sem <code>/ \\ ? * [ ] :</code>. Use nomes que dizem o que tem dentro.</div>' +
    '<div class="card"><h3>🗂️ Como organizar</h3>Um arquivo por assunto; uma aba por período ou categoria (Janeiro, Fevereiro… ou São Paulo, Osasco…).</div>' +
    '<div class="card"><h3>🧩 Modelos</h3>Ao criar um arquivo novo, escolha um modelo pronto (orçamento, calendário, tarefas) e só preencha.</div>' +
    '<div class="card"><h3>⚠️ Erros comuns</h3><ul><li>Citar uma célula sem dizer a aba ("está na B8").</li><li>Deixar abas com nome automático (Planilha1, Planilha2…).</li><li>Procurar dados na aba errada.</li></ul></div>' +
    '<div class="card"><h3>⌨️ Atalho</h3>No Excel instalado, <kbd>Shift</kbd> + <kbd>F11</kbd> cria uma aba nova.</div>' +
    '<div class="card"><h3>🔗 Ponte para o Excel de verdade</h3>Abra o Excel online (<b>excel.new</b>), crie uma aba com o <b>+</b> e renomeie as duas com os nomes do mês atual e do próximo.</div>' +
    '<div class="card"><h3>🟩 No Google Sheets é assim</h3>As abas também ficam embaixo e o <b>+</b> cria uma nova, com nome automático <b>Página2</b>, <b>Página3</b>… Para renomear, dois cliques no nome.</div>' +
    '</div><div class="card" style="margin-top:14px"><div class="passo-n">Próxima cápsula</div><div class="big" style="margin-top:4px">0.3 · Tour pela tela</div><p class="hint" style="margin:4px 0 0">Faixa de Opções, Caixa de Nome, Barra de Fórmulas, grade e barra de status: para que serve cada parte da tela.</p></div>';
  concluiFase(3);
}
iniciarCapsula([faseAprenda02, fasePratique02, faseSozinho02, faseResumo02]);
