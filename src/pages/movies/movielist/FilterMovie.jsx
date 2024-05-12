import { Button, Col, Collapse, Space, Typography } from "antd";
import React, { useState } from "react";
const genres = ["Action", "Sci-Fi", "Thriller", "Animation", "Comedy", "Adventure","Drama","Political","Supernatural"];
const languages = ["Hindi", "English", "Tamil", "Telugu"];
const { Text, Paragraph, Title } = Typography;
export default function Filters({ searchObj, setSearchObj }) {
    const [activeGenres, setActiveGenres] = useState([]);
    const [activeLanguages, setActiveLanguages] = useState([]);
    return (
        <>  
                <Title style={{ align: "center", marginTop: "48px" }} level={2}>Filters</Title>
                <Collapse   >
                    {/* accordion= to open one collapse at a time */}
                    <Collapse.Panel header="Genres" key="genres" style={{ backgroundColor: "rgb(248,68,100)", color: "white", fontSize: "20px" }}>
                        {genres.map((genre, index) => (
                            <Button

                                key={`genre-${index}`}
                                active={activeGenres.includes(genre)}
                                onClick={(e) => {
                                    let genre = e.target.textContent;
                                    // console.log("button object", genre);
                                    if (searchObj.genre === genre) {
                                        setSearchObj({ ...searchObj, genre: null })
                                    }
                                    else {
                                        setSearchObj({ ...searchObj, genre })
                                    }
                                }}
                                className={`${activeGenres.includes(genre) ? 'active-button' : ''} ${searchObj.genre === genre ? 'yellow-button' : 'green-button'}`}
                            >
                                {genre}
                            </Button>
                        ))}
                    </Collapse.Panel>
                    <Collapse.Panel header="Languages" key="languages" style={{ backgroundColor: "rgb(248,68,100)", color: "white", fontSize: "20px" }}>
                        {languages.map((language, index) => (
                            <Button
                                key={`language-${index}`}
                                active={activeLanguages.includes(language)}
                                onClick={(e) => {
                                    let language = e.target.textContent;
                                    // console.log("button object", language);
                                    if (searchObj.language === language) {

                                        setSearchObj({ ...searchObj, language: null })

                                    }
                                    else {
                                        setSearchObj({ ...searchObj, language })
                                    }
                                }}
                                className={`${activeLanguages.includes(language) ? 'active-button' : ''} ${searchObj.language === language ? 'yellow-button' : 'green-button'}`}
                            >
                                {language}
                            </Button>
                        ))}

                    </Collapse.Panel>
                </Collapse> 
        </>
    );
}







