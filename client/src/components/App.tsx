import { Layout } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import React from 'react';

const App = (): JSX.Element => (
  <Layout>
    <Header>header</Header>
    <Layout>
      <Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Content>
    </Layout>
    <Footer>footer</Footer>
  </Layout>
);

export default App;
