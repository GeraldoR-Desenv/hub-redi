// =====================================================================
//  Cápsula 0.1 · O que é o Excel e para que serve
// =====================================================================
const CADERNO =
  '<div class="ct">Gastos de janeiro</div>' +
  "<div>Aluguel ........ 1200</div>" +
  '<div>Mercado ....... <span class="v-merc">650</span> <span class="caneta c-merc">700</span></div>' +
  "<div>Luz ............. 140</div>" +
  "<div>Água ............ 85</div>" +
  "<div>Internet ....... 100</div>" +
  "<div>Transporte .... 220</div>" +
  '<div><b>Total ......... <span class="v-tot" data-p="c-tot">2395</span></b> <span class="caneta c-tot">2445 ?</span></div>' +
  '<div class="conta">1200 + 700 + 140 + 85 + 100 + 220 = … deixa eu ver…</div>';

const ARQ_ESTOQUE = { nome: "Controle de estoque", larguras: { A: 100, B: 62, C: 90, D: 132 }, abas: [{ nome: "Produtos", dados: { A1: "Produto", B1: "Qtd", C1: "Preço (R$)", D1: "Valor em estoque", A2: "Caneta", B2: 120, C2: 2, D2: "=B2*C2", A3: "Caderno", B3: 45, C3: 18, D3: "=B3*C3", A4: "Borracha", B4: 80, C4: 1.5, D4: "=B4*C4", A5: "Mochila", B5: 12, C5: 95, D5: "=B5*C5", A6: "Total", D6: "=SOMA(D2:D5)" } }] };
const ARQ_CLIENTES = { nome: "Lista de clientes", larguras: { A: 112, B: 130, C: 112 }, abas: [{ nome: "Clientes", dados: { A1: "Nome", B1: "Telefone", C1: "Cidade", A2: "Ana Souza", B2: "(11) 90000-0001", C2: "São Paulo", A3: "Bruno Lima", B3: "(11) 90000-0002", C3: "Carapicuíba", A4: "Carla Dias", B4: "(11) 90000-0003", C4: "Osasco", A5: "Diego Alves", B5: "(11) 90000-0004", C5: "Barueri" } }] };
const ARQ_VENDAS = { nome: "Vendas do trimestre", larguras: { A: 92, B: 98, C: 98, D: 82 }, abas: [{ nome: "Vendas", dados: { A1: "Vendedor", B1: "Vendas (R$)", C1: "Meta (R$)", D1: "Bateu?", A2: "Ana", B2: 52000, C2: 50000, D2: "Sim", A3: "Bruno", B3: 38000, C3: 45000, D3: "Não", A4: "Carla", B4: 61000, C4: 55000, D4: "Sim", A5: "Diego", B5: 47000, C5: 47000, D5: "Sim", A6: "Total", B6: "=SOMA(B2:B5)" } }] };

