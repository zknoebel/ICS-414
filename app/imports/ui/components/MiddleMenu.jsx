import React from 'react';
import {Menu, Grid, Dropdown} from 'semantic-ui-react';

export default class MiddleMenu extends React.Component {
    render() {
        return (
            <Menu borderless className="middlemenu">
                <Grid centered container columns={3}>
                    <Dropdown item text="CONTROLS" icon="dropdown">
                        <Dropdown.Menu>
                            <Dropdown.Item>START FUN</Dropdown.Item>
                            <Dropdown.Item>START WORK</Dropdown.Item>
                            <Dropdown.Item>PAUSE</Dropdown.Item>
                            <Dropdown.Item>RESET</Dropdown.Item>
                            <Dropdown.Item>SLEEP</Dropdown.Item>
                            <Dropdown.Item>POWER</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Menu.Item fitted> CONNECT </Menu.Item>

                    <Dropdown item text="SETTINGS" icon="dropdown">
                        <Dropdown.Menu>
                            <Dropdown.Item>FUN</Dropdown.Item>
                            <Dropdown.Item>WORK</Dropdown.Item>
                            <Dropdown.Item>MAX WORK HOURS</Dropdown.Item>
                            <Dropdown.Item>RESET TIME</Dropdown.Item>
                            <Dropdown.Item>BRIGHTNESS</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Menu.Item fitted> HELP </Menu.Item>
                </Grid>

            </Menu>
        );
    }
}
