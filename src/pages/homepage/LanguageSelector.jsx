import { changeLanguage, languages } from "../../utils/internalisation";
import { Select } from 'antd';
const { Option } = Select


const LanguageSelector = () => {
  const onChange = (value) => {
    changeLanguage(value)
  };

  return (
    <>
      <Select
        showSearch
        placeholder="Select the language"
        optionFilterProp="children"
        onChange={onChange}
      >
        {languages.map((lng) => {
          return (
            <Option key={lng.code} onChange={() => changeLanguage(lng.code)}>
              {lng.lang}
            </Option>


          );
        })}
      </Select>
    </>
  );
};

export default LanguageSelector;