import React from 'react';
import { ThemeProvider } from '@rmwc/theme';
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle,TopAppBarFixedAdjust } from '@rmwc/top-app-bar';
import { Button } from '@rmwc/button';
import { Link } from 'react-router-dom';
import '@rmwc/top-app-bar/styles'
import '@rmwc/button/styles';

const ToolbarTheme = {
    primary: '#1977ff',
    primaryBg: '#fff',
    secondary: '#6ec901',
    secondaryBg: '#6ec901',
    error: '#d43551',
    background: '#fff',
    onPrimary: '#1977ff',
    onSecondary: '#0a3066',
  };

const Toolbar = () => {
    
  return (
    <ThemeProvider options={ToolbarTheme}>
        <TopAppBar style={{ background: '#1E1E1E'}}>
            <TopAppBarRow>
                <TopAppBarSection alignStart>
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <TopAppBarTitle style={{ color: '#FFFFFF' }}>
                        App
                    </TopAppBarTitle>
                </Link>
                </TopAppBarSection>
                <TopAppBarSection alignEnd>
                <Link to="/login">
                    <Button outlined label={'Iniciar Sesión'} style={{ marginLeft: '.8rem', color: '#FFFFFF' }} />
                </Link>
                </TopAppBarSection>
            </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust/>
    </ThemeProvider>
  );
}

export default Toolbar;
