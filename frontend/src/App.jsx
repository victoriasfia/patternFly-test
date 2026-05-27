import { Fragment, useState, useRef } from 'react';
import {
  Avatar, Brand, Breadcrumb, ToolbarToggleGroup, BreadcrumbItem, Button, Content, Divider, Dropdown, 
  DropdownGroup, DropdownItem, DropdownList, Masthead, MastheadMain, MastheadLogo, MastheadContent, 
  MastheadBrand, Icon, MastheadToggle, MenuToggle, Nav, NavItem, NavList, NotificationBadge, NotificationBadgeVariant,
  Page, PageBreadcrumb, PageGroup, PageSection, PageSidebar, PageSidebarBody, PageToggleButton, SkipToContent, Toolbar, 
  ToolbarContent, ToolbarGroup, ToolbarItem, SearchInput, Select, SelectList, SelectOption, SelectGroup,
  Menu,MenuList,MenuContent, MenuSearch, MenuSearchInput, MenuContainer,Form, FormGroup, TextInput, Grid, GridItem,
   HelperText, HelperTextItem, FormHelperText, Modal, ModalVariant, FormSelect,
   TextArea,FormSelectOption, Checkbox, ActionGroup
} from '@patternfly/react-core';
import { createRoot } from "react-dom/client";
import { Table, Thead, Tr, Th, Tbody, Td, ActionsColumn } from '@patternfly/react-table';
import PlusCircleIcon from '@patternfly/react-icons/dist/esm/icons/plus-circle-icon';
import "@patternfly/react-core/dist/styles/base.css";
import CogIcon from '@patternfly/react-icons/dist/esm/icons/cog-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import SortAmountDownIcon from '@patternfly/react-icons/dist/esm/icons/sort-amount-down-icon';
import imgAvatar from '@patternfly/react-core/src/components/assets/avatarImg.svg';
import pfLogo from '@patternfly/react-core/src/demos/assets/PF-HorizontalLogo-Color.svg';

