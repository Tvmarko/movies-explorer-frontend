import React from "react";
import "./AboutMe.css";
import photo from "../../images/myphoto.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__title-wrap">
        <h2 className="about-me__title">Студент</h2>
      </div>
      <div className="about-me__info-container">
        <img src={photo} alt="фото" className="about-me__photo" />
        <div className="about-me__description-container">
          <article className="about-me__container">
            <h3 className="about-me__name">Татьяна</h3>
            <h4 className="about-me__job">Менеджер в IT-компании, 47 лет</h4>
            <p className="about-me__description">
              Я работаю менеджером по работе с партнерами в IT-компании. У меня семья: муж и двое детей. 
              Я люблю слушать музыку и читать книги, играю на пианино, а ещё увлекаюсь настольным теннисом. Совсем недавно увлеклась
              веб-разработкой, поэтому пошла учиться на курс в Яндекс.Практикум. Я надеюсь, что мне пригодятся в будущем
              мои новые знания. В любом случае мне нравится мое новое увлечение и хочу продолжать в нем развиваться. 
              Несмотря на свой зрелый возраст, я все время стремлюсь к развитию, полна энергии и вдохновляющих
              идей. Надеюсь, что у меня все получится.
            </p>
          </article>
          <ul className="about-me__social-links">
              <li>
                <a className="about-me__social-link link"
                  href="https://www.instagram.com/tvmarko/">
                  Instagram
                </a>
              </li>
              <li>
                <a className="about-me__social-link link"
                  href="https://github.com/tvmarko">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
} 

export default AboutMe;