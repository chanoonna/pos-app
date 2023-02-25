import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      Menus
      <button
        onClick={() => {
          navigate('/home/first');
        }}
      >
        first
      </button>
    </div>
  );
};
