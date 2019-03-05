import React from 'react';
import { Grid, List, Label, Input } from 'semantic-ui-react';

export default class FooterMenu extends React.Component {
  render() {
    return (
        <div className="footer-background">
          <Grid container columns="3">
            <Grid.Column>
              NAVIGATION
              <hr />
              <List>
                <List.Item>Main Menu</List.Item>
                <List.Item>Connect</List.Item>
                <List.Item>Settings</List.Item>
              </List>
            </Grid.Column>

            <Grid.Column>
              MAIN MENU
              <hr />
              <List>
                <List.Item>Work</List.Item>
                <List.Item>Fun</List.Item>
              </List>
            </Grid.Column>

            <Grid.Column>
              CONNECT
              <hr />
              <List>
                <List.Item>Connect the application to your light bulb</List.Item>
                <List.Item>
                  <Input placeholder="Enter light bulb information" />
                  <Label color="black">Connect</Label>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}
