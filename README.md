# Nova Gestão

Painel de acompanhamento da Automação (Mina do Andrade): Indicadores, Segurança, Corretiva, Conquistas e Dados da Equipe.

## 1. Firebase (uma vez)
1. Console Firebase: criar projeto, adicionar app Web (`</>`) e copiar o `firebaseConfig`.
2. Authentication: ativar **E-mail/senha** e criar os usuários (você e quem for consultar).
3. Firestore Database: criar em modo produção, região `southamerica-east1`.
4. Aba Regras: colar o conteúdo de `firestore.rules` (troque o e-mail pelo seu) e publicar.
5. Configurações do projeto, Contas de serviço: **Gerar nova chave privada** e guardar o JSON fora do repositório.

## 2. Configurar o app
Em `index.html`, no final do arquivo, preencha `FIREBASE_CONFIG` e `EDITORES` (mesmo e-mail das regras).

## 3. Carga das planilhas
Baixe do Drive `RELATÓRIO BENEFICIAMENTO...xlsx` e `Anomalia.xlsx` para a pasta `sync/`.

    pip install -r sync/requirements.txt
    python sync/extrair.py "sync/RELATÓRIO BENEFICIAMENTO.xlsx" "sync/Anomalia.xlsx" sync/dados.json
    python sync/subir_dados.py sync/dados.json caminho/da/chave-servico.json

Repita quando as planilhas mudarem. DSS, conquistas e dados da equipe são digitados no próprio app e não são afetados.

## 4. GitHub Pages
1. Enviar esta pasta para o repositório `nova-gestao` (o `.gitignore` já protege dados e chaves).
2. Settings, Pages, Deploy from a branch, `main`, `/ (root)`.
3. Firebase, Authentication, Settings, Domínios autorizados: adicionar `SEUUSUARIO.github.io`.

Os dados ficam só no Firestore, atrás de login. O GitHub tem apenas o código.
