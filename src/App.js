import './App.css';
import Main from './Main';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { WritedCustomerProvider } from './Context/WritedCustomerContext';
import { FeeCustomerProvider } from './Context/FeeCustomerContext';


function App() {

  const [background, setBackground] = useState(true);


  const handleChangeFile = (e) => {
    const { files } = e.target;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      // this.background.style.backgroundImage = `url(${fileReader.result})`;
      setBackground(event.target.result)
    };
    fileReader.readAsDataURL(file);

  }


  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundPosition: "center", backgroundRepeat: 'no-repeat', height: "100vh" }}>
      <WritedCustomerProvider>
        <FeeCustomerProvider>
          <Main />
        </FeeCustomerProvider>
      </WritedCustomerProvider>
      <br></br><br></br><br></br>
      <input type="file" onChange={handleChangeFile} />
    </div>

  );
}

export default App;
