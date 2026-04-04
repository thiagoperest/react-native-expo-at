# 001: Substituição da thumbnailUrl do JSONPlaceholder pelo Lorem Picsum

## Status

- Aceito

## Contexto

A API JSONPlaceholder, utilizada como fonte de dados de filmes na aplicação, retorna para cada item um campo `thumbnailUrl` apontando para o serviço `via.placeholder.com`. Esse serviço encontra-se indisponível, resultando em imagens quebradas em toda a listagem de filmes. Como o aplicativo depende de imagens para compor o visual dos itens exibidos ao usuário, a ausência dessas imagens compromete a experiência de uso e a aparência da interface.

## Decisão

Vamos substituir a `thumbnailUrl` fornecida pela API pelo serviço público e gratuito Lorem Picsum (`https://picsum.photos`), utilizando o `id` de cada item como parâmetro. A URL seguirá o padrão `https://picsum.photos/seed/{id}/60/60`, garantindo que cada filme sempre exiba a mesma imagem correspondente ao seu id, sem depender de campos retornados pela API.

## Consequências

**Positivas:**
- As imagens passam a ser exibidas corretamente em toda a listagem, restaurando a experiência visual da aplicação.
- O uso do `id` garante consistência: o mesmo filme sempre renderiza a mesma imagem, independente do dispositivo ou sessão.
- O Lorem Picsum é um serviço estável, gratuito e amplamente utilizado para fins de desenvolvimento.

**Negativas:**
- As imagens exibidas não possuem relação semântica com os filmes, sendo apenas ilustrativas. Em um ambiente de produção real, isso seria inadequado.
- A aplicação passa a depender de um serviço externo adicional para exibir imagens. Se o Lorem Picsum ficar indisponível, as imagens voltarão a não carregar.

**Neutras:**
- A mudança é localizada no componente `MovieItem` e no serviço `database.js`, não afetando a lógica de negócio nem a estrutura de dados da aplicação.
