export default function SocialMedia() {
  return (
    <section className="socialMediaContainer">
      <div className="socialMediaContainer__each">
        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/">
          <img src="/svgs/linkedin.svg" alt="linkedin icon" />
        </a>
      </div>

      <div className="socialMediaContainer__each">
        <a target="_blank" rel="noreferrer" href="https://api.whatsapp.com/send?phone=+000000000">
          <img src="/svgs/whatsapp.svg" alt="whatsapp icon" />
        </a>
      </div>

      <div className="socialMediaContainer__each">
        <a target="_blank" rel="noreferrer" href="https://www.facebook.com/">
          <img src="/svgs/facebook.svg" alt="facebook icon" />
        </a>
      </div>

      <div className="socialMediaContainer__each">
        <a target="_blank" rel="noreferrer" href="https://github.com/">
          <img src="/svgs/github.svg" alt="github icon" />
        </a>
      </div>

      <div className="socialMediaContainer__each">
        <a href="mailto:you@example.com">
          <img src="/svgs/gmail.svg" alt="gmail icon" />
        </a>
      </div>
    </section>
  );
}
