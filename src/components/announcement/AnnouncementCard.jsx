import React from 'react'
import { Collapse } from "antd";

const { Panel } = Collapse;


const AnnouncementCard = (props) => {
  const {announcements} = props;

  const renderAnnouncements = announcements.map((announcement, index) => {
    return (
      <Panel header={announcement.title} key={announcement.id}>
        {announcement.body}
      </Panel>
    )
  })

  return (
    <Collapse ghost>
      {renderAnnouncements}
    </Collapse>
  )
}

export default AnnouncementCard