export default function App() {
  const [activeItem, setActiveItem] = useState(1);
  
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(undefined);
  const menuRef = useRef(undefined);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState(false);
  const [isFullKebabDropdownOpen, setIsFullKebabDropdownOpen] = useState(false);
  
  const [inputValue, setInputValue] = useState('');
  const [statusIsExpanded, setStatusIsExpanded] = useState(false);
  const [statusSelected, setStatusSelected] = useState('');
  const [riskIsExpanded, setRiskIsExpanded] = useState(false);
  const [riskSelected, setRiskSelected] = useState('');

  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [activeSortDirection, setActiveSortDirection] = useState(null);

  const [resultsCount, setResultsCount] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originalRecord, setOriginalRecord] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [owner, setOwner] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    value: '',
    owner: ''
  });
  
  
  const typeOptions = [{
    value: 'A',
    label: 'A',
    disabled: false
  }, {
    value: 'CNAME',
    label: 'CNAME',
    disabled: false
  }, {
    value: 'NS',
    label: 'NS',
    disabled: false
  }, {
    value: 'AAAA',
    label: 'AAAA',
    disabled: false
  }, {
    value: 'TXT',
    label: 'TXT',
    disabled: false
  }, {
    value: 'SOA',
    label: 'SOA',
    disabled: false
  }, 
  ];
  const riskOptions = ['Equipe teste', 'Equipe Infra', 'Equipe Dev', 'Equipe banco de dados'];
  
  const columnNames = {
    name: 'Nome',
    type: 'Tipo',
    value: 'Valor',
    owner: 'Owner',
  };

  const [repositories, setRepositories] = useState([
    { name: 'google.teste.es.gov.br.', type: 'CNAME', value: 'google.com', owner: 'Equipe Infra'},
    { name: 'shopp.teste.es.gov.br.', type: 'CNAME', value: 'marketplace', owner: 'equipe teste'},
    { name: 'painel.novaredes.teste.es.gov.br.', type: 'CNAME',  value: 'portal.novaredes.com.', owner: 'equipe teste'},
    { name: 'backup.datacenterx.teste.es.gov.br.', type: 'NS', value: 'ns2.database.com.', owner: 'Equipe banco de dados'},
    { name: 'filmestv.teste.es.gov.br.', type: 'A', value: '192.168.1.10', owner: 'Equipe Dev'},
    { name: 'portal.teste.es.gov.br.', type: 'A', value: '192.168.10.5', owner: 'Equipe Web'},
    { name: 'api.teste.es.gov.br.', type: 'A', value: '10.1.0.25', owner: 'Equipe Backend'},
    { name: 'login.teste.es.gov.br.', type: 'CNAME', value: 'auth.securelogin.net.', owner: 'Equipe Segurança'},
    { name: 'cloudbackup.teste.es.gov.br.', type: 'NS', value: 'ns1.cloudstorage.com.', owner: 'Equipe Infra'},
    { name: 'monitor.teste.es.gov.br.', type: 'A', value: '172.16.5.80', owner: 'Equipe NOC'},
    { name: 'chatinterno.teste.es.gov.br.', type: 'CNAME', value: 'teams.communicationhub.io.', owner: 'Equipe Comunicação'},
    { name: 'homolog.teste.es.gov.br.', type: 'A', value: '192.168.50.12', owner: 'Equipe QA'},
    { name: 'arquivos.teste.es.gov.br.', type: 'A', value: '10.10.10.10', owner: 'Equipe Storage'},
    { name: 'centralajuda.teste.es.gov.br.', type: 'CNAME', value: 'suporte.helpdesk.com.',owner: 'Equipe Suporte'},
    { name: 'dnssec.teste.es.gov.br.',type: 'NS',  value: 'ns2.securedns.net.', owner: 'Equipe Redes'}
  ]);




  const handleNameChange = (_event, name) => {
    setName(name);
  };
  const handleTypeChange = (_event, type) => {
    setType(type);
  };
  const handleValueChange = (_event, value) => {
    setValue(value);
  };
  const handleOwnerChange = (_event, owner) => {
    setOwner(owner);
  };

  const onStatusToggle = () => setStatusIsExpanded(!statusIsExpanded);
  const onStatusSelect = (_event, selection) => {
    setStatusSelected(selection);
    setStatusIsExpanded(false);
  };


  const onSelect = (_event, result) => {
    setActiveGroup(result.groupId);
    setActiveItem(result.itemId);
  };

  const onToggle = (_event, result) => {
    console.log(`Group ${result.groupId} expanded? ${result.isExpanded}`);
  };


  const onItemClick = (_event, itemId, _groupId) => {
    console.log(`Custom click handler on ${itemId}`);
  };

  const onInputChange = newValue => setInputValue(newValue);
  const onNavSelect = (_event, selectedItem) => {
    typeof selectedItem.itemId === 'number' && setActiveItem(selectedItem.itemId);
  };

  const onDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);
  const onDropdownSelect = () => setIsDropdownOpen(false);
  const onKebabDropdownToggle = () => setIsKebabDropdownOpen(!isKebabDropdownOpen);
  const onKebabDropdownSelect = () => setIsKebabDropdownOpen(false);
  const onFullKebabDropdownToggle = () => setIsFullKebabDropdownOpen(!isFullKebabDropdownOpen);
  const onFullKebabDropdownSelect = () => setIsFullKebabDropdownOpen(false);

  const onChange = (newValue) => {
    setValue(newValue);
    setResultsCount(newValue.length);
  };
  const onClear = () => {
    setValue('');
    setResultsCount(0);
  };

  const getSortableRowValues = repo => {
    const {name, type, value, owner} = repo;
    return [name, type, value, owner];
  };

  let filteredRepositories = repositories;

  if (value) {
    const lowerCaseSearch = value.toLowerCase();
    
    filteredRepositories = repositories.filter(repo => {
      
      const nameMatch = repo.name?.toLowerCase().includes(lowerCaseSearch);
      const typeMatch = repo.type?.toLowerCase().includes(lowerCaseSearch);
      const valueMatch = String(repo.value || '').toLowerCase().includes(lowerCaseSearch);
      
      return nameMatch || typeMatch || valueMatch;
    });
  }


  let sortedRepositories = [...filteredRepositories];

  if (activeSortIndex !== null) {
    sortedRepositories.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (activeSortDirection === 'asc') return aValue - bValue;
        return bValue - aValue;
      } else {
        // tratamento de string
        const strA = String(aValue || '');
        const strB = String(bValue || '');
        
        if (activeSortDirection === 'asc') return strA.localeCompare(strB);
        return strB.localeCompare(strA);
      }
    });
  }

  const getSortParams = columnIndex => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex
  });

  {/* itens do dropdown do kebab menu */}
  const kebabDropdownItems = (
    <>
      <DropdownItem><CogIcon/> Settings</DropdownItem>
      <DropdownItem><HelpIcon/> Help</DropdownItem>
    </>
  );
  
  {/* itens do dropdown do avatar do usuário */}
  const userDropdownItems = (
    <>
      <DropdownItem key="group 2 profile">Meu Perfil</DropdownItem>
      <DropdownItem key="group 2 user">Gerenciamento de Usuário</DropdownItem>
      <DropdownItem key="group 2 logout">Sair</DropdownItem>
    </>
  );

  {/* ações para cada registro da tabela */}
  const recordsActions = (repo) => [
    {
      title: 'Editar', 
      onClick: () => handleToggleModalEdit(repo)
    },
    {
      title: 'Clonar',
      onClick: () => handleToggleModalClone(repo)
    },
    {
      isSeparator: true // separar delete dos outros itens 
    },
    {
      title: 'Deletar',
      onClick: () => setRepositories(prev => prev.filter(item => item !== repo)),      
      isDanger: true
    }
  ];


  {/* menu para escolher a zona */}
  const menuListItemsText = [
    "teste.com.es.gov.br.",
    "corporativo.exemplo.gov.br.",
    "servicos.digital.gov.br."
  ];

  const handleTextInputChange = (value) => {
    if (!isOpen) {
      setIsOpen(true);
    }
    setInput(value);
  };

  const menuListItems = menuListItemsText
    .filter(
      (item) =>
        !input || item.toLowerCase().includes(input.toString().toLowerCase())
    )
    .map((currentValue, index) => (
      <SelectOption key={currentValue} itemId={index}>
        {currentValue}
      </SelectOption>
    ));
  if (input && menuListItems.length === 0) {
    menuListItems.push(
      <SelectOption isDisabled key="no result">
        Zona não encontrada
      </SelectOption>
    );
  }
  const toggle = (
    <MenuToggle 
      ref={toggleRef}
      onClick={() => setIsOpen(!isOpen)}
      isExpanded={isOpen}
      style={{width: '200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}
    >
      {isOpen ? "Zonas" : "Zonas"}
    </MenuToggle>
  );

  const headerToolbar = (
    <Toolbar id="toolbar" isStatic>
      <ToolbarContent>
        <ToolbarGroup variant="action-group-plain" align={{ default: 'alignEnd' }} gap={{ default: 'gapNone', md: 'gapMd' }}>
          <ToolbarGroup variant="action-group-plain" visibility={{ default: 'hidden', lg: 'visible' }}>
          </ToolbarGroup>
          <ToolbarItem visibility={{ default: 'hidden', md: 'visible', lg: 'hidden' }}>
            <Dropdown isOpen={isKebabDropdownOpen} onSelect={onKebabDropdownSelect} onOpenChange={isOpen => setIsKebabDropdownOpen(isOpen)} popperProps={{ position: 'right' }} 
            toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={onKebabDropdownToggle} isExpanded={isKebabDropdownOpen} 
            variant="plain" aria-label="Settings and help" icon={<EllipsisVIcon />} />}>
              <DropdownList>{kebabDropdownItems}</DropdownList>
            </Dropdown>
          </ToolbarItem>
          <ToolbarItem visibility={{ md: 'hidden' }}>
            <Dropdown isOpen={isFullKebabDropdownOpen} onSelect={onFullKebabDropdownSelect} onOpenChange={isOpen => setIsFullKebabDropdownOpen(isOpen)} 
            popperProps={{ position: 'right' }} toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={onFullKebabDropdownToggle} isExpanded={isFullKebabDropdownOpen} 
            variant="plain" aria-label="Toolbar menu" icon={<EllipsisVIcon />} />}>
              <DropdownGroup key="group 2" aria-label="User actions">
                <DropdownList>{userDropdownItems}</DropdownList>
              </DropdownGroup>
              <Divider />
              <DropdownList>{kebabDropdownItems}</DropdownList>
            </Dropdown>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarItem visibility={{ default: 'hidden', md: 'visible' }}>
          <Dropdown isOpen={isDropdownOpen} onSelect={onDropdownSelect} onOpenChange={isOpen => setIsDropdownOpen(isOpen)} popperProps={{ position: 'right' }} 
          toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={onDropdownToggle} isExpanded={isDropdownOpen} icon={<Avatar src={imgAvatar} alt="" size="sm" />}>
                Usuário
              </MenuToggle>}>
            <DropdownList>{userDropdownItems}</DropdownList>
          </Dropdown>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton isHamburgerButton aria-label="Global navigation" />
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo>
            <Brand src={pfLogo} alt="PatternFly" heights={{ default: '36px' }} />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );

  const pageNav = (
      <Nav onSelect={onNavSelect}>
      <NavList>
        <NavItem itemId={0} isActive={activeItem === 0} to="#dns-panel">
          Registros DNS
        </NavItem>
        <NavItem itemId={1} isActive={activeItem === 1} to="#policy">
          Opção 2
        </NavItem>
      </NavList>
    </Nav>
  );

  const sidebar = (
    <PageSidebar>
      <PageSidebarBody>{pageNav}</PageSidebarBody>
    </PageSidebar>
  );

  const mainContainerId = 'main-content';
  const pageSkipToContent = (
    <SkipToContent onClick={event => {
      event.preventDefault();
      document.getElementById(mainContainerId)?.focus();
    }} href={`#${mainContainerId}`}>
      Skip to content
    </SkipToContent>
  );

   const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (_event, value) => {
    const fieldName = _event.target.name;
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };


  const handleToggleModalEdit = (repo) => {
    setFormData({ ...repo });     
    setIsEditMode(true);     
    setOriginalRecord(repo); 
    setIsModalOpen(true);    
  };

  const handleToggleModalClone = (repo) => {
    setFormData({ ...repo, name: `${repo.name} - Clone` });      
    setIsEditMode(false);   
    setOriginalRecord(null); 
    setIsModalOpen(true);   
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEditMode) {
      setRepositories(prevRepos => prevRepos.map(item => 
        item === originalRecord ? formData : item
      ));
    } else {
      setRepositories(prevRepos => [formData, ...prevRepos]);
    }

    setFormData({ name: '', type: '', value: '', owner: '' });
    setIsEditMode(false);
    setIsModalOpen(false);
    setOriginalRecord(null);
  };

  const toggleGroupItems = (
    <Fragment>
      {/* Input de Busca */}
      <ToolbarItem>
        <SearchInput aria-label="Match with result count" 
        placeholder="Buscar por nome, tipo ou valor..." 
        value={value} onChange={(_event, value) => onChange(value)} onClear={onClear} resultsCount={value ? filteredRepositories.length : undefined}
        style={{width: '450px' }} />
      </ToolbarItem>

      {/* Botão de Ordenação (Sort) Movido para a Toolbar principal */}
      <ToolbarItem>
        <Select isOpen={isSortDropdownOpen} selected={[activeSortDirection, activeSortIndex]} onOpenChange={isOpen => 
        setIsSortDropdownOpen(isOpen)} onSelect={(event, value) => {
          if (value === 'asc' || value === 'desc') {
            setActiveSortDirection(value);
          } else {
            setActiveSortIndex(value);
            setActiveSortDirection(activeSortDirection !== null ? activeSortDirection : 'asc');
          }
        }} toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)} isExpanded={isSortDropdownOpen} variant="plain" 
        aria-label="Sort columns" icon={<SortAmountDownIcon />} />}>
          <SelectGroup label="Ordenar por">
            <SelectList>
              {Object.values(columnNames).map((column, columnIndex) => (
                <SelectOption key={column} value={columnIndex} isSelected={activeSortIndex === columnIndex}>
                  {column}
                </SelectOption>
              ))}
            </SelectList>
          </SelectGroup>
          <SelectGroup label="Ordenação">
            <SelectList>
              <SelectOption isSelected={activeSortDirection === 'asc'} value="asc" key="ascending">Crescente</SelectOption>
              <SelectOption isSelected={activeSortDirection === 'desc'} value="desc" key="descending">Decrescente</SelectOption>
            </SelectList>
          </SelectGroup>
        </Select>
      </ToolbarItem>
      <Fragment>
      <Button 
        variant="primary" 
        onClick={handleToggleModal}
        style={{ marginLeft: '1000px' }} 
      >
        Criar Novo Registro
      </Button>

        <Modal
        title={isEditMode ? "Editar Registro DNS" : "Criar Novo Registro DNS"}
          variant={ModalVariant.small}
          isOpen={isModalOpen}>
            
          <Form style={{ margin: '30px' }}>
          <Grid hasGutter md={6}>
            <GridItem span={12}>

              <FormGroup label="Nome (host)" isRequired fieldId="grid-name-dns">
                <TextInput isRequired 
                type="text" 
                id="grid-name-dns" 
                name="name" 
                aria-describedby="grid-name-dns-helper" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Ex: exemplo.com"/>
              </FormGroup>
            </GridItem>

            <FormGroup label="Tipo" isRequired fieldId="grid-type-dns">
              <FormSelect 
              value={typeOptions} 
              onChange={handleInputChange} 
              id="horizontal-form-title" 
              name="type" 
              aria-label="Your title">
                {typeOptions.map((option, index) => 
                <FormSelectOption 
                isDisabled={option.disabled} 
                key={index} 
                value={option.value} 
                label={option.label} 
                />)}
              </FormSelect>
            </FormGroup>

            <FormGroup label="Owner" fieldId="grid-owner-dns">
              <TextInput type="text" 
              id="grid-owner-dns" 
              name="owner" 
              value={formData.owner} 
              onChange={handleInputChange} 
              placeholder="Ex: Equipe dev"/>
          </FormGroup>
          </Grid>

          <FormGroup label="Valor (IP/Destino)" isRequired fieldId="grid-value-dns">
              <TextInput isRequired 
              type="text" 
              id="grid-value-dns" 
              name="value" 
              value={formData.value} 
              onChange={handleInputChange} 
              placeholder="Ex: 192.168.1.1"/>
          </FormGroup>

          <ActionGroup style={{margin: '10px auto', display: 'flex' }}>
            <Button key="confirm" variant="primary" onClick={handleSubmit}>
                Salvar Registro
              </Button>
              <Button key="cancel" variant="link" onClick={handleToggleModal}>
                Cancelar
              </Button>
          </ActionGroup>
          
        </Form>
      </Modal>
    </Fragment>
    </Fragment>
  );

  const searchToolbar = (
    <Toolbar id="toolbar-component-managed-toggle-groups" className="pf-m-toggle-group-container">
      <ToolbarContent>
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
          {toggleGroupItems}
        </ToolbarToggleGroup>
      </ToolbarContent>
    </Toolbar>
  );


  {/*menu para escolher a zona*/}
  const menu = (
    <Menu
    
      ref={menuRef}
      onSelect={onSelect}
      activeItemId={activeItem}
      isScrollable
    >
      <MenuSearch
      >
        <MenuSearchInput
        >
          <SearchInput
            placeholder="Selecione a Zona..."
            value={input}
            aria-label="Filter menu items"
            onChange={(_event, value) => handleTextInputChange(value)}
            onClear={(event) => {
              event.stopPropagation();
              handleTextInputChange("");
            }}
          />
        </MenuSearchInput>
      </MenuSearch>
      <Divider />
      <MenuContent maxMenuHeight="200px">
        <MenuList>{menuListItems}</MenuList>
      </MenuContent>
    </Menu>
  );

  return (
    
    <Page masthead={masthead} sidebar={sidebar} isManagedSidebar skipToContent={pageSkipToContent} mainContainerId={mainContainerId}>
      {/* Título da Página */}
      <PageGroup stickyOnBreakpoint={{ default: 'top' }}>
        <PageSection isWidthLimited aria-labelledby="main-title">
          <Content>
            <h1 id="main-title">Gerenciador DNS</h1>
            <p>Gerencie os registros DNS de sua infraestrutura.</p>
            <MenuContainer
              menu={menu}
              menuRef={menuRef}
              toggle={toggle}
              toggleRef={toggleRef}
              isOpen={isOpen}
              onOpenChange={(isOpen) => setIsOpen(isOpen)}
              onOpenChangeKeys={["Escape"]}
            />
          </Content>
        </PageSection>
      </PageGroup>
      
      {/* Toolbar Unificada e Tabela */}
      <PageSection variant="light">
        {/* Renderiza a Barra de Ferramentas (Busca, Filtro, Ordem) */}
        {searchToolbar}
        
        {/* Renderiza a Tabela */}
        <Table aria-label="Sortable table custom toolbar">
          <Thead>
            <Tr>
              <Th sort={getSortParams(0)}>{columnNames.name}</Th>
              <Th sort={getSortParams(1)}>{columnNames.type}</Th>
              <Th sort={getSortParams(2)} info={{ tooltip: 'More information' }}>{columnNames.value}</Th>
              <Th sort={getSortParams(3)}>{columnNames.owner}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedRepositories.map((repo, rowIndex) => (
              <Tr key={rowIndex}>
                <Td dataLabel={columnNames.name}>{repo.name}</Td>
                <Td dataLabel={columnNames.type}>{repo.type}</Td>
                <Td dataLabel={columnNames.value}>{repo.value}</Td>
                <Td dataLabel={columnNames.owner}>{repo.owner}</Td>
                <Td class="pf-m-action" isActionCell>
                  <ActionsColumn 
                    items={recordsActions(repo)} 
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </PageSection>
    </Page>
  );
}