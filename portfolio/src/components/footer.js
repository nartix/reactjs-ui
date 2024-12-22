import { useGlobalState } from '../context/global-context-use';

const Footer = () => {
  const [templateGlobals] = useGlobalState();
  const { title } = templateGlobals;
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="pt-3 mt-5 pb-4  text-muted border-top text-center">
        © {currentYear} {title}.
      </footer>
    </>
  );
};

export default Footer;
