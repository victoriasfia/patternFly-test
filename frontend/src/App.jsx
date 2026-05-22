import { Fragment, useState } from 'react';
import {
  Avatar, Brand, Breadcrumb, ToolbarToggleGroup, BreadcrumbItem, Button, ButtonVariant, Content, Divider, Dropdown, 
  DropdownGroup, DropdownItem, DropdownList, Masthead, MastheadMain, MastheadLogo, MastheadContent, 
  MastheadBrand, MastheadToggle, MenuToggle, Nav, NavExpandable, NavItem, NavList, NotificationBadge, NotificationBadgeVariant,
  Page, PageBreadcrumb, PageGroup, PageSection, PageSidebar, PageSidebarBody, PageToggleButton, SkipToContent, Toolbar, 
  ToolbarContent, ToolbarGroup, ToolbarItem, SearchInput, Select, SelectList, SelectOption, SelectGroup
} from '@patternfly/react-core';
import { createRoot } from "react-dom/client";
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

import "@patternfly/react-core/dist/styles/base.css";
import CogIcon from '@patternfly/react-icons/dist/esm/icons/cog-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import QuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import SortAmountDownIcon from '@patternfly/react-icons/dist/esm/icons/sort-amount-down-icon';

import imgAvatar from '@patternfly/react-core/src/components/assets/avatarImg.svg';
import pfLogo from '@patternfly/react-core/src/demos/assets/PF-HorizontalLogo-Color.svg';

