import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Dashboard } from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";
import { Menu } from "antd";

const { SubMenu } = Menu;
// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Sidebar = () => {
  const theme = useTheme();
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const sidebarItems = [
    {
      text: "Dashboard",
      type: "main",
      icon: <Dashboard />,
    },
    {
      text: "Courses",
      type: "main",
      icon: <SchoolIcon />,
    },
  ];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Drawer variant="permanent" open={isDrawerOpen}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <List>
        {sidebarItems.map((item, index) => (
          <>
            <ListItemButton
              key={index}
              sx={{
                minHeight: 48,
                justifyContent: isDrawerOpen ? "initial" : "center",
                pl: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isDrawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: isDrawerOpen ? 1 : 1 }}
              />
            </ListItemButton>

            {item.text === "Courses" && (
              <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{ width: 256 }}
              >
                <SubMenu key="sub1" title="Level 1" >
                  <SubMenu title="1st Semester">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </SubMenu>
                  <SubMenu title="2nd Semester">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </SubMenu>
                </SubMenu>
              </Menu>
            )}
          </>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
