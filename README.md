# Front End Software Engineer

### Tecnologias utilizadas
> - React | Next.js | Typescript - Para a criação do front-end
> - Css modules - Para a estilização dos componentes
> - Axios - Para a realização de requisições HTTP
> - React Query | Zustand - Para a gerência de estados
> - Lodash - para o uso de debounce (utilizado na renderização)

### Arquitetura
> - A aplicação foi desenvolvida utilizando o padrão de arquitetura Atomic Design, onde os componentes são divididos em átomos, moléculas, organismos e templates.
> - Para a api, foi utilizada a arquitetura de usecases, gateways e contracts.


### Insights técnicos

#### Tree
> - A árvore foi desenvolvida utilizando a recursividade, onde cada nó da árvore é um componente que chama a si mesmo para renderizar os filhos.
> - Para a montagem da arvore, foram feitos dois builders:
>   - builder sem batches - onde a árvore é montada de forma sequencial, sem a utilização de batches
>   - builder com batches - onde a árvore é montada em chunks, utilizando batches de 50 elementos
> - Foi delimitado a quantidade de locations + assets maior que 50 para a utilização do builder com batches.
> - Além disso foi realizado o prefetch dos dados de locations e assets, para que a árvore seja montada de forma mais rápida.

> - Também foi utilizado batches para a renderização dos nós em DOM.


### Pontos de melhoria
- Describe which points of the project you would improve if you had more time.
> - Implementar testes unitários e de integração
> - Implementar virtualização da lista de nós

## Videos

[Video](https://drive.google.com/file/d/1vafRmnbI6WXHpEwAzJUTp84FW3OOKPlb/view?usp=sharing)

### Analytics Report
![LightHouse Report](./public/performance.pdf)
