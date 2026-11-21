# Hub ReDi de Conhecimentos

Cursos gratuitos, em português, para quem está começando do zero.

🌐 **Site:** https://hub-redi.netlify.app

## Trilhas

### Excel do Zero
Curso de Excel para quem **nunca abriu o Excel**. Cada aula é uma "cápsula" de 6 a 8 minutos, em quatro partes:

1. **Aprenda:** animação passo a passo numa tela que imita o Excel online.
2. **Pratique junto:** o aluno clica e digita; a correção explica cada erro.
3. **Sozinho:** desafio sem ajuda.
4. **Resumo:** ideias-chave, erros comuns, atalho e ponte para o Excel de verdade.

Disponível: **Módulo 0 · Conhecendo o Excel** (4 cápsulas + mini projeto).

## Como o código funciona

O site é **100% estático** (HTML + CSS + JavaScript, sem servidor e sem banco de dados), publicado na [Netlify](https://www.netlify.com).

```
hub-redi/
├── index.html                  portal: busca, catálogo de cursos, perguntas
├── excel-do-zero/
│   ├── index.html              página do curso (conteúdo e progresso)
│   └── modulo-0/               cápsulas e mini projeto (geradas pelo build)
├── privacidade.html, termos.html, 404.html
├── fonte/                      arquivos-fonte
│   ├── build.py                monta todas as páginas (o catálogo fica na lista CURSOS)
│   ├── site.css, logo.svg      visual do portal
│   └── excel-do-zero/
│       ├── motor.js            a janela simulada do Excel (a mesma em todas as cápsulas)
│       ├── base.css, extra.css visual das cápsulas
│       └── c01.js … c04.js     conteúdo de cada cápsula
├── sitemap.xml, robots.txt     para o Google encontrar as páginas
└── netlify.toml                configuração da Netlify
```

**Progresso sem login:** quando o aluno chega ao Resumo de uma aula (ou conclui um mini projeto), a aula é marcada como concluída no armazenamento local do navegador dele. O portal e a página do curso leem essas marcações para mostrar a barra de progresso. Nenhum dado sai do navegador.

**O motor** (`motor.js`) desenha a janela do Excel e cuida de seleção, digitação, abas, menu Arquivo, barra de status, animações e correção. Cada cápsula só traz o seu conteúdo: os passos da animação, as tarefas e as perguntas.

### Atualizar o site
1. Edite os arquivos em `fonte/`.
2. Rode o build na raiz do repositório:
   ```bash
   python3 fonte/build.py
   ```
3. Faça o commit e o push. A Netlify publica sozinha em menos de um minuto.

## Créditos
Conteúdo e revisão: Geraldo (GeraldoR-Desenv). Desenvolvimento com apoio do Claude (Anthropic).

Excel é marca registrada da Microsoft. Este projeto é independente e não tem vínculo com a Microsoft.
