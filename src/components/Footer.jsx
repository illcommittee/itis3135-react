import React from 'react'

function Footer() {
  return (
    <footer>
      <nav>
        <a href="https://webpages.uncc.edu/ngustaf1/">CLT EDU</a>
        {' || '}
        <a href="https://github.com/illcommittee/illcommittee.github.io">GitHub</a>
        {' || '}
        <a href="https://illcommittee.github.io">Github.io</a>
        {' || '}
        <a
          href="https://www.freecodecamp.org/sepiksprime"
          target="_blank"
          rel="noopener noreferrer"
        >
          freeCodeCamp
        </a>
        {' || '}
        <a href="https://www.codecademy.com/profiles/NotoriousGecko">
          Codecademy
        </a>
        {' || '}
        <a href="https://www.linkedin.com/in/nathaniel-gustafson/">
          Linkedin
        </a>
      </nav>

      <p>
        Page Designed by{' '}
        <a href="https://ndgllc.co/">NDG LLC.</a>
        &copy; 2025
      </p>

      <p className="validation-label">Validation Links:</p>

      <nav>
        <a
          className="pill"
          href="https://validator.w3.org/check/referer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="pill-left">W3C</span>
          <span className="pill-right">HTML ✓</span>
        </a>
        <a
          className="pill"
          href="https://jigsaw.w3.org/css-validator/check/referer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="pill-left">W3C</span>
          <span className="pill-right">CSS ✓</span>
        </a>
      </nav>
    </footer>
  )
}

export default Footer