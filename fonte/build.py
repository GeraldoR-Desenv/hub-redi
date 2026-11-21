"""
Build do site Hub ReDi de Conhecimentos.

Gera as páginas finais (HTML autossuficiente, sem servidor) a partir de fonte/:
  - index.html                 portal: busca, catálogo de cursos, como funciona, perguntas
  - <curso>/index.html         página do curso: o que vai aprender, conteúdo, progresso
  - <curso>/modulo-N/*.html    cápsulas (motor.js + conteúdo cNN.js) e mini projetos
  - privacidade, termos, 404, sitemap.xml, robots.txt, favicon.svg

Rodar na raiz do repositório:  python3 fonte/build.py
Para incluir um curso ou uma aula nova, basta editar a lista CURSOS abaixo.
"""
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FONTE = RAIZ / "fonte"
SITE_URL = "https://hub-redi.netlify.app"  # trocar quando houver domínio próprio

FONTES = '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Caveat:wght@500;700&display=swap" rel="stylesheet">'
LOGO = (FONTE / "logo.svg").read_text(encoding="utf-8")
SITE_CSS = (FONTE / "site.css").read_text(encoding="utf-8")
PIX_QR = (FONTE / "pix-qr.svg").read_text(encoding="utf-8")
PIX_COPIA = (FONTE / "pix-copia-e-cola.txt").read_text(encoding="utf-8").strip()
AVISO_MARCA = "Excel é marca registrada da Microsoft. Os cursos do Hub ReDi são independentes e não têm vínculo com a Microsoft."

# =====================================================================
#  CATÁLOGO
# =====================================================================
CURSOS = [
    {
        "slug": "excel-do-zero",
        "nome": "Excel do Zero",
        "linha": "Para quem nunca abriu o Excel",
        "h1": "Excel do Zero: curso de Excel <em>grátis</em> para quem nunca abriu o Excel",
        "resumo": "Aprenda Excel do primeiro clique, com aulas curtas, uma tela que imita o Excel de verdade e correção que explica cada erro.",
        "nivel": "Iniciante",
        "area": "Planilhas e dados",
        "tags": "excel planilha planilhas dados iniciante office microsoft google sheets",
        "fonte": "excel-do-zero",
        "aprender": [
            "O que é o Excel e quando ele é (ou não é) a ferramenta certa",
            "Arquivo e abas: criar, renomear e organizar",
            "As partes da tela: Faixa de Opções, Caixa de Nome, Barra de Fórmulas e barra de status",
            "Salvar no Excel online e no instalado (Ctrl+B)",
            "Quando usar .xlsx, .csv e .pdf",
            "Criar e baixar o seu primeiro arquivo no Excel de verdade",
        ],
        "para_quem": [
            "Quem nunca abriu o Excel ou abre com medo",
            "Quem precisa de Excel para conseguir ou manter um emprego",
            "Quem quer começar o caminho para trabalhar com dados",
        ],
        "requisitos": [
            "Nenhum conhecimento prévio",
            "Um computador com internet (o celular serve para assistir às aulas)",
            "Uma conta Microsoft gratuita, para praticar no Excel online",
        ],
        "modulos": [
            {
                "num": 0, "nome": "Conhecendo o Excel",
                "desc": "O primeiro contato: o que é o Excel, como ele organiza os dados, as partes da tela e como salvar o seu trabalho.",
                "aulas": [
                    {"arq": "0-1-o-que-e-o-excel", "js": "c01.js", "num": "0.1", "titulo": "O que é o Excel e para que serve", "min": 7,
                     "desc": "Aula grátis de Excel para iniciantes: o que é o Excel, para que serve e por que ele recalcula sozinho. Com prática interativa no navegador."},
                    {"arq": "0-2-arquivo-e-abas", "js": "c02.js", "num": "0.2", "titulo": "Arquivo e abas", "min": 7,
                     "desc": "Aprenda o que é arquivo (pasta de trabalho) e aba (planilha) no Excel, como criar e renomear abas e usar modelos. Aula grátis e interativa."},
                    {"arq": "0-3-tour-pela-tela", "js": "c03.js", "num": "0.3", "titulo": "Tour pela tela", "min": 7,
                     "desc": "Conheça a tela do Excel: Faixa de Opções, Caixa de Nome, Barra de Fórmulas, grade, abas e barra de status. Aula grátis para iniciantes."},
                    {"arq": "0-4-salvar-abrir-e-formatos", "js": "c04.js", "num": "0.4", "titulo": "Salvar, abrir e formatos", "min": 8,
                     "desc": "Como salvar no Excel online e no instalado (Ctrl+B) e quando usar .xlsx, .csv e .pdf. Aula grátis e interativa de Excel do zero."},
                    {"arq": "mini-projeto", "mini": "mini0.body.html", "num": "Mini projeto", "titulo": "Meu primeiro arquivo", "min": 20,
                     "desc": "Mini projeto do Módulo 0 do curso Excel do Zero: crie seu primeiro arquivo no Excel online, com abas, soma e download."},
                ],
            },
        ],
    },
]

