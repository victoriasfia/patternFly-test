import React, { useState } from 'react';
import {
  Page,
  PageSection,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Flex,
  Button,
  Title,
  InputGroup,
  InputGroupItem,
  InputGroupText,
  TextInput,
  FormSelect,
  FormSelectOption,
  Grid,
  GridItem,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Form,
  FormGroup,
  EmptyState 
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

// Ícones do PatternFly
import {
  ServerIcon,
  KeyIcon,
  SyncAltIcon,
  SearchIcon,
  FilterIcon,
  UserIcon,
  SortAlphaDownIcon,
  HistoryIcon,
  OutlinedClockIcon,
  PlusIcon
} from '@patternfly/react-icons';

export default function DnsManager() {
  const [apiKey, setApiKey] = useState('');
  const [zonaSelecionada, setZonaSelecionada] = useState('nenhuma');
  const [registros, setRegistros] = useState([]); 
  
  const zonasOptions = [
    { value: 'nenhuma', label: 'Nenhuma zona...' },
    { value: 'meusite.com', label: 'meusite.com' },
  ];

  const tiposOptions = [
    { value: 'A', label: 'A' },
    { value: 'CNAME', label: 'CNAME' },
    { value: 'TXT', label: 'TXT' }
  ];

  return (
    <div style={{ backgroundColor: '#f0f4f7', minHeight: '100vh', padding: '2rem' }}>

      <div style={{ maxWidth: '1200px', margin: '0 auto'}}>
        
        {/* HEADER CARD */}
        <Card className="pf-v5-u-mb-lg" style={{marginBottom: '20px', marginTop: '20px'}}>
          <CardBody>
            <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
              
              <Flex alignItems={{ default: 'alignItemsCenter' }}>
                <Button variant="primary" isSmall className="pf-v5-u-mr-sm" style={{ pointerEvents: 'none' }}>
                  <ServerIcon />
                </Button>
                <Title headingLevel="h1" size="2xl">Gerenciador DNS</Title>
              </Flex>

              <Flex alignItems={{ default: 'alignItemsCenter' }}>
                <div style={{ position: 'relative' }} className="pf-v5-u-mr-md">
                    <span style={{ 
                      position: 'absolute', 
                      left: '10px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: '#8a8d90', 
                      pointerEvents: 'none', 
                      zIndex: 1 
                    }}>
                      <KeyIcon />
                    </span>
                    <TextInput 
                      value={apiKey} 
                      onChange={(_event, value) => setApiKey(value)} 
                      placeholder="API Key..." 
                      style={{ width: '200px',
                        paddingLeft: '30px',
                        fontSize: '0.875rem'
                      }} 
                    />
                </div>
              </Flex>
            </Flex>
          </CardBody>
        </Card>

        {/* MAIN LAYOUT (GRID) */}
        <Grid hasGutter>
          
          {/* COLUNA ESQUERDA (Tabela) */}
          <GridItem span={12} lg={8}>
            <Card style={{ height: '100%' }}>
              
              <Toolbar style={{ borderBottom: '2px solid #d2d2d2', padding: '1rem 1rem' }}>
                <ToolbarContent>
                  <ToolbarItem>
                    <InputGroup>
                      <div style={{ position: 'relative' }}>
                        <span style={{ 
                          position: 'absolute', 
                          left: '10px', 
                          top: '50%', 
                          transform: 'translateY(-50%)',
                          color: '#8a8d90', 
                          pointerEvents: 'none', 
                          zIndex: 1 
                        }}>
                          <SearchIcon />
                        </span>
                      </div>  
                      <InputGroupItem><TextInput placeholder="Buscar nome, IP..." style={{ width: '250px', paddingLeft: '30px' }}/></InputGroupItem>
                    </InputGroup>
                  </ToolbarItem>
                  <ToolbarItem>
                    <InputGroup>
                    <div style={{ position: 'relative' }}>
                    <span style={{ 
                      position: 'absolute', 
                      left: '10px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: '#8a8d90', 
                      pointerEvents: 'none', 
                      zIndex: 1 
                    }}>
                      <FilterIcon />
                    </span>
                  </div>
                      <InputGroupItem>
                        <FormSelect value="todos" style={{ width: '200px', paddingLeft: '30px' }}>
                          <FormSelectOption value="todos" label="Todos os Tipos"/>
                        </FormSelect>
                      </InputGroupItem>
                    </InputGroup>
                  </ToolbarItem>
                  <ToolbarItem>
                    <InputGroup>
                    <div style={{ position: 'relative' }}>
                    <span style={{ 
                      position: 'absolute', 
                      left: '10px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: '#8a8d90', 
                      pointerEvents: 'none', 
                      zIndex: 1
                    }}>
                      <UserIcon />
                    </span>
                  </div>
                      <InputGroupItem>
                        <FormSelect value="todos" style={{ width: '200px', paddingLeft: '30px' }}>
                          <FormSelectOption value="todos" label="Todos os Donos" />
                        </FormSelect>
                      </InputGroupItem>
                    </InputGroup>
                  </ToolbarItem>
                  <ToolbarItem>
                    <Button variant="control"><SortAlphaDownIcon /></Button>
                  </ToolbarItem>
                </ToolbarContent>
              </Toolbar>

              {/* Tabela */}
              <Table aria-label="Tabela de Registros DNS" variant="compact">
                <Thead >
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Tipo</Th>
                    <Th>Valor</Th>
                    <Th>Dono</Th>
                    <Th style={{paddingLeft: '100px'}}>Ação</Th>
                  </Tr>
                </Thead >
                <Tbody style={{ borderTop: '3px solid #d2d2d2', borderBottom: '2px solid #d2d2d2'}}>
                  {registros.length === 0 ? (
                    <Tr>
                      <Td colSpan={5}>
                        <EmptyState
                          titleText="Nenhum registro encontrado."
                          headingLevel="h4"
                        />
                      </Td>
                    </Tr>
                  ) : (
                    registros.map((registro, idx) => (
                      <Tr key={idx}>
                        <Td>{registro.nome}</Td>
                        <Td>{registro.tipo}</Td>
                        <Td>{registro.valor}</Td>
                        <Td>{registro.dono}</Td>
                        <Td><Button variant="link">Editar</Button></Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
              

              <CardFooter style={{ borderTop: '1px solid #d2d2d2', marginTop: 'auto' }}>
                <Flex alignItems={{ default: 'alignItemsCenter' }} style={{ fontSize: '0.875rem', color: '#6a6e73' }}>
                  <span>Mostrando 0 - 0 de 0</span>
                  <span className="pf-v5-u-ml-md pf-v5-u-mr-sm">EXIBIR:</span>
                  <FormSelect value="20" style={{ width: '70px' }}>
                    <FormSelectOption value="20" label="20" />
                  </FormSelect>
                </Flex>
              </CardFooter>
            </Card>
          </GridItem>

          {/* COLUNA DIREITA (Painéis) */}
          <GridItem span={12} lg={4}>
            
            <Card className="pf-v5-u-mb-xl" style={{marginBottom: '20px', marginTop: '20px'}}>
              <CardHeader actions={{ actions: <Button variant="control" isSmall>Limpar</Button> }}>
                <CardTitle>
                  <HistoryIcon className="pf-v5-u-mr-sm" style={{ color: '#06c' }}/> Histórico Recente
                </CardTitle>
              </CardHeader>
              <CardBody className="pf-v5-u-text-align-center pf-v5-u-py-2xl">
                <OutlinedClockIcon size="xl" color="#d2d2d2" className="pf-v5-u-mb-sm" />
                <div style={{ color: '#8a8d90', fontSize: '0.875rem' }}>Nenhuma alteração recente.</div>
              </CardBody>
            </Card>

            <Card style={{marginTop: '20px'}}>
              <CardHeader>
                <CardTitle size="lg">
                  <PlusIcon className="pf-v5-u-mr-sm" style={{ color: '#06c' }}/> Adicionar
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  
                  <FormGroup label="NOME (HOST)" isRequired fieldId="form-nome">
                    <InputGroup>
                      <InputGroupItem isFill><TextInput id="form-nome" placeholder="www" /></InputGroupItem>
                      <InputGroupItem><InputGroupText variant="plain">....</InputGroupText></InputGroupItem>
                    </InputGroup>
                  </FormGroup>

                  <Grid hasGutter>
                    <GridItem span={6}>
                      <FormGroup label="TIPO" isRequired fieldId="form-tipo">
                        <FormSelect id="form-tipo" value="A">
                          {tiposOptions.map((opt, i) => (
                            <FormSelectOption key={i} value={opt.value} label={opt.label} />
                          ))}
                        </FormSelect>
                      </FormGroup>
                    </GridItem>
                    <GridItem span={6}>
                      <FormGroup label="DONO" fieldId="form-dono">
                        <TextInput id="form-dono" placeholder="Equipe..." />
                      </FormGroup>
                    </GridItem>
                  </Grid>

                  <FormGroup label="VALOR (IP/DESTINO)" isRequired fieldId="form-valor">
                    <TextInput id="form-valor" placeholder="192.168.0.1" />
                    <p className="pf-v5-u-font-size-xs pf-v5-u-color-200 pf-v5-u-mt-sm">IPv4 (ex: 1.2.3.4)</p>
                  </FormGroup>

                  <FormGroup className="pf-v5-u-mt-md">
                    <Button variant="primary" isBlock>Salvar Registro</Button>
                  </FormGroup>

                </Form>
              </CardBody>
            </Card>

          </GridItem>
        </Grid>

      </div>
    </div>
  );
}