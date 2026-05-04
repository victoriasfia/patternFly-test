import React from 'react';
// Importação obrigatória do CSS base do PatternFly
import '@patternfly/react-core/dist/styles/base.css'; 

import { 
  Page, 
  PageSection, 
  Content, 
  Button, 
  Alert,
  Backdrop
} from '@patternfly/react-core';

function App() {
  return (
    <Page>
      <PageSection>
        {/* No PatternFly 6, usamos apenas o Content e passamos a tag HTML no 'component' */}
        <Content component="h1">Meu Teste com PatternFly</Content>
        <Content component="p">
          Este é um ambiente de testes para explorar os componentes do design system.
        </Content>
        
        <br />
        
        <Alert 
          variant="info" 
          title="Ambiente configurado!" 
          style={{ marginBottom: '16px' }}
        >
          O PatternFly foi instalado e está rodando com sucesso no React.
        </Alert>

        <Button variant="primary" onClick={() => alert('PatternFly funcionando!')}>
          Clique para testar
        </Button>
        <Button variant="secondary" onClick={() => alert('Botão secundário clicado!')}>
          Teste
        </Button>
        
      </PageSection>
    </Page>
  );
}

export default App;