const PASSOS_01 = [
  { t: "Imagine que você anota os gastos do mês num <b>caderno</b>: aluguel, mercado, luz… No fim, soma tudo na calculadora e escreve o total embaixo.",
    anim: async (j) => { j.caderno(CADERNO); await j.w(600); await j.moverCursor("c-tot"); j.balao("c-tot", "Somado na calculadora e escrito à mão"); await j.w(2600); } },
  { t: "Aí você descobre que o mercado foi <b>700</b>, não 650. No caderno, você risca, corrige… e precisa <b>refazer a conta inteira</b>, torcendo para não errar.",
    anim: async (j) => {
      j.caderno(CADERNO); const c = $(".caderno", j.el);
      await j.moverCursor(".v-merc"); $(".v-merc", c).classList.add("risca"); await j.w(500); $(".c-merc", c).classList.add("on"); await j.w(900);
      $(".conta", c).classList.add("on"); await j.w(1600);
      await j.moverCursor("c-tot"); $(".v-tot", c).classList.add("risca"); $(".c-tot", c).classList.add("on");
      j.balao("c-tot", "Toda mudança = refazer a conta à mão"); await j.w(2600); } },
  { t: "O <b>Excel</b> resolve isso. Ele é um <span class='dest'>programa de planilhas</span>: organiza informações em <b>linhas e colunas</b>, como uma tabela, e <b>faz as contas por você</b>. Esta é a mesma lista de gastos, agora no Excel.",
    anim: async (j) => { j.caderno(CADERNO); await j.w(400); j.caderno(null); await j.w(800); j.spot("grade"); await j.moverCursor("A4"); j.balao("A4", "Cada informação no seu quadradinho"); await j.w(2600); } },
  { t: "Mesma situação: o mercado foi 700. No Excel, basta <b>clicar no valor</b>, digitar o número novo e apertar <kbd>Enter</kbd>. Observe o <b>Total</b>…",
    anim: async (j) => { await j.clicar("B3"); await j.digitar("B3", "700"); await j.confirmar("B3", 700); j.setSel("B4"); await j.w(300); j.balao("B8", "2395 → <b>2445</b>, sem refazer conta nenhuma"); await j.w(3000); },
    fim: (j) => { j.setValor("B3", 700); } },
  { t: "Como ele fez isso? A célula do Total não guarda um número fixo: ela guarda uma <b>conta</b> que soma os valores de cima. Mudou um valor, a conta se refaz sozinha. Você vai aprender a escrever essas contas (as <b>fórmulas</b>) no Módulo 4.",
    anim: async (j) => { await j.clicar("B8"); j.spot("fb"); j.balao("fb", "Por trás do total existe uma conta"); await j.w(2800); },
    fim: (j) => j.setSel("A1") },
  { t: "O Excel também transforma números em <span class='dest'>gráficos</span>. Num relance você vê para onde vai o dinheiro. E o gráfico acompanha os dados: se o mercado subir para 900, a barra cresce sozinha.",
    anim: async (j) => { j.grafico(true); await j.w(1200); j.balao("graf", "O aluguel é a maior barra"); await j.w(2200); j.balao(null); await j.clicar("B3"); await j.digitar("B3", "900"); await j.confirmar("B3", 900); j.balao("graf", "A barra do Mercado cresceu sozinha"); await j.w(2600); },
    fim: (j) => { j.grafico(true); j.setValor("B3", 900); } },
  { t: "O mesmo programa serve para muita coisa. Uma loja usa o Excel para <b>controlar o estoque</b>: quantas unidades tem de cada produto e quanto dinheiro está parado na prateleira.",
    anim: async (j) => { j.carregarArquivo(ARQ_ESTOQUE); await j.w(400); j.spot("arquivo"); j.balao("arquivo", "Outro arquivo: Controle de estoque"); await j.w(2000); j.spot(null); j.balao(null); await j.moverCursor("D6"); j.balao("D6", "Valor total do estoque, calculado sozinho"); await j.w(2600); } },
  { t: "Um escritório usa o Excel como <b>cadastro</b>: a lista de clientes com nome, telefone e cidade, fácil de organizar e de procurar.",
    anim: async (j) => { j.carregarArquivo(ARQ_CLIENTES); await j.w(400); await j.moverCursor("C3"); j.balao("C3", "Uma linha para cada cliente"); await j.w(2600); } },
  { t: "E um <b>analista de dados</b> usa o Excel para responder perguntas: quanto vendemos? Quem bateu a meta? É o primeiro passo para trabalhar com <b>dados e BI</b>, e é para onde este curso vai te levar.",
    anim: async (j) => { j.carregarArquivo(ARQ_VENDAS); await j.w(400); await j.moverCursor("D3"); j.balao("D3", "Bruno não bateu a meta"); await j.w(2200); j.balao(null); await j.moverCursor("B6"); j.balao("B6", "Total vendido no trimestre"); await j.w(2400); } },
  { t: "Quando o Excel <b>não</b> é a melhor escolha? Texto longo, como uma carta ou um currículo, vai melhor no <b>Word</b> (ou Google Docs). Slides para reunião, no <b>PowerPoint</b>. A regra prática: <b>tem números, listas ou tabelas? É Excel.</b> Agora é a sua vez!",
    anim: async (j) => { j.spot("grade"); j.balao("A3", "Números, listas, tabelas: terreno do Excel"); await j.w(3000); } },
];

