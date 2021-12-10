import React from 'react';
import { Routes, Route, Link, NavLink, Outlet, useParams, useNavigate, useSearchParams,} from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ]);

  const handleRemoveUser = (userId) => {
    setUsers((state) => state.filter((user) => user.id !== userId));
    navigate('/users');
  };

  return (
    <>
        <Navigation />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />  
            <Route path="home" element={<Home />} />
            <Route path="users" element={<Users users={users} />}>
               {/* Subrota que tem parametros users/:userId */}
               <Route path=":userId" element={<User onRemoveUser={handleRemoveUser} />}/>
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
    </>
  );
};



const Navigation = () => {
  return (
    <nav
      style={{
        borderBottom: 'solid 1px',
        paddingBottom: '1rem',
      }}
    >
      <Link to="/home">Home</Link>
      <Link to="/users">Users</Link>
    </nav>
  );
};

const Layout = () => {
  const style = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
  });

  return (
    <>
      <h1>React Router</h1>

      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <NavLink to="/home" style={style}>Home</NavLink>
        <NavLink to="/users" style={style}>Users</NavLink>
      </nav>

      <main style={{ padding: '1rem 0' }}>
        <Outlet />
      </main>
    </>
  );
};

const Home = () => {
  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Home</h2>
    </main>
  );
};

const Users = ({users}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('name') || '';

  const handleSearch = (event) => {
    const name = event.target.value;

    if (name) {
      setSearchParams({ name: event.target.value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main style={{ padding: '1rem 0' }}>
      <h2>Users</h2>
        <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        /> 

        <ul>
          {users
            .filter((user) =>
              user.fullName
                .toLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            )
            .map((user) => (
              <li key={user.id}>
                <Link to={user.id}>{user.fullName}</Link>
              </li>
            ))}
        </ul>

      <Outlet />
    </main>
  );
};

const User = ({ onRemoveUser }) => {
  const { userId } = useParams();

  return (
    <>
      <h2>User: {userId}</h2>
      <button type="button" onClick={() => onRemoveUser(userId)}>
        Remove
      </button>
      <Link to="/users">Back to Users</Link>
    </>
  );
};

const NoMatch = () => {
  return (<p>There's nothing here: 404!</p>);
}

export default App;