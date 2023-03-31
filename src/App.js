import { useState, useEffect } from "react";
import Contacts from "./components/table/Contacts";
import FormComponent from "./components/form/FormComponent";

const initialValues = { username: "", phone_number: "", gender: "" };

function App() {
  const [info, setInfo] = useState(initialValues);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const mainUrl = "https://22110.fullstack.clarusway.com/contacts/";

  useEffect(() => {
    fetch(mainUrl)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [refresh]);

  return (
    <div className="App">
      <FormComponent
        info={info}
        setInfo={setInfo}
        setData={setData}
        data={data}
        initialValues={initialValues}
        update={update}
        setUpdate={setUpdate}
        refresh={refresh}
        setRefresh={setRefresh}
        mainUrl={mainUrl}
      />
      <Contacts
        data={data}
        setData={setData}
        setUpdate={setUpdate}
        setInfo={setInfo}
        mainUrl={mainUrl}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
}

export default App;