const TAREFAS_01 = [
  { txt: "Clique na célula do <b>Total</b> de gastos (o número, não a palavra).", alvo: "B8",
    teste: (ev) => ev.tipo === "sel" && rotulo(ev.a, ev.b) === "B8",
    erro: (ev, j) => {
      if (ev.tipo !== "sel") return null;
      const r = rotulo(ev.a, ev.b);
      if (r === "A8") return "Essa é a <b>palavra</b> Total. O número fica ao lado, na coluna dos valores.";
      return "Você clicou em uma célula com " + (j.valor(r.split(":")[0]) === "" ? "nada dentro" : "<b>" + j.valor(r.split(":")[0]) + "</b>") + ". O total fica na última linha da lista, ao lado da palavra Total.";
    },
    ok: () => "Esse é o total: <b>2395</b>. Guarde esse número, ele vai mudar já já.",
    dicas: ["Procure a palavra Total. O número dela fica logo à direita.", "É a célula destacada."] },
  { txt: "O mercado na verdade foi <b>700</b>. Clique no valor do <b>Mercado</b>, digite <b>700</b> e aperte <kbd>Enter</kbd>.", alvo: "B3",
    teste: (ev) => ev.tipo === "edit" && ev.a === "B3" && ev.raw === 700,
    erro: (ev) => {
      if (ev.tipo === "travada") return "Você tentou digitar numa célula que não é a do Mercado. Clique no <b>número</b> ao lado da palavra Mercado.";
      if (ev.tipo === "edit" && ev.a === "B3") return "Você digitou <b>" + (ev.raw === undefined ? "nada" : ev.raw) + "</b>. O valor certo é <b>700</b>, só os números, sem R$ e sem ponto.";
      return null;
    },
    ok: () => "Viu o Total? Foi de 2395 para <b>2445</b> sozinho. No caderno, você teria refeito a conta toda.",
    dicas: ["Clique no número 650 (ao lado de Mercado), digite 700 e aperte Enter no teclado.", "A célula do Mercado está destacada. Clique nela, digite 700 e aperte Enter."] },
  { txt: "A conta de luz veio <b>160</b>. Atualize o valor da <b>Luz</b> e confira o Total.", alvo: "B4",
    teste: (ev) => ev.tipo === "edit" && ev.a === "B4" && ev.raw === 160,
    erro: (ev) => {
      if (ev.tipo === "travada") return "Essa célula está protegida neste exercício. Clique no <b>valor</b> da Luz.";
      if (ev.tipo === "edit" && ev.a === "B4") return "Você digitou <b>" + (ev.raw === undefined ? "nada" : ev.raw) + "</b>. O valor da luz agora é <b>160</b>.";
      if (ev.tipo === "edit" && ev.a === "B3") return "Esse é o Mercado. A Luz fica na linha de baixo.";
      return null;
    },
    ok: () => "O Total foi para <b>2465</b>. Você mudou dois valores e não fez nenhuma conta: o Excel fez por você.",
    dicas: ["O valor da Luz é o número ao lado da palavra Luz.", "Clique na célula destacada, digite 160 e aperte Enter."] },
];

const CLASSIF = [
  ["Controlar os gastos da casa todo mês", true, "Números que mudam e um total que precisa acompanhar: clássico do Excel."],
  ["Escrever um currículo", false, "Texto corrido fica melhor no Word ou no Google Docs."],
  ["Calcular a comissão de cada vendedor", true, "Contas repetidas para várias pessoas: o Excel faz em segundos."],
  ["Lista de convidados com quem confirmou presença", true, "Lista com colunas (nome, telefone, confirmou?) é tabela, então é Excel."],
  ["Montar os slides de uma reunião", false, "Slides são trabalho do PowerPoint. Mas os gráficos que vão neles muitas vezes nascem no Excel!"],
  ["Editar as fotos da viagem", false, "Foto é com editor de imagem. O Excel trabalha com dados."],
];

