# Projeto com Gluestack e React Native

## Etapa 1 - Instalação do React Native com Expo + Typescript

```bash
npx create-expo-app@latest --template expo-template-blank-typescript
```

Se estiver executando o comando já dentro da pasta que deseja utilizar basta digitar um . ao invés de um nome do projeto quando solicitado.

Vamos instalar a dependência do Expo Router

```bash
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

Devemos ajustar agora o entry point no package.json para que o Expo Router funcione corretamente.

```json
"main": "expo-router/entry",
```

Vamos adicionar também o scheme no app.json para configurar o deep linking (cuidado com espaços e acentos, lembre-se que isso pode quebrar o projeto)

```json
"expo": {
    "scheme": "nome-do-projeto"
  }
```

## Etapa 2 - Instalação do Gluestack

Agora vamos instalar o Gluestack v2 e fazer os ajustes necessários (no Linux normalmente algumas dessas etapas não são necessárias)

```bash
npx gluestack-ui init
```

No Windows o arquivo metro.config.js pode não ser criado (ou ter sido criado vazio), então crie um arquivo metro.config.js na raiz do projeto com o seguinte conteúdo:

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
	  
const config = getDefaultConfig(__dirname);
	  
module.exports = withNativeWind(config, { input: './global.css' });
```

Esse arquivo é necessário para que o Gluestack funcione corretamente e o CSS seja devidamente processado.

Outro ponto que precisamos ajustar fica no arquivo tailwind.config.js, onde devemos adicionar os caminhos da pasta app e da pasta components para que o TailwindCSS possa processar os arquivos corretamente.

```javascript
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
}
```

O nosso arquivo App.tsx vai deixar de existir, mas um problema que também ocorre apenas no Windows são aspas simples adicionadas incorretamente na importação do global.css e do GluestackUIProvider, então ajuste o arquivo App.tsx para que fique da seguinte forma:

```typescript
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
```

Antes de iniciar o projeto precisamos aplicar também eventuais correções de instalação do Expo com o comando:

```bash
npx expo install --fix
```

Para uma execução limpa do expo é recomendado limpar o cache com o comando:

```bash
npx expo start -c
```

O projeto deve iniciar corretamente e será possível visualizar o conteúdo de App.tsx na tela. Agora vamos ajustar nosso projeto criando a pasta app/

## Etapa 3 - Ajustes iniciais

Vamos criar a pasta app/ e mover o arquivo App.tsx para dentro dela renomeando para index.tsx

Na pasta app vamos criar também um arquivo _layout.tsx que vai funcionar como a base para as demais telas do app

```tsx
import "@/global.css" // Importação do CSS global
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider" // Provider do Gluestack - garante que o Gluestack funcione corretamente em todo o app
import { Slot } from "expo-router" // Importação do Slot do Expo Router - Esse slot será o conteúdo das telas que será inserido no meio do layout

export default function Layout() {
    return (
        <GluestackUIProvider>
            <Slot />
        </GluestackUIProvider>
    )
}
```

Agora vamos ajustar o arquivo index.tsx para que ele utilize o layout criado

```tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

## Etapa 4 - Adicionando todos os componentes do GluestackUI

Para adicionar um componente do GluestackUI ao projeto você pode executar o comando:

```bash
npx gluestack-ui add nome-do-componente
```

Quando não vamos ter conexão com a Internet durante o desenvolvimento uma possível solução é adicionar todos os componentes de uma vez, para isso você pode executar o comando:

```bash
npx gluestack-ui add --all
```

O ideal é que você adicione apenas os componentes que você vai utilizar caso você esteja trabalhando com uma conexão de Internet estável.

O primeiro rebuild deve ser um pouco demorado, mas após isso o projeto deve funcionar normalmente. Para garantir inicie o expo com o comando -c (isso limpa o cache do expo)

```bash
npx expo start -c
```

## Etapa 5 - Outras dependências que vamos utilizar

Vamos instalar o Axios para fazer requisições HTTP

```bash
npx expo install axios
```

Vamos instalar o Firebase também

```bash
npx expo install firebase
```

Vamos deixar algumas dependências para acessar recursos do celular como a câmera, armazenamento, secure store e acelerômetro

```bash
npx expo install expo-camera expo-file-system expo-secure-store expo-sensors
```

Agora todas as dependências necessárias para o projeto estão instaladas e configuradas, você pode começar a desenvolver o seu app com Gluestack e React Native.