import Container from '../container';
const NavBar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container></Container>
        <p className="text-rose-500">123</p>
      </div>
    </div>
  );
};

export default NavBar;
