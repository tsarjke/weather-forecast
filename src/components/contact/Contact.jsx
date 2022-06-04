import React from 'react';
import './contact.scss';

import { ReactComponent as GithubIcon } from './img/github.svg';
import { ReactComponent as TgIcon } from './img/telegram2.svg';
import { ReactComponent as LinIcon } from './img/linkedin2.svg';
import { ReactComponent as GmailIcon } from './img/gmail2.svg';

const Contact = () => {
  const contactList = [
    [<GithubIcon />, 'https://github.com/tsarjke'],
    [<TgIcon />, 'https://t.me/tsarjke'],
    [<LinIcon />, 'https://www.linkedin.com/in/tsarev-ivan/'],
    [<GmailIcon />, 'mailto:ivantsarb@gmail.com'],
  ].map(([svg, link]) => (
    <li
      className="contact-list__elem"
      key={link}
    >
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="contact-list__link"
      >
        {svg}
      </a>
    </li>
  ));

  return (
    <ul
      className="contact-list"
      data-testid="contact"
    >
      {contactList}
    </ul>
  );
};

export default Contact;
