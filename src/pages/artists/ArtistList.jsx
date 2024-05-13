import React, { useEffect, useState } from "react";
import { getArtist } from "../../services/artist/artist";

import { Card, Space, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { TranslateFunction } from "../../utils/internalisation";
const { Text,Paragraph,Title } = Typography;
const ArtistList = ({ selectArtist, results }) => {
    const labels = TranslateFunction("labels");
    const navigate = useNavigate();
    selectArtist=artistId=>navigate(`/artist/${artistId}`)

    const [artistDetails, setArtistDetails] = useState(null);
    useEffect(() => {
        getArtist()
            .then((data) => {
                setArtistDetails(data);
            })
    }, [])

   

    return (
        <>
            
            <Typography.Title>{labels("Artists")} </Typography.Title>
            {results && results.length > 0 ? (
                results.map((artist, index) => (
                    <Space size="large" key={index}>
                        <Artist index={artist.artistId} artist={artist} selectArtist={selectArtist} />
                    </Space>
                ))
            ) : (
                
                artistDetails && artistDetails.map((artist, index) => (
                    <Space size="large" key={index}>
                        <Artist index={artist.artistId} artist={artist} selectArtist={selectArtist} />
                    </Space>
                ))
            )}

        </>

    )

}
const Artist = ({ artist, selectArtist }) => {
    console.log("artist", artist)
    return (
        <>
            <Card
                key={artist.artistId}
                onClick={() => selectArtist(artist.artistId)}
                hoverable
                style={{ width: 350, height: 450, marginTop: "70px", marginLeft: "100px" }}
                cover={<img style={{ height: 350 }} src={artist.image} alt="Artist Poster" />}

            >
                <Meta title={artist.name} description={artist.role?.join(", ")} />
            </Card>
        </>
    )
}
export default ArtistList


































