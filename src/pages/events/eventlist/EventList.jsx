import { useEffect, useState } from "react";
import { getFunction } from "../../../services/events/events";
import { Card, Row, Col, Typography, Button, Flex } from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import PermissionButton from "../../../structure/PermissionButton";
import { TranslateFunction } from "../../../utils/internalisation";
const filterEvents = (events, searchObj) => {
  console.log("filterevnets" , events)
  return events.filter((event) => {
    if (
      !searchObj ||
      ((!searchObj.genre || event.genres.includes(searchObj.genre)) &&
        (!searchObj.language || event.language.includes(searchObj.language)) &&
        (!searchObj.location || event.venue.includes(searchObj.location)))
    )
      return true;
    return false;
  });
};

const EventList = ({
  searchObj,
  next,
  setEvent,
  payload,
  initFormData,
  updatedCount,
  showModal,
  handleDelete, 
  onSelectEvent
}) => {
  const [eventsList, setEventsList] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null);
  const button = TranslateFunction("labels");
  useEffect(() => {
    getFunction().then((events) => {
      setEventsList(events);
    });
  }, [updatedCount]);
  console.log("list", eventsList);

  useEffect(() => {
    if (searchObj && eventsList) {
      let filteredEvents = filterEvents(eventsList, searchObj);
      setFilteredEvents(filteredEvents);
    }
  }, [eventsList, searchObj]);  


  const initCreateUpdate = (id) => {
    if (id === undefined) {
      payload.current.operation = "ADD";   
      payload.current.data = {};
      initFormData();

    } else {
      payload.current.operation = "UPDATE";
      payload.current.data = {
        eventId: id,
      };
    const eventObj = eventsList?.find(
      (event) => event.eventId === payload.current.data.eventId
    );
    payload.current.data = eventObj;
    initFormData();
    }
}

  return (
    <>
       <PermissionButton allowedPermissions={["addEvent"]} >
      <Button
        style={{
          color: "white",
          marginBottom: "20px",
          marginLeft: "80%",
          width: "15%",
          backgroundColor: "rgb(220, 53, 75)",
          marginTop: "5%",
          marginRight: "5%",
          padding: 0,
        }}
        onClick={() => {
          initCreateUpdate();
          showModal();
        }}
      >
        <PlusOutlined />
        {button("addEvent")}
      </Button>
      </PermissionButton>
      <Row justify="space-between">
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents.map((event) => ( 
            <Col key={event.eventId} span={7}>
              <Event
                key={event.eventId}
                event={event}
                index={event.eventId}
                next={next}
                setEvent={setEvent}
                handleDelete={handleDelete}
                initCreateUpdate={initCreateUpdate}
                showModal={showModal}
                onSelectEvent={onSelectEvent}
              />
            </Col>
          
          ))
        ) : (
          <Typography.Title style={{ color: "rgb(220, 53, 75)" }}>
            Sorry ! No event found
          </Typography.Title>
        )}
      </Row>
    </>
  );
};

const Event = ({
  event,
  next,
  setEvent,
  initCreateUpdate,
  showModal,
  handleDelete,
 onSelectEvent,
}) => {
  const handleClick = () => {
    // setEvent(event);
    // next();
    console.log("handle")
    onSelectEvent(event.eventId);  
  };

  // console.log("eventlist", event)
  return (
    <>
      <Card
        key={event.eventId}
        onClick={handleClick}
        hoverable
        style={{ width: 240 }}
        cover={<img alt={event.eventName} src={event.eventPoster} style={{width:240, height:360}}/>}
      >
        <Card.Meta title={event.eventName} description={event.venue} />
      </Card>
      <PermissionButton allowedPermissions={["editEvent","deleteEvent"]} >
      <Card style={{ margin: 0, width: 240, height: 50, marginBottom: 50 }}>
        <Flex style={{ justifyContent: "space-between" }}>
          <EditOutlined
            key="edit"
            onClick={() => {
              initCreateUpdate(event.eventId);
              showModal();
            }}
          />
          <DeleteOutlined
            key="delete"
            onClick={() => handleDelete(event.eventId)}
          />
        </Flex>
      </Card>
      </PermissionButton>
    </>
  );
};

export default EventList;
