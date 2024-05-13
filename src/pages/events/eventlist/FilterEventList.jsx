import { Button, Flex, Typography, Layout, Collapse, Space } from "antd";

import { TranslateFunction } from "../../../utils/internalisation";




const genres = [
  "Comedy",
  "EDM",
  "Workshop",
  "Sufi",
  "Business",
  "Education",
  "Poetry",
  "Jazz",
  "Bollywood",
  "Indian Classical",
  "Technology",
];
const languages = ["Hindi", "English", "Punjabi", "Urdu"];
const location = ["Noida", "Delhi", "Gurugram"];

export default function FilterEventList({ searchObj, setSearchObj }) {
  const translation = TranslateFunction("labels");
  return (
    <>
      <Typography.Title style={{ marginLeft: "5%" }}>
        {translation("eventsInDelhi-NCR")}
      </Typography.Title>
      {/* <div style={{marginRight:"50px", marginTop:"10px"}}>
       <LanguageSelector />
       </div> */}
      <Layout style={{ backgroundColor: "white" }}>
        <Layout.Header
          style={{
            backgroundColor: "white",
            marginLeft: "10%",
            marginBottom: "2%",
          }}
        >
          <Flex wrap="wrap" gap="small">
            {genres.map((genre, index) => (
              <Button
                style={{
                  color:
                    searchObj.genre === genre ? "white" : "rgb(220, 53, 75)",
                  backgroundColor:
                    searchObj.genre === genre ? "rgb(220, 53, 75)" : "white",
                  borderRadius: "15px",
                }}
                key={index}
                onClick={() => {
                  if (searchObj.genre === genre) {
                    setSearchObj({ ...searchObj, genre: null });
                  } else {
                    setSearchObj({ ...searchObj, genre });
                  }
                }}
              >
                {genre}
              </Button>
            ))}
          </Flex>
        </Layout.Header>
      </Layout>
      <div>
        <Typography.Title level={3} style={{ marginLeft: "20%" }}>
        {translation("filters")}
        </Typography.Title>
        <Layout style={{ backgroundColor: "white", marginLeft: "10px" }}>
          <Layout.Sider style={{ backgroundColor: "white" }}>
            <Collapse style={{ marginLeft: "5%" }}>
              <Collapse.Panel header={translation("languages")}>
                <Space wrap>
                  {languages.map((language, index) => (
                    <Button
                      style={{
                        color:
                          searchObj.language === language
                            ? "white"
                            : "rgb(220, 53, 75)",
                        backgroundColor:
                          searchObj.language === language
                            ? "rgb(220, 53, 75)"
                            : "white",
                        borderRadius: "15px",
                      }}
                      key={index}
                      onClick={() => {
                        if (searchObj.language === language) {
                          setSearchObj({ ...searchObj, language: null });
                        } else {
                          setSearchObj({ ...searchObj, language });
                        }
                      }}
                    >
                      {language}
                    </Button>
                  ))}
                </Space>
              </Collapse.Panel>
            </Collapse>
            <Collapse style={{ marginLeft: "5%", marginTop: "10%" }}>
              <Collapse.Panel  header={translation("location")}>
                <Space wrap>
                  {location.map((location, index) => (
                    <Button
                      style={{
                        color:
                          searchObj.location === location
                            ? "white"
                            : "rgb(220, 53, 75)",
                        backgroundColor:
                          searchObj.location === location
                            ? "rgb(220, 53, 75)"
                            : "white",
                        borderRadius: "15px",
                      }}
                      key={index}
                      onClick={() => {
                        if (searchObj.location === location) {
                          setSearchObj({ ...searchObj, location: null });
                        } else {
                          setSearchObj({ ...searchObj, location });
                        }
                      }}
                    >
                      {location}
                    </Button>
                  ))}
                </Space>
              </Collapse.Panel>
            </Collapse>
          </Layout.Sider>
        </Layout>
      </div>
    </>
  );
}
