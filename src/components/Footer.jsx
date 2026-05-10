export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="app-footer">
      <img src="/logo.png" alt="Yizik logo" className="footer-logo" />
      <span className="footer-copy">© {year} Yizik. All rights reserved.</span>
    </footer>
  )
}