PERGUNTAS = [
    ("Preciso pagar alguma coisa?", "Não. Os cursos do Hub ReDi são gratuitos, sem cadastro e sem pegadinha."),
    ("Preciso ter o Excel instalado?", "Não. As aulas funcionam no navegador, com uma tela que imita o Excel. Para praticar no programa de verdade, usamos o Excel online, que é gratuito com uma conta Microsoft."),
    ("Funciona no celular?", "Sim, as aulas abrem no celular. Para os exercícios em que você digita e arrasta, o computador é mais confortável."),
    ("Meu progresso fica salvo?", "Fica guardado no navegador que você usou. Se trocar de aparelho ou limpar os dados do navegador, as marcações de aulas concluídas recomeçam (o conteúdo continua todo disponível)."),
    ("Como posso ajudar o Hub ReDi?", "Contando para quem precisa aprender e, se puder, com uma doação de qualquer valor pelo Pix, na página Apoie o Hub. A doação é voluntária: o conteúdo continua gratuito para todos."),
    ("Tem certificado?", "Ainda não. Por enquanto o foco é aprender de verdade: cada módulo termina com um mini projeto para você provar a si mesmo que sabe."),
]


def aulas(c):
    return [a for m in c["modulos"] for a in m["aulas"]]


def total_min(c):
    return sum(a["min"] for a in aulas(c))


def cabeca(titulo, desc, caminho, css, extra=""):
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titulo}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{SITE_URL}{caminho}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Hub ReDi de Conhecimentos">
<meta property="og:title" content="{titulo}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{SITE_URL}{caminho}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
{FONTES}
<style>{css}</style>
{extra}</head>
'''


def topo(ativo=""):
    return f'''<header class="topo"><div class="wrap">
  <a class="marca-hub" href="/">{LOGO}<span><b>Hub ReDi</b><small>de Conhecimentos</small></span></a>
  <nav><a href="/#cursos"{' class="on"' if ativo == "cursos" else ""}>Cursos</a><a href="/#como">Como funciona</a><a href="/#sobre">Sobre</a><a class="apoie" href="/apoie">♥ Apoie o Hub</a></nav>
  <a class="btn peq" href="/#cursos">Começar grátis</a>
</div></header>'''


RODAPE = f'''<footer class="rodape"><div class="wrap">
  <div class="cols">
    <div><a class="marca-hub" href="/">{LOGO}<span><b>Hub ReDi</b><small>de Conhecimentos</small></span></a><p>Conhecimento gratuito, em português, para quem está começando do zero.</p></div>
    <div><h4>Cursos</h4>{"".join(f'<a href="/{c["slug"]}/">{c["nome"]}</a>' for c in CURSOS)}</div>
    <div><h4>Hub ReDi</h4><a href="/apoie">Apoie o Hub</a><a href="/#sobre">Sobre</a><a href="/#como">Como funciona</a><a href="/#perguntas">Perguntas frequentes</a></div>
    <div><h4>Legal</h4><a href="/termos">Termos de uso</a><a href="/privacidade">Privacidade</a></div>
  </div>
  <p class="mini">© 2026 Hub ReDi de Conhecimentos · {AVISO_MARCA}</p>