function faseAprenda01() {
  montaAprenda({ titulo: "O que é o Excel e para que serve", lead: "Antes de aprender os botões, vamos entender por que vale a pena usar o Excel, com um exemplo do dia a dia.", passos: PASSOS_01 });
}
function fasePratique01() {
  main.innerHTML = '<h1>Pratique junto</h1><p class="lead">Agora é você quem mexe. Primeiro, sinta o Excel recalculando sozinho. Depois, decida quando ele é a ferramenta certa.</p><div id="t1"></div>' +
    '<div class="card" style="margin-top:16px"><div class="passo-n">Excel ou outra ferramenta?</div><div class="enun">Para cada tarefa, escolha:</div><div class="classif" id="cl"></div><div id="clout"></div></div>' +
    '<div class="row" style="margin-top:16px"><button class="btn pri" id="seg">Ir para o desafio ▶</button></div>';
  tarefasGuiadas({ host: $("#t1"), tarefas: TAREFAS_01, opcoesJanela: { editaveis: ["B3", "B4"], msgTravada: "Neste exercício, só os valores de <b>Mercado</b> e <b>Luz</b> podem ser mudados." },
    aoTerminar: () => '<div class="fbk ok"><b>Isso é o coração do Excel! 🎉</b>Você mudou os dados e o resultado acompanhou. Agora, logo abaixo: quando usar o Excel?</div>' });
  const acertos = new Set();
  $("#cl").innerHTML = CLASSIF.map(([t], i) => '<div class="ci" data-i="' + i + '"><span class="ct2">' + t + '</span><span class="bs"><button data-r="1">📊 Excel</button><button data-r="0">Outra ferramenta</button></span></div>').join("");
  $$("#cl .ci").forEach((ci) => $$("button", ci).forEach((b) => (b.onclick = () => {
    const [, certo, ex] = CLASSIF[+ci.dataset.i], ok = (b.dataset.r === "1") === certo;
    ci.classList.toggle("ok", ok); ci.classList.toggle("bad", !ok);
    let e = $(".ex", ci); if (!e) { e = document.createElement("div"); e.className = "ex"; ci.appendChild(e); }
    e.innerHTML = (ok ? "✅ " : "❌ Não é bem assim. ") + ex;
    if (ok) acertos.add(ci.dataset.i); else acertos.delete(ci.dataset.i);
    if (acertos.size === CLASSIF.length) { $("#clout").innerHTML = '<div class="fbk ok"><b>Todas certas! ✅</b>Regra prática: tem números, listas ou tabelas? É Excel.</div>'; concluiFase(1); }
  })));
  $("#seg").onclick = () => abrirFase(2);
}
function faseSozinho01() {
  main.innerHTML = '<h1>Agora sozinho</h1><p class="lead">Sem destaque e sem passo a passo. Use a planilha logo abaixo quando precisar.</p>' +
    '<div class="card"><div class="passo-n">Desafio</div><div class="qs"><div class="q" id="d1"></div></div></div>' +
    '<div id="jw" style="margin-top:14px"></div>' +
    '<div class="card" style="margin-top:16px"><div class="passo-n">Perguntas rápidas</div><div class="qs"><div class="q" id="c1"></div><div class="q" id="c2"></div><div class="q" id="c3"></div></div></div>' +
    '<div class="row" style="margin-top:16px"><button class="btn pri" id="seg">Ver o resumo ▶</button></div>';
  const j = new Janela($("#jw"), { interativo: true, editaveis: ["B2", "B3", "B4", "B5", "B6", "B7"], msgTravada: "Aqui só os valores dos gastos (coluna B) podem ser mudados." });
  resposta($("#d1"), { enun: "A conta de <b>Internet</b> de janeiro veio <b>120</b>, e não 100. Atualize o valor na planilha e responda: qual é o <b>novo total</b>?", ph: "ex.: 2000",
    checar: (s) => { const n = lerNumero(s);
      if (n === 2415) return { ok: true, msg: j.valor("B6") === 120 ? "Você atualizou a Internet e o Excel refez o total: <b>2415</b>." : "Acertou de cabeça! Mas experimente mudar o valor na planilha: é o Excel quem deve fazer a conta." };
      if (n === 2395) return { ok: false, msg: "Esse é o total antigo. Clique no valor da Internet, digite 120 e aperte <kbd>Enter</kbd>. Depois olhe o Total de novo." };
      if (n === 120 || n === 100) return { ok: false, msg: "Esse é o valor da Internet. A pergunta é o <b>Total</b> de todos os gastos, depois da mudança." };
      return { ok: false, msg: "Confira se você digitou 120 no valor da <b>Internet</b> (não em outra linha) e leia o número ao lado de Total." }; } });
  escolha($("#c1"), { enun: "Qual é a maior vantagem do Excel em relação ao caderno?",
    ops: ["A letra fica mais bonita", "Ele organiza os dados em tabela e refaz as contas sozinho quando um valor muda", "Ele não deixa você errar nunca", "Ele só funciona com internet"], certo: 1,
    okMsg: "Organizar e recalcular sozinho: é isso que economiza horas de trabalho.",
    ruimMsg: (k) => (k === 2 ? "Infelizmente o Excel deixa errar sim: se você digitar um valor errado, ele calcula com o valor errado." : "Pense no que aconteceu com o Total quando você mudou o Mercado.") });
  escolha($("#c2"), { enun: "Para qual destas tarefas o Excel é a <b>melhor</b> escolha?",
    ops: ["Escrever uma carta de apresentação", "Montar o controle de horas extras da equipe no mês", "Editar o vídeo de aniversário", "Criar os slides da reunião"], certo: 1,
    okMsg: "Horas, pessoas, totais: números e tabela. Terreno do Excel.",
    ruimMsg: "Lembre a regra prática: tem números, listas ou tabelas?" });
  escolha($("#c3"), { enun: "Você fez um gráfico de barras com os gastos do mês. Depois, muda o valor do Mercado. O que acontece com o gráfico?",
    ops: ["Nada: é preciso fazer outro gráfico", "A barra do Mercado muda sozinha", "O gráfico apaga", "Todas as barras ficam do mesmo tamanho"], certo: 1,
    okMsg: "O gráfico está ligado aos dados: mudou o dado, mudou a barra.",
    ruimMsg: "Lembre do passo do gráfico, quando o mercado subiu para 900." });
  $("#seg").onclick = () => { concluiFase(2); abrirFase(3); };
}
function faseResumo01() {
  main.innerHTML = '<h1>Resumo da cápsula</h1><p class="lead">O que levar daqui antes de conhecer a tela em detalhe.</p><div class="resumo">' +
    '<div class="card"><h3>📊 O que é</h3>Um <b>programa de planilhas</b>: organiza informações em linhas e colunas e faz contas com elas.</div>' +
    '<div class="card"><h3>⚡ O superpoder</h3><b>Recalcula sozinho.</b> Mudou um valor, o total e o gráfico acompanham. Nada de refazer conta na calculadora.</div>' +
    '<div class="card"><h3>🧰 Para que serve</h3>Orçamentos, estoque, cadastros de clientes, vendas e metas, relatórios. Tem números, listas ou tabelas? É Excel.</div>' +
    '<div class="card"><h3>🚫 Quando não usar</h3>Texto longo (carta, currículo) → Word ou Google Docs. Slides → PowerPoint. Fotos e vídeos → editores próprios.</div>' +
    '<div class="card"><h3>🎯 Para quem quer trabalhar com dados</h3>O Excel é a porta de entrada da análise de dados e do BI. A lógica que você aprender aqui (tabelas, fórmulas, gráficos) é a mesma das ferramentas mais avançadas.</div>' +
    '<div class="card"><h3>⚠️ Erros comuns</h3><ul><li>Fazer a conta na calculadora e digitar o total à mão: aí ele <b>não</b> acompanha as mudanças.</li><li>Usar o Excel só como "tabela bonita", sem deixar ele calcular.</li></ul></div>' +
    '<div class="card"><h3>⌨️ Atalho</h3><kbd>Enter</kbd> confirma o que você digitou e desce para a célula de baixo. <kbd>Esc</kbd> desiste da digitação.</div>' +
    '<div class="card"><h3>🔗 Ponte para o Excel de verdade</h3>Entre em <b>office.com</b> com uma conta Microsoft gratuita e abra o Excel (depois de entrar, <b>excel.new</b> abre um arquivo novo). Digite seus 3 maiores gastos do mês, um embaixo do outro. Só isso, por hoje!</div>' +
    '<div class="card"><h3>🟩 No Google Sheets é assim</h3>O Google Sheets é o "Excel do Google", gratuito e no navegador. Quase tudo deste curso funciona igual. Atalho: <b>sheets.new</b> abre uma planilha nova.</div>' +
    '</div><div class="card" style="margin-top:14px"><div class="passo-n">Próxima cápsula</div><div class="big" style="margin-top:4px">0.2 · Arquivo e abas</div><p class="hint" style="margin:4px 0 0">O que é um arquivo do Excel, para que servem as abas e como criar e renomear uma. E os nomes oficiais que o Excel usa para essas coisas.</p></div>';
  concluiFase(3);
}
iniciarCapsula([faseAprenda01, fasePratique01, faseSozinho01, faseResumo01]);
