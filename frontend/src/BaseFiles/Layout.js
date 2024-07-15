import NavbarMenu from "./NavbarMenu";

export default function Layout({ children }) {
  return (
    <>
      <NavbarMenu />
      <div>{children}</div>
    </>
  );
}