export default function App() {
  const [activeGroup, setActiveGroup] = useState('nav-group-1');
  const [activeItem, setActiveItem] = useState('nav-group-1_item-1');

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
  
  
  const statusOptions = ['A', 'CNAME', 'NS', 'AAAA', 'TXT', 'SRV', 'PTR', 'SOA'];
  const riskOptions = ['Equipe teste', 'Equipe Infra', 'Equipe Dev', 'Equipe banco de dados'];
  
  const columnNames = {
    name: 'Nome',
    type: 'Tipo',
    value: 'Valor',
    owner: 'Owner',
    action: 'Ação'
  };

  const repositories = [
  { 
    name: 'google.teste.es.gov.br.', 
    type: 'CNAME', 
    value: 'google.com', 
    owner: 'Equipe Infra', 
    action: '' 
  },
  { 
    name: 'shopp.teste.es.gov.br.', 
    type: 'CNAME', 
    value: 'marketplace', 
    owner: 'equipe teste', 
    action: '' 
  },
  { 
    name: 'painel.novaredes.teste.es.gov.br.', 
    type: 'CNAME', 
    value: 'portal.novaredes.com.', 
    owner: 'equipe teste', 
    action: '' 
  },
  { 
    name: 'backup.datacenterx.teste.es.gov.br.', 
    type: 'NS', 
    value: 'ns2.database.com.', 
    owner: 'Equipe banco de dados', 
    action: '' 
  },
  { 
    name: 'filmestv.teste.es.gov.br.', 
    type: 'A', 
    value: '192.168.1.10', 
    owner: 'Equipe Dev', 
    action: '' 
  },
  { 
    name: 'filme', 
    type: 'NS', 
    value: 'ns6.devfilm.com.', 
    owner: 'Equipe teste', 
    action: '' 
  }
];

  const onStatusToggle = () => setStatusIsExpanded(!statusIsExpanded);
  const onStatusSelect = (_event, selection) => {
    setStatusSelected(selection);
    setStatusIsExpanded(false);
  };

  const onRiskToggle = () => setRiskIsExpanded(!riskIsExpanded);
  const onRiskSelect = (_event, selection) => {
    setRiskSelected(selection);
    setRiskIsExpanded(false);
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

  const getSortableRowValues = repo => {
    const {name, type, value, owner, action} = repo;
    return [name, type, value, owner, action];
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

  const kebabDropdownItems = (
    <>
      <DropdownItem><CogIcon /> Settings</DropdownItem>
      <DropdownItem><HelpIcon /> Help</DropdownItem>
    </>
  );
  
  const userDropdownItems = (
    <>
      <DropdownItem key="group 2 profile">My profile</DropdownItem>
      <DropdownItem key="group 2 user">User management</DropdownItem>
      <DropdownItem key="group 2 logout">Logout</DropdownItem>
    </>
  );

  const headerToolbar = (
    <Toolbar id="toolbar" isStatic>
      <ToolbarContent>
        <ToolbarGroup variant="action-group-plain" align={{ default: 'alignEnd' }} gap={{ default: 'gapNone', md: 'gapMd' }}>
          <ToolbarGroup variant="action-group-plain" visibility={{ default: 'hidden', lg: 'visible' }}>
            <ToolbarItem>
              <Button aria-label="Help" variant={ButtonVariant.plain} icon={<QuestionCircleIcon />} />
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem visibility={{ default: 'hidden', md: 'visible', lg: 'hidden' }}>
            <Dropdown isOpen={isKebabDropdownOpen} onSelect={onKebabDropdownSelect} onOpenChange={isOpen => setIsKebabDropdownOpen(isOpen)} popperProps={{ position: 'right' }} toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={onKebabDropdownToggle} isExpanded={isKebabDropdownOpen} variant="plain" aria-label="Settings and help" icon={<EllipsisVIcon />} />}>
              <DropdownList>{kebabDropdownItems}</DropdownList>
            </Dropdown>
          </ToolbarItem>
          <ToolbarItem visibility={{ md: 'hidden' }}>
            <Dropdown isOpen={isFullKebabDropdownOpen} onSelect={onFullKebabDropdownSelect} onOpenChange={isOpen => setIsFullKebabDropdownOpen(isOpen)} popperProps={{ position: 'right' }} toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={onFullKebabDropdownToggle} isExpanded={isFullKebabDropdownOpen} variant="plain" aria-label="Toolbar menu" icon={<EllipsisVIcon />} />}>
              <DropdownGroup key="group 2" aria-label="User actions">
                <DropdownList>{userDropdownItems}</DropdownList>
              </DropdownGroup>
              <Divider />
              <DropdownList>{kebabDropdownItems}</DropdownList>
            </Dropdown>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarItem visibility={{ default: 'hidden', md: 'visible' }}>
          <Dropdown isOpen={isDropdownOpen} onSelect={onDropdownSelect} onOpenChange={isOpen => setIsDropdownOpen(isOpen)} popperProps={{ position: 'right' }} toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={onDropdownToggle} isExpanded={isDropdownOpen} icon={<Avatar src={imgAvatar} alt="" size="sm" />}>
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
        <SearchInput 
          aria-label="Component toggle groups example search input" 
          onChange={(_event, value) => onInputChange(value)} 
          value={inputValue} 
          onClear={() => onInputChange('')} 
          placeholder="Buscar nome, IP..."
          style={{ width: '250px' }}
        />
      </ToolbarItem>
      
      {/* Grupo de Filtros */}
      <ToolbarGroup variant="filter-group">
        <ToolbarItem>
          <FilterIcon/> Filtrar por:
          <Select toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={() => onStatusToggle()} isExpanded={statusIsExpanded} style={{ width: '200px', margin: '0 8px' }}>
                {statusSelected || 'Todos os Tipos'}
              </MenuToggle>} onSelect={onStatusSelect} onOpenChange={isOpen => setStatusIsExpanded(isOpen)} selected={statusSelected} isOpen={statusIsExpanded}>
            <SelectList>
              {statusOptions.map((option, index) => <SelectOption key={index} value={option}>{option}</SelectOption>)}
            </SelectList>
          </Select>
        </ToolbarItem>
        <ToolbarItem>
          <Select toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={() => onRiskToggle()} isExpanded={riskIsExpanded} style={{ width: '200px', margin: '0 8px' }}>
                {riskSelected || 'Todos os Owners'}
              </MenuToggle>} onSelect={onRiskSelect} selected={riskSelected} isOpen={riskIsExpanded} onOpenChange={isOpen => setRiskIsExpanded(isOpen)}>
            <SelectList>
              {riskOptions.map((option, index) => <SelectOption key={index} value={option}>{option}</SelectOption>)}
            </SelectList>
          </Select>
        </ToolbarItem>
      </ToolbarGroup>

      {/* Botão de Ordenação (Sort) Movido para a Toolbar principal */}
      <ToolbarItem>
        <Select isOpen={isSortDropdownOpen} selected={[activeSortDirection, activeSortIndex]} onOpenChange={isOpen => setIsSortDropdownOpen(isOpen)} onSelect={(event, value) => {
          if (value === 'asc' || value === 'desc') {
            setActiveSortDirection(value);
          } else {
            setActiveSortIndex(value);
            setActiveSortDirection(activeSortDirection !== null ? activeSortDirection : 'asc');
          }
        }} toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)} isExpanded={isSortDropdownOpen} variant="plain" aria-label="Sort columns" icon={<SortAmountDownIcon />} />}>
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


  return (
    <Page masthead={masthead} sidebar={sidebar} isManagedSidebar skipToContent={pageSkipToContent} mainContainerId={mainContainerId}>
      {/* Título da Página */}
      <PageGroup stickyOnBreakpoint={{ default: 'top' }}>
        <PageSection isWidthLimited aria-labelledby="main-title">
          <Content>
            <h1 id="main-title">Gerenciador DNS</h1>
            <p>Gerencie os registros DNS de sua infraestrutura.</p>
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
              <Th sort={getSortParams(4)}>{columnNames.action}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedRepositories.map((repo, rowIndex) => (
              <Tr key={rowIndex}>
                <Td dataLabel={columnNames.name}>{repo.name}</Td>
                <Td dataLabel={columnNames.type}>{repo.type}</Td>
                <Td dataLabel={columnNames.value}>{repo.value}</Td>
                <Td dataLabel={columnNames.owner}>{repo.owner}</Td>
                <Td dataLabel={columnNames.action}>{repo.action}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </PageSection>
    </Page>
  );
}