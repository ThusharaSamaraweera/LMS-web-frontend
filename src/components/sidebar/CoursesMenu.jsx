import { Menu, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
// submenu keys of first level
const openedMenu = [];

const { Text } = Typography;

const CoursesMenu = (props) => {
  const { enrollCourses } = props;
  const [openKeys, setOpenKeys] = React.useState([]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (openedMenu.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const renderCourses = (courses) => {
    if(courses.length === 0){
      return <Text type="secondary" >Ant Design (secondary)</Text>
    }

    return courses.map((course, index) => {
      return (
        <Link to={`course/${course}`} key={course}>
          <Menu.Item style={{color: 'gray'}}>{course}</Menu.Item>
        </Link>
      );
    });
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
    >
      <SubMenu key="level1" title={`Level 1`}>
        {renderCourses(enrollCourses[0].courses)}
      </SubMenu>

      <SubMenu key="level2" title={`Level 2`}>
        {renderCourses(enrollCourses[1].courses)}
      </SubMenu>

      <SubMenu key="level3" title={`Level 3`}>
        {renderCourses(enrollCourses[2].courses)}
      </SubMenu>

      <SubMenu key="level4" title={`Level 4`}></SubMenu>
    </Menu>
  );
};

export default CoursesMenu;