</div></footer>'''


def capa(c):
    # capa ilustrada do curso (SVG próprio, sem logos de terceiros)
    return '''<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="320" height="180" fill="#1d5fbf"/><rect x="0" y="0" width="320" height="180" fill="url(#g)"/><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a74de"/><stop offset="1" stop-color="#123f86"/></linearGradient></defs><g transform="translate(150 28)"><rect width="150" height="124" rx="8" fill="#fff"/><rect width="150" height="18" rx="8" fill="#107c41"/><rect y="10" width="150" height="8" fill="#107c41"/><g stroke="#e2e3e3"><line x1="30" y1="18" x2="30" y2="124"/><line x1="80" y1="18" x2="80" y2="124"/><line x1="0" y1="38" x2="150" y2="38"/><line x1="0" y1="58" x2="150" y2="58"/><line x1="0" y1="78" x2="150" y2="78"/><line x1="0" y1="98" x2="150" y2="98"/></g><rect x="80" y="58" width="70" height="20" fill="none" stroke="#107c41" stroke-width="3"/><g fill="#8fb3e8"><rect x="96" y="104" width="10" height="14"/><rect x="110" y="96" width="10" height="22"/><rect x="124" y="86" width="10" height="32"/></g></g><text x="22" y="78" font-family="Inter,Segoe UI,sans-serif" font-size="30" font-weight="700" fill="#fff">Excel</text><text x="22" y="110" font-family="Inter,Segoe UI,sans-serif" font-size="30" font-weight="700" fill="#f5a524">do Zero</text><text x="22" y="138" font-family="Inter,Segoe UI,sans-serif" font-size="12" fill="#dbe7fb">Hub ReDi</text></svg>'''


def card_curso(c):
    n = len(aulas(c))
    ids = json.dumps([f'{c["slug"]}/{a["arq"]}' for a in aulas(c)])
    return f'''<a class="curso-card" href="/{c["slug"]}/" data-busca="{c["nome"].lower()} {c["resumo"].lower()} {c["tags"]}" data-aulas='{ids}'>
  <div class="capa">{capa(c)}</div>
  <div class="corpo">
    <span class="area">{c["area"]}</span>
    <h3>{c["nome"]}</h3>
    <p>{c["resumo"]}</p>
    <div class="meta"><span>📚 {n} aulas</span><span>⏱️ ~{total_min(c)} min</span><span>🎯 {c["nivel"]}</span></div>
    <div class="prog hide"><div class="pbar"><i></i></div><small></small></div>
    <div class="rodape-card"><span class="gratis">Grátis</span><span class="ir">Começar →</span></div>
  </div>
</a>'''


# script de progresso usado nas páginas do portal (lê o que as aulas gravaram)
JS_PROGRESSO = '''<script>
function lerProgresso(){try{return JSON.parse(localStorage.getItem("hubredi-progresso")||"{}")}catch(e){return {}}}
document.querySelectorAll("[data-aulas]").forEach(function(el){var ids=JSON.parse(el.dataset.aulas),p=lerProgresso(),n=ids.filter(function(i){return p[i]}).length;if(!n)return;var box=el.querySelector(".prog");box.classList.remove("hide");box.querySelector("i").style.width=(100*n/ids.length)+"%";box.querySelector("small").textContent=n+" de "+ids.length+" aulas concluídas";var ir=el.querySelector(".ir");if(ir)ir.textContent=n===ids.length?"Rever →":"Continuar →";if(el.dataset.urls&&n<ids.length){var u=JSON.parse(el.dataset.urls),k=ids.findIndex(function(i){return !p[i]});if(k>=0)ir.href=u[k];}});
document.querySelectorAll("[data-aula]").forEach(function(el){if(lerProgresso()[el.dataset.aula])el.classList.add("feita");});
</script>'''


