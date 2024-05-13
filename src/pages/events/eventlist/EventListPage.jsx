import { useState } from "react";
import FilterEventList from "./FilterEventList";
import EventList from "./EventList";
import { Row, Col } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function EventListPage({
  next,
  setEvent,
  showModal,
  payload,
  initFormData,
  updatedCount,
  handleDelete,
  results
}) {
 
  
  const [searchParams, setSearchParams] = useSearchParams()
    
  const queryParams = {};
  searchParams.forEach((value, key) => {
      if(value === 'null') {
        value = null;
      }
      queryParams[key] = value;
  })

  // console.log("queryParams", queryParams)

  const [searchObj, setSearchObj] = useState(queryParams);

  const setSearchUrl=(searchObject)=>{
    setSearchParams(searchObject)
    setSearchObj(searchObject)
}
// console.log('SearchObj', searchObj)
// console.log('searchParams', searchParams)

  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectEvent = (eventId)=>{
    // console.log("select")
    navigate(`/event/${eventId}`, {state : {from: location}})
  }

  return (
    <>
 
    {results && results.length > 0 ? (
    <Row justify="space-between" gutter={[14, 14]} style={{ margin: 0 }}>
      <Col span={18}>
        <EventList
          searchObj={searchObj}
          next={next}
          setEvent={setEvent}
          payload={payload}
          initFormData={initFormData}
          updatedCount={updatedCount}
          showModal = {showModal}
          handleDelete={handleDelete}
          onSelectEvent = {handleSelectEvent}
          results={results}
        />
      </Col>
    </Row>
    ):(
<Row justify="space-between" gutter={[14, 14]} style={{ margin: 0 }}>
      <FilterEventList searchObj={searchObj} setSearchObj={setSearchUrl} />
      <Col span={18}>
        <EventList
          searchObj={searchObj}
          next={next}
          setEvent={setEvent}
          payload={payload}
          initFormData={initFormData}
          updatedCount={updatedCount}
          showModal = {showModal}
          handleDelete={handleDelete}
          onSelectEvent = {handleSelectEvent}
          results={results}
        />
      </Col>
    </Row>
    )}
    </>
  );
}
