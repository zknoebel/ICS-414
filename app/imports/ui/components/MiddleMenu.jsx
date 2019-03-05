import React from 'react';
import { Menu, Grid, Dropdown } from 'semantic-ui-react';

export default class MiddleMenu extends React.Component {
  render() {
    return (
        <Menu borderless className="middlemenu">
          <Grid centered container columns={3}>
            <Dropdown item text="MEN" icon="dropdown">
              <Dropdown.Menu>
                <Dropdown.Item>TANK TOPS</Dropdown.Item>
                <Dropdown.Item>SHIRTS</Dropdown.Item>
                <Dropdown.Item>LONG SLEEVE SHIRTS</Dropdown.Item>
                <Dropdown.Item>SWEATSHIRTS AND JACKETS</Dropdown.Item>
                <Dropdown.Item>ALOHA SHIRTS</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text="WOMEN" icon="dropdown">
              <Dropdown.Menu>
                <Dropdown.Item>TANK TOPS</Dropdown.Item>
                <Dropdown.Item>SHIRTS</Dropdown.Item>
                <Dropdown.Item>LONG SLEEVE SHIRTS</Dropdown.Item>
                <Dropdown.Item>SWEATSHIRTS</Dropdown.Item>
                <Dropdown.Item>HATS</Dropdown.Item>
                <Dropdown.Item>ACCESSORIES</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item fitted> KIDS </Menu.Item>

            <Dropdown item text="BRANDS" icon="dropdown">
              <Dropdown.Menu>
                <Dropdown.Item>ALOHA SURF PROJECTS</Dropdown.Item>
                <Dropdown.Item>DA MOKES</Dropdown.Item>
                <Dropdown.Item>FARMERS MARKET HAWAII</Dropdown.Item>
                <Dropdown.Item>HAWAII DOMESTIC MARKET</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item fitted> SEARCH </Menu.Item>
          </Grid>

        </Menu>
    );
  }
}
