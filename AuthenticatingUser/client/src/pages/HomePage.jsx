const HomePage = () => {

  const get = () => {
    const secret = localStorage.getItem('userSecret')
    console.log(secret)
  }

  return (
    <div>
      <button onClick={get}>GET SECRET</button>
    </div>
  );
};

export default HomePage;