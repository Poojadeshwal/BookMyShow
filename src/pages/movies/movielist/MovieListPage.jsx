import React, { useState } from "react";
import { Card, Typography } from 'antd';
import { Col, Row } from 'antd';
import Filters from "./FilterMovie";
import Movies from "./MovieList";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
const { Text, Paragraph, Title } = Typography;
export default function MovieListPage({ onSelectMovie, onDelete,
    results,
    showModal,
    inputText,
    payload,
    initFormData,
    updatedCount }) {

    
    const [searchParams, setSearchParams] = useSearchParams()
    
    const queryParams = {};
    searchParams.forEach((value, key) => {
        queryParams[key] = value;
    })
        
    const [searchObj, setSearchObj] = useState(queryParams);
    
    const [listUpdatedCount, setListUpdatedCount] = useState(null);
    
    
    const setSearchUrl=(searchObject)=>{
        setSearchParams(searchObject)
        setSearchObj(searchObject)
    }

    console.log('SearchObj', searchObj)
    console.log('searchParams', searchParams)
    //searchParams.get("__firebase_request_key")


    const navigate = useNavigate()
    const location = useLocation()

    const handleSelectMovie = (movieId) => {
        //onSelectMovie(movieId);
        //console.log('handleSelectMovie location', location)
        navigate(`/movie/${movieId}`, { state: { from: location } })
    }

    return (
        <>
            {results && results.length > 0 ? (
                <>
                    <Typography.Title>Movies In Delhi-NCR</Typography.Title>
                    <Card style={{ backgroundColor: "white" }} >


                        <Row gutter={[16, 16]}>

                            <Col span={18} style={{ marginTop: "35px" }}>
                                <Movies
                                    payload={payload}
                                    initFormData={initFormData}
                                    updatedCount={updatedCount}
                                    showModal={showModal}
                                    onSelectMovie={handleSelectMovie}
                                    searchObj={searchObj}
                                    listUpdatedCount={listUpdatedCount}
                                    onDelete={onDelete}
                                    inputText={inputText}
                                    results={results} />
                            </Col>
                        </Row>
                    </Card>
                </>
            ) : (
                <Card style={{ backgroundColor: "white" }} >
                    <Typography.Title>Movies In Delhi-NCR</Typography.Title>

                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <Filters searchObj={searchObj} setSearchObj={setSearchUrl} />
                        </Col>
                        <Col span={18} style={{ marginTop: "35px" }}>
                            <Movies
                                payload={payload}
                                initFormData={initFormData}
                                updatedCount={updatedCount}
                                showModal={showModal}
                                onSelectMovie={handleSelectMovie}
                                searchObj={searchObj}
                                listUpdatedCount={listUpdatedCount}
                                onDelete={onDelete}
                                inputText={inputText}
                                results={results} />
                        </Col>
                    </Row>
                </Card>
            )}
        </>
    )
}









