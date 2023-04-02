function getYear() {
  const date = new Date();
  return date.getFullYear();
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© {getYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
