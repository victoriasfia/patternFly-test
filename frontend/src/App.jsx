import { Fragment, useState } from 'react';
import {
  Avatar, Brand, Breadcrumb, ToolbarToggleGroup, BreadcrumbItem, Button, ButtonVariant, Card, CardBody, Content, Divider, Dropdown, 
  DropdownGroup, DropdownItem, DropdownList, Gallery, GalleryItem, Masthead, MastheadMain, MastheadLogo, MastheadContent, 
  MastheadBrand, MastheadToggle, MenuToggle, Nav, NavItem, NavList, NotificationBadge, NotificationBadgeVariant,
  Page, PageBreadcrumb, PageGroup, PageSection, PageSidebar, PageSidebarBody, PageToggleButton, SkipToContent, Toolbar, 
  ToolbarContent, ToolbarGroup, ToolbarItem,
  SearchInput, Select, SelectList, SelectOption
} from '@patternfly/react-core';
import CogIcon from '@patternfly/react-icons/dist/esm/icons/cog-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import QuestionCircleIcon from '@patternfly/react-icons/dist/esm/icons/question-circle-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import imgAvatar from '@patternfly/react-core/src/components/assets/avatarImg.svg';
import pfLogo from '@patternfly/react-core/src/demos/assets/PF-HorizontalLogo-Color.svg';

export default function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = useState(false);
  const [isFullKebabDropdownOpen, setIsFullKebabDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  
  const [inputValue, setInputValue] = useState('');
  const [statusIsExpanded, setStatusIsExpanded] = useState(false);
  const [statusSelected, setStatusSelected] = useState('');
  const [riskIsExpanded, setRiskIsExpanded] = useState(false);
  const [riskSelected, setRiskSelected] = useState('');
  
  const statusOptions = ['New', 'Pending', 'Running', 'Cancelled'];
  const riskOptions = ['Risk', 'Low', 'Medium', 'High'];
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

  const kebabDropdownItems = (
    <>
      <DropdownItem>
        <CogIcon /> Settings
      </DropdownItem>
      <DropdownItem>
        <HelpIcon /> Help
      </DropdownItem>
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
    <Nav onSelect={onNavSelect}>
      <NavList>
        <NavItem itemId={0} isActive={activeItem === 0} to="#dns-panel">
          DNS
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
  const handleClick = event => {
    event.preventDefault();
    const mainContentElement = document.getElementById(mainContainerId);
    if (mainContentElement) {
      mainContentElement.focus();
    }
  };
  const pageSkipToContent = (
    <SkipToContent onClick={handleClick} href={`#${mainContainerId}`}>
      Skip to content
    </SkipToContent>
  );

  const toggleGroupItems = (
    <Fragment>
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
      {/*filtrar os Tipos */}
      <ToolbarGroup variant="filter-group">
        <ToolbarItem>
          <Select toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={() => onStatusToggle()} isExpanded={statusIsExpanded} style={{ width: '200px', margin: '0 8px' }}>
                {statusSelected || 'Todos os Tipos'}
              </MenuToggle>} onSelect={onStatusSelect} onOpenChange={isOpen => setStatusIsExpanded(isOpen)} selected={statusSelected} isOpen={statusIsExpanded}>
            <SelectList>
              {statusOptions.map((option, index) => <SelectOption key={index} value={option}>
                  {option}
                </SelectOption>)}
            </SelectList>
          </Select>
        </ToolbarItem>
        <ToolbarItem>

          {/*filtrar os Owners */}
          <Select toggle={toggleRef => <MenuToggle ref={toggleRef} onClick={() => onRiskToggle()} isExpanded={riskIsExpanded} style={{ width: '200px', margin: '0 8px' }}>
                {riskSelected || 'Todos os Owners'}
              </MenuToggle>} onSelect={onRiskSelect} selected={riskSelected} isOpen={riskIsExpanded} onOpenChange={isOpen => setRiskIsExpanded(isOpen)}>
            <SelectList>
              {riskOptions.map((option, index) => <SelectOption key={index} value={option}>
                  {option}
                </SelectOption>)}
            </SelectList>
          </Select>
        </ToolbarItem>
      </ToolbarGroup>
    </Fragment>
  );

  const toolbarItems = (
    <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
      {toggleGroupItems}
    </ToolbarToggleGroup>
  );

  const searchToolbar = (
    <Toolbar id="toolbar-component-managed-toggle-groups" className="pf-m-toggle-group-container">
      <ToolbarContent>{toolbarItems}</ToolbarContent>
    </Toolbar>
  );

  return (
    <Page masthead={masthead} sidebar={sidebar} isManagedSidebar skipToContent={pageSkipToContent} mainContainerId={mainContainerId}>
      <PageGroup stickyOnBreakpoint={{ default: 'top' }}>
        <PageSection isWidthLimited aria-labelledby="main-title">
          <Content>
            <h1 id="main-title">Gerenciador DNS</h1>
            <p>Gerencie os registros DNS de sua infraestrutura.</p>
          </Content>
        </PageSection>
      </PageGroup>
      
      <PageSection variant="light">
        {searchToolbar}
      </PageSection>

      <PageSection aria-label="Card gallery">
        <Gallery hasGutter>
          {Array.from({ length: 50 }).map((_value, index) => (
            <GalleryItem key={index}>
            </GalleryItem>
          ))}
        </Gallery>
      </PageSection>
    </Page>
  );
}