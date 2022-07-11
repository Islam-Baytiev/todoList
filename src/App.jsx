import './App.scss';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  );
}

export default App;
