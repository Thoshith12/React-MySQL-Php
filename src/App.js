  import { useContext } from "react";
  import Header from "./Header";
  import Homepage from "./Homepage";
  import Sidebar from "./Sidebar";
  import SingleVideo from "./SingleVideo";
  import { DefaultProvider, useDefaultContext } from "./content/DefaultContext";
  import { BrowserRouter, Route, Routes } from "react-router-dom";


  function App() {
    const { sidebarDis } = useDefaultContext()
    return (
        <BrowserRouter>

          <div className="App">
            <Header></Header>
            <div className='d-flex sidebar'>
              {sidebarDis && <Sidebar />}
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path={"watch/v/:video_id"} element={<SingleVideo />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
    );
  }

  export default App;