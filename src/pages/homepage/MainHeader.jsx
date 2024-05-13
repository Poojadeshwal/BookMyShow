import React from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { AuthData} from "../../structure/AuthWrapper";
import { useNavigate, Link } from 'react-router-dom';
import { navList } from '../../structure/Navigation';
import { isAuthorisedRoute } from '../../structure/RenderNavigation';
import LanguageSelector from './LanguageSelector';
import { TranslateFunction } from '../../utils/internalisation';


const { Header, Content, Footer } = Layout;
//const labels = ["Home", "Movies", "Events", "Artist", "Shows"];


const MainHeader = () => {
  const nav = useNavigate()
  const { user, logout } = AuthData()

  const labels = TranslateFunction("labels");
  // console.log('location from state', user)

  const items = navList.map((r, i) => {
    if(isAuthorisedRoute(user, r, true))
      return { key: r.path, label:labels(r.name)}
  })
// console.log("items",items)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigateUrl = (e) => {
    console.log('click ', e);
    nav(e.key)
    //setCurrent(e.key);
  };

  return (
    
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: "GhostWhite",

        }}
      >
      
        <Menu
          // theme="dark"
          onClick={navigateUrl}
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 0.5,
            minWidth: 0,
            backgroundColor: "GhostWhite",
            marginLeft: "90px"

          }}
        />
         <div style={{ flex: 0.5, display: 'flex', justifyContent: "end", alignItems: 'center' }}>
        <LanguageSelector/>
        </div>
        
        <div style={{ flex: 0.1, display: 'flex', justifyContent: "end", alignItems: 'center' }}>
        
          {user.isAuthenticated ?
                    <div className="menuItem"><Link to={'#'} onClick={logout}><Button style={{backgroundColor:"rgb(248,68,100)"}}> {labels("Log out")}</Button></Link></div>
                    :
                    <div className="menuItem"><Link to={'login'}><Button style={{backgroundColor:"rgb(248,68,100)"}}> {labels("Log in")}</Button></Link></div>}

        </div>
      
      </Header>
    </Layout>

  );
};
export default MainHeader;