import { Fragment, useState, useRef } from 'react';
import {
  Avatar, Brand, Breadcrumb, ToolbarToggleGroup, BreadcrumbItem, Button, Content, Divider, Dropdown, 
  DropdownGroup, DropdownItem, DropdownList, Masthead, MastheadMain, MastheadLogo, MastheadContent, 
  MastheadBrand, Icon, MastheadToggle, MenuToggle, Nav, NavExpandable, NavItem, NavList, NotificationBadge, NotificationBadgeVariant,
  Page, PageBreadcrumb, PageGroup, PageSection, PageSidebar, PageSidebarBody, PageToggleButton, SkipToContent, Toolbar, 
  ToolbarContent, ToolbarGroup, ToolbarItem, SearchInput, Select, SelectList, SelectOption, SelectGroup,
  Menu,MenuList,MenuContent, MenuSearch, MenuSearchInput, MenuContainer
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
  const [activeGroup, setActiveGroup] = useState('nav-group-1');
  const [activeItem, setActiveItem] = useState('nav-group-1_item-1');
  
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

  const [value, setValue] = useState('');
  const [resultsCount, setResultsCount] = useState(0);
  
  
  const statusOptions = ['A', 'CNAME', 'NS', 'AAAA', 'TXT', 'SRV', 'PTR', 'SOA'];
  const riskOptions = ['Equipe teste', 'Equipe Infra', 'Equipe Dev', 'Equipe banco de dados'];
  
  const columnNames = {
    name: 'Nome',
    type: 'Tipo',
    value: 'Valor',
    owner: 'Owner',
  };

  const repositories = [
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
  ];

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

  const onChange = value => {
    setValue(value);
    setResultsCount(3);
  };
  const onClear = () => {
    setValue('');
    setResultsCount(0);
  };

  const getSortableRowValues = repo => {
    const {name, type, value, owner} = repo;
    return [name, type, value, owner];
  };

  let sortedRepositories = repositories;
  if (activeSortIndex !== null) {
    sortedRepositories = repositories.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      if (typeof aValue === 'number') {
        if (activeSortDirection === 'asc') return aValue - bValue;
        return bValue - aValue;
      } else {
        if (activeSortDirection === 'asc') return aValue.localeCompare(bValue);
        return bValue.localeCompare(aValue);
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
      onClick: () => console.log('Editando:', repo.name)
    },
    {
      title: 'Clonar',
      onClick: () => console.log('Clonando:', repo.name)
    },
    {
      isSeparator: true // separar delete dos outros itens 
    },
    {
      title: 'Deletar',
      onClick: () => console.log('Deletando:', repo.name),
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
      <Nav onSelect={onSelect} onToggle={onToggle} aria-label="Expandable global">
      <NavList>
        <NavExpandable title="DNS - Zonas" groupId="nav-group-1" isActive={activeGroup === 'nav-group-1'} isExpanded>
          <NavItem preventDefault id="expandable-1" to="#expandable-1" groupId="nav-group-1"
           itemId="nav-group-1_item-1" isActive={activeItem === 'nav-group-1_item-1'}>
            teste.com.es.gov.br.
          </NavItem>
          <NavItem preventDefault id="expandable-2" to="#expandable-2" groupId="nav-group-1" 
          itemId="nav-group-1_item-2" isActive={activeItem === 'nav-group-1_item-2'}>
            corporativo.exemplo.gov.br.
          </NavItem>
          <NavItem preventDefault id="expandable-3" to="#expandable-3" groupId="nav-group-1" 
          itemId="nav-group-1_item-3" isActive={activeItem === 'nav-group-1_item-3'}>
            servicos.digital.gov.br.
          </NavItem>
        </NavExpandable>

        <NavExpandable title="Dashboard - EX2" groupId="nav-group-2" isActive={activeGroup === 'nav-group-2'} isExpanded>
          <NavItem preventDefault onClick={onItemClick} id="expandable-custom-click" to="#expandable-custom-click" groupId="nav-group-2" 
          itemId="nav-group-2_custom-click" isActive={activeItem === 'nav-group-2_custom-click'}>
            Custom onClick Link
          </NavItem>
          <NavItem preventDefault id="expandable-4" to="#expandable-4" groupId="nav-group-2" 
          itemId="nav-group-2_item-1" isActive={activeItem === 'nav-group-2_item-1'}>
            Subnav 2 Link 1
          </NavItem>
          <NavItem preventDefault id="expandable-5" to="#expandable-5" groupId="nav-group-2" 
          itemId="nav-group-2_item-2" isActive={activeItem === 'nav-group-2_item-2'}>
            Subnav 2 Link 2
          </NavItem>
          <NavItem preventDefault id="expandable-6" to="#expandable-6" groupId="nav-group-2" 
          itemId="nav-group-2_item-3" isActive={activeItem === 'nav-group-2_item-3'}>
            Subnav 2 Link 3
          </NavItem>
        </NavExpandable>
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

  const toggleGroupItems = (
    <Fragment>
      {/* Input de Busca */}
      <ToolbarItem>
        <SearchInput aria-label="Match with result count" placeholder="Buscar por nome, tipo ou valor..." 
        value={value} onChange={(_event, value) => onChange(value)} onClear={onClear} resultsCount={resultsCount}
        style={{width: '450px' }} />
      </ToolbarItem>

      {/* Botão de Ordenação (Sort) Movido para a Toolbar principal */}
      <ToolbarItem>
        <Select isOpen={isSortDropdownOpen} selected={[activeSortDirection, activeSortIndex]} onOpenChange={isOpen => setIsSortDropdownOpen(isOpen)} onSelect={(event, value) => {
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
        Criar novo registro
      <Icon size="bodyLg">
        <PlusCircleIcon />
        </Icon>
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
      <MenuSearch>
        <MenuSearchInput>
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