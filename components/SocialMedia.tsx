export default function SocialMedia() {
  return (
    <section className="socialMediaContainer">
      <div className="socialMediaContainer__each">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/santiago-vittor-862033107/"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <img src="/svgs/linkedin.svg" alt="LinkedIn icon" />
        </a>
      </div>

      <div className="socialMediaContainer__each">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/santiagovittor"
          aria-label="GitHub"
          title="GitHub"
        >
          <img src="/svgs/github.svg" alt="GitHub icon" />
        </a>
      </div>

      <div className="socialMediaContainer__each">
        <a href="mailto:svittordev@gmail.com" aria-label="Email" title="Email">
          <img src="/svgs/gmail.svg" alt="Email icon" />
        </a>
      </div>
    </section>
  );
}