# =====================================================================
#  PÁGINAS
# =====================================================================
def pagina_portal():
    faq = "".join(f"<details><summary>{q}</summary><p>{r}</p></details>" for q, r in PERGUNTAS)
    faq_ld = json.dumps({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": r}} for q, r in PERGUNTAS]}, ensure_ascii=False)
    org_ld = json.dumps({"@context": "https://schema.org", "@type": "EducationalOrganization", "name": "Hub ReDi de Conhecimentos",
                         "url": SITE_URL + "/", "logo": SITE_URL + "/favicon.svg",
                         "description": "Cursos gratuitos e em português para quem está começando do zero."}, ensure_ascii=False)
    corpo = f'''{topo()}
<main>
  <div class="heroi-fundo"><div class="wrap heroi">
    <h1>Aprenda do zero, <em>de graça</em>, no seu ritmo.</h1>
    <p>Cursos gratuitos e em português para quem está começando. Aulas curtas, prática interativa no próprio navegador e nenhum cadastro.</p>
    <form class="busca" role="search" onsubmit="event.preventDefault();document.getElementById('cursos').scrollIntoView({{behavior:'smooth'}})">
      <input id="q" type="search" placeholder="O que você quer aprender? Ex.: Excel" aria-label="Buscar cursos" autocomplete="off">
      <button class="btn" type="submit">Buscar</button>
    </form>
    <div class="selos"><span>✔ 100% gratuito</span><span>✔ Sem cadastro</span><span>✔ Em português</span><span>✔ Funciona no celular</span></div>
  </div></div>

  <section id="cursos"><div class="wrap">
    <h2>Nossos cursos</h2>
    <p class="sub">Escolha um curso e comece agora. Cada curso novo aparece aqui assim que fica pronto.</p>
    <div class="catalogo" id="catalogo">{"".join(card_curso(c) for c in CURSOS)}</div>
    <p class="vazio hide" id="vazio">Ainda não temos curso sobre isso. Por enquanto, que tal começar pelo <a href="/excel-do-zero/">Excel do Zero</a>?</p>
  </div></section>

  <section id="como"><div class="wrap">
    <h2>Como você aprende aqui</h2>
    <p class="sub">Um método simples, pensado para quem está começando.</p>
    <div class="grade4">
      <div class="card"><div class="ico">⏱️</div><h3>Aulas curtas</h3><p>Cápsulas de 6 a 8 minutos, uma ideia de cada vez. Dá para estudar no intervalo do trabalho.</p></div>
      <div class="card"><div class="ico">🖱️</div><h3>Prática na hora</h3><p>Logo depois da explicação, você mesmo clica e digita numa tela que imita o programa.</p></div>
      <div class="card"><div class="ico">💡</div><h3>Erro que ensina</h3><p>Errou? A correção explica o que aconteceu e dá dicas até você acertar.</p></div>
      <div class="card"><div class="ico">🎯</div><h3>Aprender de verdade</h3><p>Cada módulo termina com um mini projeto no programa real, para você fazer sozinho.</p></div>
    </div>
  </div></section>

  <section id="sobre"><div class="wrap">
    <div class="card sobre">
      <h2>Sobre o Hub ReDi</h2>
      <p>O Hub ReDi de Conhecimentos nasceu com um propósito: <b>democratizar o conhecimento</b>. Acreditamos que aprender uma ferramenta como o Excel pode abrir portas no trabalho e na vida, e que isso não deveria depender de quanto alguém pode pagar. Por isso, os cursos são gratuitos, em português e feitos para quem está começando do zero.</p>
    </div>
  </div></section>

  <section id="apoie"><div class="wrap">
    <div class="card apoie-faixa">
      <div><h2>Conhecimento gratuito também tem custo</h2><p>Cada aula leva horas de preparo, programação, revisão e testes. Se o Hub ReDi te ajudou, considere apoiar com uma doação de qualquer valor. Assim mais gente continua aprendendo de graça.</p></div>
      <a class="btn" href="/apoie">♥ Quero apoiar</a>
    </div>
  </div></section>

  <section id="perguntas"><div class="wrap">
    <h2>Perguntas frequentes</h2>
    <div class="faq">{faq}</div>
  </div></section>
</main>
{RODAPE}
<script type="application/ld+json">{org_ld}</script>
<script type="application/ld+json">{faq_ld}</script>
{JS_PROGRESSO}
<script>
var q=document.getElementById("q");q.addEventListener("input",function(){{var t=q.value.trim().toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g,""),vis=0;document.querySelectorAll(".curso-card").forEach(function(c){{var ok=!t||c.dataset.busca.normalize("NFD").replace(/[\\u0300-\\u036f]/g,"").indexOf(t)>=0;c.classList.toggle("hide",!ok);if(ok)vis++;}});document.getElementById("vazio").classList.toggle("hide",vis>0);}});
</script>'''
    html = cabeca("Hub ReDi de Conhecimentos | Cursos gratuitos para aprender do zero",
                  "Cursos gratuitos, em português, para quem está começando do zero. Aulas curtas e interativas, com prática no próprio navegador. Comece pelo curso Excel do Zero.",
                  "/", SITE_CSS) + "<body>\n" + corpo + "\n</body>\n</html>\n"
    (RAIZ / "index.html").write_text(html, encoding="utf-8")


def pagina_curso(c):
    lista = lambda xs: "".join(f"<li>{x}</li>" for x in xs)
    mods = ""
    for m in c["modulos"]:
        aul = "".join(
            f'<a class="aula" href="/{c["slug"]}/modulo-{m["num"]}/{a["arq"]}" data-aula="{c["slug"]}/{a["arq"]}"><span class="ck"></span><span class="num">{a["num"]}</span><span class="tt">{a["titulo"]}</span><span class="min">{a["min"]} min</span></a>'
            for a in m["aulas"])
        mods += f'''<details class="modulo" open><summary><span><b>Módulo {m["num"]} · {m["nome"]}</b><small>{len(m["aulas"])} aulas · ~{sum(a["min"] for a in m["aulas"])} min</small></span></summary><p class="mdesc">{m["desc"]}</p>{aul}</details>'''
    ids = json.dumps([f'{c["slug"]}/{a["arq"]}' for a in aulas(c)])
    urls = json.dumps([f'/{c["slug"]}/modulo-{m["num"]}/{a["arq"]}' for m in c["modulos"] for a in m["aulas"]])
    primeira = c["modulos"][0]["aulas"][0]
    curso_ld = json.dumps({"@context": "https://schema.org", "@type": "Course", "name": c["nome"], "description": c["resumo"],
                           "inLanguage": "pt-BR", "isAccessibleForFree": True, "educationalLevel": c["nivel"],
                           "url": f'{SITE_URL}/{c["slug"]}/', "provider": {"@type": "EducationalOrganization", "name": "Hub ReDi de Conhecimentos", "url": SITE_URL + "/"}}, ensure_ascii=False)
    corpo = f'''{topo("cursos")}
<main>
  <div class="curso-topo"><div class="wrap">
    <div class="migalha"><a href="/">Hub ReDi</a> › <a href="/#cursos">Cursos</a> › {c["nome"]}</div>
    <div class="curso-heroi">
      <div>
        <span class="area">{c["area"]}</span>
        <h1>{c["h1"]}</h1>
        <p class="lead">{c["resumo"]} Sem cadastro e sem pagar nada.</p>
        <div class="meta claro"><span>📚 {len(aulas(c))} aulas</span><span>⏱️ ~{total_min(c)} min</span><span>🎯 {c["nivel"]}</span><span>🌐 Português</span></div>
      </div>
      <div class="caixa-curso" data-aulas='{ids}' data-urls='{urls}'>
        <div class="capa">{capa(c)}</div>
        <div class="cc-corpo">
          <div class="gratis grande">Grátis</div>
          <div class="prog hide"><div class="pbar"><i></i></div><small></small></div>
          <a class="btn cheio ir" href="/{c["slug"]}/modulo-{c["modulos"][0]["num"]}/{primeira["arq"]}">Começar o curso</a>
          <ul class="inclui"><li>✔ Aulas interativas no navegador</li><li>✔ Exercícios com correção</li><li>✔ Mini projetos no Excel de verdade</li><li>✔ Sem cadastro</li></ul>
          <div class="apoio-cartao"><p><b>Gratuito para todos.</b> Este curso continua aberto graças a quem pode contribuir. Se ele te ajudar, apoie com qualquer valor.</p><a class="btn-apoio" href="/apoie">♥ Apoiar com Pix</a></div>
        </div>
      </div>
    </div>
  </div></div>

  <div class="wrap curso-corpo">
    <section class="card"><h2>O que você vai aprender</h2><ul class="check2">{lista(c["aprender"])}</ul></section>
    <section><h2>Conteúdo do curso</h2><p class="sub">Novos módulos entram aqui assim que ficam prontos.</p>{mods}</section>
    <section class="duas">
      <div class="card"><h2>Para quem é</h2><ul>{lista(c["para_quem"])}</ul></div>
      <div class="card"><h2>Requisitos</h2><ul>{lista(c["requisitos"])}</ul></div>
    </section>
    <section><h2>Como funciona cada aula</h2>
      <div class="fases4">
        <div class="card"><b>1 · Aprenda</b><h3>Veja passo a passo</h3><p>Uma animação mostra cada passo numa tela que imita o Excel, com explicação em texto.</p></div>
        <div class="card"><b>2 · Pratique junto</b><h3>Com a tela te guiando</h3><p>Você clica e digita. Se errar, a tela explica o motivo e dá dicas.</p></div>
        <div class="card"><b>3 · Sozinho</b><h3>Desafio sem ajuda</h3><p>Um problema novo, sem destaque, para você provar que aprendeu.</p></div>
        <div class="card"><b>4 · Resumo</b><h3>O que levar daqui</h3><p>As ideias-chave, os erros comuns, um atalho e como fazer no Excel de verdade.</p></div>
      </div>
    </section>
  </div>
</main>
{RODAPE}
<script type="application/ld+json">{curso_ld}</script>
{JS_PROGRESSO}'''
    html = cabeca(f'Curso de Excel grátis do zero para iniciantes | {c["nome"]} – Hub ReDi',
                  "Curso de Excel gratuito para quem nunca abriu o Excel: aulas curtas em português, exercícios interativos no navegador e mini projetos. Comece pelo Módulo 0.",
                  f'/{c["slug"]}/', SITE_CSS) + "<body>\n" + corpo + "\n</body>\n</html>\n"
    destino = RAIZ / c["slug"] / "index.html"
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_text(html, encoding="utf-8")


NAV_CSS = """
.logo a{color:inherit;text-decoration:none}
.navcap{max-width:1040px;margin:0 auto;padding:0 20px 20px}
.navcap div{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:16px}
.navcap a{color:var(--acc);text-decoration:none;font-weight:600;font-size:14px}
.navcap a:hover{text-decoration:underline}
.navcap a.meio{color:var(--muted);font-weight:500}
.marca{font-size:12px;color:var(--muted);max-width:1040px;margin:0 auto;padding:0 20px 30px}
"""


def paginas_aulas(c):
    src = FONTE / c["fonte"]
    css_cap = (src / "base.css").read_text(encoding="utf-8") + (src / "extra.css").read_text(encoding="utf-8") + NAV_CSS
    css_mini = (src / "base.css").read_text(encoding="utf-8") + (src / "mini.css").read_text(encoding="utf-8") + NAV_CSS
    motor = (src / "motor.js").read_text(encoding="utf-8")
    lista = [(m, a) for m in c["modulos"] for a in m["aulas"]]
    for i, (m, a) in enumerate(lista):
        url = lambda mm, aa: f'/{c["slug"]}/modulo-{mm["num"]}/{aa["arq"]}'
        ant = lista[i - 1] if i > 0 else None
        prox = lista[i + 1] if i + 1 < len(lista) else None
        nav = ('<nav class="navcap"><div>'
               + (f'<a href="{url(*ant)}">◀ {ant[1]["num"]} · {ant[1]["titulo"]}</a>' if ant else "<span></span>")
               + f'<a class="meio" href="/{c["slug"]}/">Conteúdo do curso {c["nome"]}</a>'
               + (f'<a href="{url(*prox)}">{prox[1]["num"]} · {prox[1]["titulo"]} ▶</a>' if prox else f'<a href="/{c["slug"]}/">Voltar ao curso ▶</a>')
               + "</div></nav>")
        rodape = nav + f'\n<p class="marca">Gostou da aula? <a href="/apoie">Apoie o Hub ReDi</a> com uma doação de qualquer valor e ajude a manter o conhecimento gratuito.<br>{AVISO_MARCA}</p>'
        id_js = f'<script>window.CAPSULA_ID = "{c["slug"]}/{a["arq"]}";</script>\n'
        logo = f'<div class="logo"><a href="/{c["slug"]}/">Excel <span>do Zero</span></a></div>'
        if a.get("js"):
            corpo = f'''<header>
  <div class="top">{logo}<div class="crumb">Módulo {m["num"]} · {m["nome"]} › <b>Cápsula {a["num"]}: {a["titulo"]}</b> · ~{a["min"]} min</div></div>
  <div class="fases" id="fases">
    <button class="fase on" data-f="0"><b>1 · Aprenda</b>Veja passo a passo</button>
    <button class="fase" data-f="1"><b>2 · Pratique junto</b>Com a tela te guiando</button>
    <button class="fase" data-f="2"><b>3 · Sozinho</b>Desafio sem ajuda</button>
    <button class="fase" data-f="3"><b>4 · Resumo</b>O que levar daqui</button>
  </div>
</header>
<main id="main"></main>
{rodape}
{id_js}<script>
{motor}
{(src / a["js"]).read_text(encoding="utf-8")}
</script>'''
            titulo, css = f'{a["num"]} · {a["titulo"]} | {c["nome"]} – Hub ReDi', css_cap
        else:
            corpo = (src / a["mini"]).read_text(encoding="utf-8")
            corpo = corpo.replace('<div class="logo">Excel <span>do Zero</span></div>', logo).replace("</main>", "</main>\n" + rodape)
            corpo = id_js + corpo
            titulo, css = f'Mini projeto do Módulo {m["num"]}: {a["titulo"]} | {c["nome"]} – Hub ReDi', css_mini
        html = cabeca(titulo, a["desc"], url(m, a), css) + "<body>\n" + corpo + "\n</body>\n</html>\n"
        destino = RAIZ / c["slug"] / f'modulo-{m["num"]}' / f'{a["arq"]}.html'
        destino.parent.mkdir(parents=True, exist_ok=True)
        destino.write_text(html, encoding="utf-8")


def pagina_simples(arq, titulo, desc, caminho, conteudo):
    largo = " largo" if arq == "apoie.html" else ""
    corpo = f'{topo()}\n<main class="wrap texto{largo}">{conteudo}</main>\n{RODAPE}'
    html = cabeca(titulo, desc, caminho, SITE_CSS) + "<body>\n" + corpo + "\n</body>\n</html>\n"
    (RAIZ / arq).write_text(html, encoding="utf-8")


def paginas_institucionais():
    pagina_simples("privacidade.html", "Privacidade | Hub ReDi de Conhecimentos", "Como o Hub ReDi de Conhecimentos trata os seus dados.", "/privacidade", '''
<h1>Privacidade</h1><p class="sub">Última atualização: novembro de 2026.</p>
<h2>Resumo</h2><p>O Hub ReDi <b>não pede cadastro</b> e <b>não coleta dados pessoais</b> de quem estuda aqui.</p>
<h2>O que fica guardado no seu navegador</h2><p>Para mostrar quais aulas você já concluiu e o progresso dos mini projetos, o site guarda essas marcações no armazenamento local do <b>seu próprio navegador</b>. Essas informações não são enviadas para nós nem para ninguém. Você pode apagá-las a qualquer momento limpando os dados de navegação.</p>
<h2>Serviços de terceiros</h2><p>As páginas carregam fontes de texto do Google Fonts, e o site é hospedado pela Netlify. Como em qualquer site, esses serviços recebem informações técnicas da conexão (como o endereço IP) para entregar os arquivos.</p>
<h2>Doações</h2><p>As doações são feitas por Pix, diretamente no aplicativo do seu banco. O site não processa pagamentos e não recebe nenhum dado bancário seu.</p>
<h2>Mudanças</h2><p>Se um dia o site passar a usar outros serviços (por exemplo, medição de audiência), esta página será atualizada antes.</p>''')
    pagina_simples("termos.html", "Termos de uso | Hub ReDi de Conhecimentos", "Termos de uso do Hub ReDi de Conhecimentos.", "/termos", f'''
<h1>Termos de uso</h1><p class="sub">Última atualização: novembro de 2026.</p>
<h2>Uso gratuito</h2><p>Os cursos do Hub ReDi são gratuitos e podem ser usados livremente para estudo pessoal.</p>
<h2>Conteúdo</h2><p>O conteúdo é produzido com cuidado, mas pode conter erros ou ficar desatualizado conforme os programas mudam. Se encontrar algo errado, avise: a correção ajuda todo mundo.</p>
<h2>Marcas</h2><p>{AVISO_MARCA} As telas dos cursos são simulações criadas para fins educacionais.</p>
<h2>Mudanças</h2><p>Estes termos podem ser atualizados. A data no topo da página indica a versão em vigor.</p>''')
    pagina_simples("apoie.html", "Apoie o Hub ReDi | Doe qualquer valor e mantenha o conhecimento gratuito", "O Hub ReDi oferece cursos gratuitos para quem está começando do zero. Apoie com uma doação de qualquer valor pelo Pix.", "/apoie", f'''
<h1>Apoie o Hub ReDi</h1>
<p class="sub">Conhecimento gratuito para todos, mantido por quem pode contribuir. <a class="so-cel" href="#doar">Ir direto para o Pix ↓</a></p>
<div class="apoie-grade">
  <div>
    <h2>Por que os cursos são gratuitos</h2>
    <p>O Hub ReDi existe para <b>democratizar o conhecimento</b>. Aprender Excel, e outras ferramentas que abrem portas no trabalho, não deveria depender de quanto alguém pode pagar. Por isso não cobramos, não pedimos cadastro e não escondemos conteúdo atrás de pagamento.</p>
    <h2>O que custa manter o Hub</h2>
    <ul class="custos">
      <li><b>Tempo de produção:</b> cada aula de poucos minutos leva muitas horas de planejamento, programação da tela interativa, revisão por quem entende de Excel e testes.</li>
      <li><b>Estrutura:</b> hoje usamos ferramentas e hospedagem em planos gratuitos. Conforme o Hub cresce, entram custos como domínio próprio, planos pagos de hospedagem e ferramentas de produção.</li>
      <li><b>Novos conteúdos:</b> novos módulos, novos cursos e tutoriais em vídeo.</li>
    </ul>
    <h2>Para onde vai a sua doação</h2>
    <p>Para manter o site no ar e produzir mais aulas gratuitas. A doação é <b>voluntária</b>: doando ou não, todo o conteúdo continua aberto para você e para todos.</p>
  </div>
  <div class="card pix" id="doar">
    <h2>Doe qualquer valor pelo Pix</h2>
    <p class="mini">Abra o app do seu banco, escolha <b>Pix › Ler QR Code</b> e aponte a câmera.</p>
    <div class="qr">{PIX_QR}</div>
    <p class="mini">Está no celular? Use o <b>Pix copia e cola</b>:</p>
    <textarea id="pixcod" readonly rows="5" aria-label="Código Pix copia e cola">{PIX_COPIA}</textarea>
    <button class="btn cheio" id="copiar" type="button">Copiar código Pix</button>
    <p class="mini" id="copiado" aria-live="polite"></p>
    <p class="mini">O valor é você quem escolhe. Qualquer quantia ajuda. 💙</p>
  </div>
</div>
<script>
document.getElementById("copiar").onclick=function(){{var t=document.getElementById("pixcod"),ok=function(){{document.getElementById("copiado").textContent="Código copiado! Agora cole no app do seu banco, em Pix › Copia e cola.";}};if(navigator.clipboard&&navigator.clipboard.writeText){{navigator.clipboard.writeText(t.value).then(ok,function(){{t.select();document.execCommand("copy");ok();}});}}else{{t.select();document.execCommand("copy");ok();}}}};
</script>''')
    pagina_simples("404.html", "Página não encontrada | Hub ReDi de Conhecimentos", "Página não encontrada.", "/404", '''
<h1>Ops, essa página não existe.</h1><p class="sub">O endereço pode ter mudado ou ter sido digitado errado.</p><p><a class="btn" href="/">Ir para a página inicial</a> <a class="btn sec" href="/excel-do-zero/">Ver o curso Excel do Zero</a></p>''')


def seo():
    urls = ["/", "/apoie", "/privacidade", "/termos"] + [f'/{c["slug"]}/' for c in CURSOS] + [
        f'/{c["slug"]}/modulo-{m["num"]}/{a["arq"]}' for c in CURSOS for m in c["modulos"] for a in m["aulas"]]
    (RAIZ / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                                       + "".join(f"  <url><loc>{SITE_URL}{u}</loc></url>\n" for u in urls) + "</urlset>\n", encoding="utf-8")
    (RAIZ / "robots.txt").write_text(f"User-agent: *\nAllow: /\nDisallow: /fonte/\nSitemap: {SITE_URL}/sitemap.xml\n", encoding="utf-8")
    (RAIZ / "favicon.svg").write_text(LOGO, encoding="utf-8")


if __name__ == "__main__":
    pagina_portal()
    for c in CURSOS:
        pagina_curso(c)
        paginas_aulas(c)
    paginas_institucionais()
    seo()
    print("Site gerado:", sorted(str(p.relative_to(RAIZ)) for p in RAIZ.rglob("*.html") if "fonte" not in p.parts))
