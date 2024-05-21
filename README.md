# Guarda-Meu-Lanche (Versão Beta 1.0.0)

O **Guarda-Meu-Lanche** é um aplicativo de venda e gestão de lanches desenvolvido para alunos e lojistas do SENAC. Nosso foco é a diminuição de filas e o melhor aproveitamento do intervalo dos alunos, além de reduzir o desperdício de alimentos pelas lanchonetes do SENAC.

## Funcionalidades

- **Gestão de Filas**: Reduza o tempo de espera pedindo seu lanche antecipadamente.
- **Aproveitamento do Intervalo**: Mais tempo para relaxar e menos tempo na fila.
- **Redução de Desperdício**: As lanchonetes podem gerenciar melhor seus estoques e produção.
- **Cadastro e Login**: Crie sua conta e faça login facilmente.
- **Administração de Produtos**: Lojistas podem adicionar e gerenciar produtos.

## Telas

- **Tela Login**:
<img height=600 src="https://cdn.discordapp.com/attachments/1078462922617016463/1242624316995010682/Screenshot_20240521_204223_Figma.jpg?ex=664e8394&is=664d3214&hm=a052fcf58c1bbf3b92b3d6f1ca42231dc3d7bbffb4e9e2bfff4f37d2ef4cb0f1&" alt="Texto Alternativo">


- **Tela Inicials**:
<img  height=600 src="https://cdn.discordapp.com/attachments/1078462922617016463/1242624317410508960/Screenshot_20240521_204216_Figma.jpg?ex=664e8394&is=664d3214&hm=93c34de2f57ef1002cfc2c48227fb46d656b63fa9ea4a1d845c50991d4df27fc&" alt="Texto Alternativo">


## Como Usar

1. **Instalação**:
   - Clone este repositório:

     ```bash
     git clone https://github.com/Masterbarreto/Guarda-Meu-Lanche.git
     ```

   - Instale as dependências:

     ```bash
     cd Guarda-Meu-Lanche
     npm install
     ```

2. **Inicie o Servidor Expo**:
   - Execute o aplicativo no Expo:

     ```bash
     expo start
     ```

3. **API**:
   - Acesse a API para cadastro, login e gerenciamento de produtos.
   - Documentação detalhada da API está disponível em [API Documentation](https://guardameulanche-api.com/docs).

## Bibliotecas Utilizadas

- `@hookform/resolvers`: Para validação de formulários.
- `@react-native-community/masked-view`: Para máscaras em campos de texto.
- `@react-native-picker/picker`: Para seleção de itens em listas.
- `@react-navigation/bottom-tabs` e `@react-navigation/native`: Para navegação entre telas.
- `expo`: Plataforma para desenvolvimento de aplicativos móveis.
- `final-form`: Para gerenciamento de formulários.
- `react-final-form` e `react-hook-form`: Para criação de formulários.
- `react-native-elements`: Componentes UI personalizáveis.
- `react-native-fbsdk`: Para integração com o Facebook.
- `react-native-paper`: Para componentes de interface.
- `react-router-native`: Para roteamento entre telas.
- `yup`: Para validação de esquemas.

## Contribuição

Contribuições são bem-vindas! Se você deseja melhorar o aplicativo, siga estas etapas:

1. Crie um fork deste repositório.
2. Crie uma branch para sua nova funcionalidade ou correção de bug.
3. Faça suas alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
