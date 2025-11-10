import React from 'react'

function Introduction() {
  return (
    <>
      <h2>Introduction</h2>
      <h2>Gustafson, Nathaniel D.</h2>
      <p>
        I understand that this is a public document and that I will not be posting
        anything I’m uncomfortable with being online - NG 8/18/2025
      </p>

      <figure>
        <img
          className="personal_photo"
          style={{ width: '200px', height: 'auto' }}
          src="/itis3135-react/images/me.png"
          alt="Picture of Nate Gustafson"
        />
        <figcaption>Photo of me at Biltmore Gardens</figcaption>
      </figure>

      <ul>
        <li>
          <b>Personal Background:</b> I was born in Akron, Ohio, but my family
          quickly moved to Monroe, North Carolina, where I’ve lived since.
          I went to South Piedmont Community College to get an Associate&apos;s Transfer
          degree in Science, then transferred to UNCC to pursue Cyber Security.
        </li>
        <li>
          <b>Professional Background:</b> Since 2021, I&apos;ve worked at Chick-fil-A,
          serving as a Team Leader for the last 2 years.
        </li>
        <li>
          <b>Academic Background:</b> Transfer student in Computer Science with a
          concentration in Cyber Security.
        </li>
        <li>
          <b>Primary Computer:</b> Custom Windows 11 desktop I work on from home.
        </li>
        <li>
          <b>Current Courses</b>
          <ul>
            <li><b>MATH 2164 - Matrices &amp; Linear Algebra</b></li>
            <li><b>ITIS 3200 - Intro to Info Security &amp; Privacy</b></li>
            <li><b>ITSC 3146 - Intro to Operating Systems &amp; Networking</b></li>
            <li><b>ITSC 3160 - Database Design and Implementation</b></li>
            <li><b>ITIS 3135 - Front-End Web App Development</b></li>
          </ul>
        </li>
      </ul>

      <blockquote className="theo-quote">
        “Believe you can, and you’re halfway there.” -Theodore Roosevelt
      </blockquote>
    </>
  )
}

export default Introduction