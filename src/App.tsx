import './App.css';
import Container from './components/container';
import JobProvider from './context/JobProvider';

function App() {
  return (
    <JobProvider>
      <Container />
    </JobProvider>
  );
}

export default App;
