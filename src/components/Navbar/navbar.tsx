import Container from '../container';

const NavBar = () => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container></Container>
        <p className="text-rose-500">123</p>
      </div>
    </div>
  );
};

export default NavBar;
