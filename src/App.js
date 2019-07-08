import React, { Component, Fragment } from 'react';

import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderBreadcrumbs,
  EuiHeaderLogo,
  EuiIcon,
  EuiImage,
  EuiTitle,
  EuiNavDrawerGroup,
  EuiNavDrawer,
  EuiHorizontalRule,
  EuiShowFor,
  EuiFocusTrap,
  EuiButton
} from '@elastic/eui';

import { EuiEmptyPrompt } from '@elastic/eui';

import { keyCodes } from '@elastic/eui/lib/services';

import HeaderAppMenu from './header_app_menu'
import HeaderUserMenu from './header_user_menu';
import HeaderSpacesMenu from './header_spaces_menu';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    const faveExtraAction = {
      color: 'subdued',
      iconType: 'starEmpty',
      iconSize: 's',
      'aria-label': 'Add to favorites'
    };

    const pinExtraAction = {
      color: 'subdued',
      iconType: 'pin',
      iconSize: 's',
      'aria-label': 'Pin to top'
    };

    this.topLinks = [
      {
        label: 'Recently viewed',
        iconType: 'clock',
        flyoutMenu: {
          title: 'Recent items',
          listItems: [
            {
              label: 'My dashboard',
              href: '/#/layout/nav-drawer',
              iconType: 'dashboardApp',
              extraAction: faveExtraAction
            },
            {
              label: 'Workpad with title that wraps',
              href: '/#/layout/nav-drawer',
              iconType: 'canvasApp',
              extraAction: faveExtraAction
            },
            {
              label: 'My logs',
              href: '/#/layout/nav-drawer',
              iconType: 'loggingApp',
              'aria-label': 'This is an alternate aria-label',
              extraAction: faveExtraAction
            }
          ]
        }
      },
      {
        label: 'Favorites',
        iconType: 'starEmpty',
        flyoutMenu: {
          title: 'Favorite items',
          listItems: [
            {
              label: 'My workpad',
              href: '/#/layout/nav-drawer',
              iconType: 'canvasApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starFilled',
                iconSize: 's',
                'aria-label': 'Remove from favorites',
                alwaysShow: true
              }
            },
            {
              label: 'My logs',
              href: '/#/layout/nav-drawer',
              iconType: 'loggingApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starFilled',
                iconSize: 's',
                'aria-label': 'Remove from favorites',
                alwaysShow: true
              }
            }
          ]
        }
      }
    ];

    this.exploreLinks = [
      {
        label: 'Canvas',
        href: '/#/layout/nav-drawer',
        iconType: 'canvasApp',
        isActive: true,
        extraAction: {
          ...pinExtraAction,
          alwaysShow: true
        }
      },
      {
        label: 'Discover',
        href: '/#/layout/nav-drawer',
        iconType: 'discoverApp',
        extraAction: pinExtraAction
      },
      {
        label: 'Visualize',
        href: '/#/layout/nav-drawer',
        iconType: 'visualizeApp',
        extraAction: pinExtraAction
      },
      {
        label: 'Dashboard',
        href: '/#/layout/nav-drawer',
        iconType: 'dashboardApp',
        extraAction: pinExtraAction
      },
      {
        label: 'Machine learning',
        href: '/#/layout/nav-drawer',
        iconType: 'machineLearningApp',
        extraAction: pinExtraAction
      },
      {
        label: 'Custom Plugin (no icon)',
        href: '/#/layout/nav-drawer',
        extraAction: pinExtraAction
      }
    ];

    this.solutionsLinks = [
      {
        label: 'APM',
        href: '/#/layout/nav-drawer',
        iconType: 'apmApp',
        extraAction: pinExtraAction
      },
      {
        label: 'Infrastructure',
        href: '/#/layout/nav-drawer',
        iconType: 'infraApp',
        extraAction: pinExtraAction
      },
      {
        label: 'Log viewer',
        href: '/#/layout/nav-drawer',
        iconType: 'loggingApp',
        extraAction: pinExtraAction
      },
      {
        label: 'Uptime',
        href: '/#/layout/nav-drawer',
        iconType: 'upgradeAssistantApp',
        extraAction: pinExtraAction
      },
      {
        label: 'Maps',
        href: '/#/layout/nav-drawer',
        iconType: 'gisApp',
        extraAction: pinExtraAction
      },
      {
        label: 'SIEM',
        href: '/#/layout/nav-drawer',
        iconType: 'securityAnalyticsApp',
        extraAction: pinExtraAction
      }
    ];

    this.adminLinks = [
      {
        label: 'Admin',
        iconType: 'managementApp',
        flyoutMenu: {
          title: 'Tools and settings',
          listItems: [
            {
              label: 'Dev tools',
              href: '/#/layout/nav-drawer',
              iconType: 'devToolsApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add to favorites'
              }
            },
            {
              label: 'Stack Monitoring',
              href: '/#/layout/nav-drawer',
              iconType: 'monitoringApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add to favorites'
              }
            },
            {
              label: 'Stack Management',
              href: '/#/layout/nav-drawer',
              iconType: 'managementApp',
              extraAction: {
                color: 'subdued',
                iconType: 'starEmpty',
                iconSize: 's',
                'aria-label': 'Add to favorites'
              }
            }
          ]
        }
      }
    ];
  }

  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      this.closeFullScreen();
    }
  };

  closeFullScreen = () => {
    this.setState({
      isFullScreen: false
    });
  };

  renderLogo() {
    return <EuiHeaderLogo iconType="logoKibana" href="/#/layout/nav-drawer" aria-label="Goes to home" />;
  }

  renderMenuTrigger() {
    return (
      <EuiHeaderSectionItemButton aria-label="Open nav" onClick={() => this.navDrawerRef.toggleOpen()}>
        <EuiIcon type="apps" href="#" size="m" />
      </EuiHeaderSectionItemButton>
    );
  }

  renderBreadcrumbs() {
    const breadcrumbs = [
      {
        text: 'Management',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked management');
        },
        'data-test-subj': 'breadcrumbsAnimals',
        className: 'customClass'
      },
      {
        text: 'Truncation test is here for a really long item',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked truncation test');
        }
      },
      {
        text: 'hidden',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked hidden');
        }
      },
      {
        text: 'Users',
        href: '#',
        onClick: e => {
          e.preventDefault();
          console.log('You clicked users');
        }
      },
      {
        text: 'Create'
      }
    ];

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
  }

  setNavDrawerRef = ref => (this.navDrawerRef = ref);

  render() {
    let fullScreenDisplay;

    fullScreenDisplay = (
      <EuiFocusTrap>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%'
          }}
          onKeyDown={this.onKeyDown}
        >
          <EuiHeader>
            <EuiHeaderSection grow={false}>
              <EuiShowFor sizes={['xs', 's']}>
                <EuiHeaderSectionItem border="right">{this.renderMenuTrigger()}</EuiHeaderSectionItem>
              </EuiShowFor>
              <EuiHeaderSectionItem border="right">
                {this.renderLogo()}
              </EuiHeaderSectionItem>
              <EuiHeaderSectionItem border="right">
                <HeaderSpacesMenu />
              </EuiHeaderSectionItem>
            </EuiHeaderSection>

            {this.renderBreadcrumbs()}

            <EuiHeaderSection side="right">
              <EuiHeaderSectionItem>
                <HeaderUserMenu />
              </EuiHeaderSectionItem>
              <EuiHeaderSectionItem>
                <HeaderAppMenu />
              </EuiHeaderSectionItem>
            </EuiHeaderSection>
          </EuiHeader>
          <EuiNavDrawer ref={this.setNavDrawerRef}>
            <EuiNavDrawerGroup listItems={this.topLinks} />
            <EuiHorizontalRule margin="none" />
            <EuiNavDrawerGroup listItems={this.exploreLinks} />
            <EuiHorizontalRule margin="none" />
            <EuiNavDrawerGroup listItems={this.solutionsLinks} />
            <EuiHorizontalRule margin="none" />
            <EuiNavDrawerGroup listItems={this.adminLinks} />
          </EuiNavDrawer>
          <EuiPage className="euiNavDrawerPage">
            <EuiPageBody className="euiNavDrawerPage__pageBody">
              <EuiPageHeader>
                <EuiPageHeaderSection>
                  <EuiTitle size="l">
                    <h1>Page title</h1>
                  </EuiTitle>
                </EuiPageHeaderSection>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiPageContentHeaderSection>
                    <EuiTitle>
                      <h2>Content title</h2>
                    </EuiTitle>
                  </EuiPageContentHeaderSection>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <EuiButton fill onClick={this.toggleFullScreen} iconType="exit" aria-label="Exit fullscreen demo">
                    Exit fullscreen demo Hi
                  </EuiButton>

                  <EuiEmptyPrompt
                    iconType="editorStrike"
                    title={<h2>You have no spice</h2>}
                    body={
                      <Fragment>
                        <p>
                          Navigators use massive amounts of spice to gain a limited form of
                          prescience. This allows them to safely navigate interstellar space,
                          enabling trade and travel throughout the galaxy.
                        </p>
                        <p>You&rsquo;ll need spice to rule Arrakis, young Atreides.</p>
                      </Fragment>
                    }
                    actions={
                      <EuiButton color="primary" fill>
                        Harvest spice
                      </EuiButton>
                    }
                  />
                  
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </div>
      </EuiFocusTrap>
    );
    return (
      <Fragment>
        {fullScreenDisplay}
      </Fragment>
    );
  }
}
