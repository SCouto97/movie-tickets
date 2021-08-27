# MovieTickets

Projeto criado como uma abordagem para solucionar o [desafio](https://github.com/wizsolucoes/front-testes/blob/master/Case-tecnico-Frot-end-I-e-2.md) da Wiz Soluções. Este projeto utiliza o Angular versão 12.2.2.

## Pré requisitos

Para executar este projeto, é necessário [gerar uma chave para a API do MovieDB](https://developers.themoviedb.org/3/getting-started/introduction). Após isso, cole sua chave em `src\app\services\config\moviedb-config-sample.ts` e renomeie o arquivo para `moviedb-config.ts`.
## Build

Utilizar o comando `npm install` para instalar as dependências do projeto.

## Execução do programa

Utilizar o comando `ng serve` para subir o servidor de desenvolvimento. A aplicação se encontrará em `http://localhost:4200/`.

## Testes

Utilizar o comando `ng test` para executar suítes de teste do Karma.

## Detalhes da implementação

- Ao digitar o CEP, apertar enter ou tab para preenchimento automático. 
- Escolher o filme ao final de digitar os formulários.
- Preço do acompanhante não está sendo acrescido dinamicamente.

## Pontos de melhoria

De forma geral, o layout pode ser melhorado (e muito). Por conta da restrição de tempo, buscou-se fazer um layout que fosse simples, porém atendesse aos requisitos. Seria interessante também extrair mais componentes, pois o componente home se encontra inchado no momento, com coisas teoricamente não deveriam ser de sua responsabilidade. E mais testes! Testar sempre é necessário.
