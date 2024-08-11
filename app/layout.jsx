import Navbar from '../components/Navbar';
import Provider from '../components/Provider';
import '../styles/global.css';

const layout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
              <div className='gradient'></div>
          </div>

          <main className='app'>
            <Navbar/>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default layout