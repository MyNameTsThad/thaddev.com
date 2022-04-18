import React, {useEffect, useRef, useState} from 'react';

import {
  CarouselButton,
  CarouselButtonDot,
  CarouselButtons,
  CarouselContainer,
  CarouselItem,
  CarouselItemImg,
  CarouselItemText,
  CarouselItemTitle,
  CarouselMobileScrollNode,
  Name,
  Nickname
} from './AboutMeStyles';
import {Section, SectionDivider, SectionText, SectionTitle} from '../../styles/GlobalComponents';
import {TimeLineData} from '../../constants/constants';

const TOTAL_CAROUSEL_COUNT = TimeLineData.length;

const AboutMe = () => {
  const [activeItem, setActiveItem] = useState(0);
  const carouselRef = useRef();
  const scroll = (node, left) => {
    return node.scrollTo({left, behavior: 'smooth'});
  }

  const handleClick = (e, i) => {
    e.preventDefault();
    if (carouselRef.current) {
      const scrollLeft = Math.floor(carouselRef.current.scrollWidth * 0.7 * (i / TimeLineData.length));
      scroll(carouselRef.current, scrollLeft);
    }
  }
// snap back to beginning of scroll when window is resized
  // avoids a bug where content is covered up if coming from smaller screen
  useEffect(() => {
    const handleResize = () => {
      scroll(carouselRef.current, 0);
    }
    window.addEventListener('resize', handleResize);
  }, []);

  return (
      <Section id="aboutme">
        <SectionDivider/>
        <p><br/></p>
        <p><br/></p>
        <SectionTitle>About Me</SectionTitle>
        <SectionText>
          <img src="images/aboutme.svg" alt="aboutmeimage" width="40%" height="auto" style={{float: "right"}}/>
          My Name is <Name>Thad Choyrum</Name>, I am also known
          as <Nickname>Thad</Nickname>, <Nickname>ThadDev</Nickname>,
          &nbsp;<Nickname>MyNameTsThad</Nickname> or <Nickname>IWant2TryHard</Nickname>. I am
          a {getYearsOld(Date.now())} from Thailand,
          and is currently studying at The Princess Chulabhorn Science High School, Chonburi,
          as a {getGrade(Date.now())}<sup>th</sup> grade student. <br/> <br/>
          I have been coding on and off since when I was 9 years old, and have been coding since then.
          I also have a wide range of passion projects, ranging from games to websites to show for my coding skills.
          I have/had been involved in a few hackathons/competitions from different places, both online and
          offline. <br/> <br/>
          Today, I am a self-taught, full-stack programmer capable of many, many things. I have experience with Java,
          Python, C#, Javascript, and a bit of C++ and C.
        </SectionText>
        <CarouselContainer ref={carouselRef}>
          <>
            {TimeLineData.map((item, index) => {
              return (
                  <CarouselMobileScrollNode key={index} final={index === TOTAL_CAROUSEL_COUNT - 1}>
                    <CarouselItem
                        index={index}
                        id={`carousel-item-${index}`}
                        active={activeItem}
                        onClick={(e) => handleClick(e, index)}>
                      <CarouselItemTitle>
                        {item.year}
                        <CarouselItemImg
                            width="208"
                            height="6"
                            viewBox="0 0 208 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                          <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M2.5 5.5C3.88071 5.5 5 4.38071 5 3V3.5L208 3.50002V2.50002L5 2.5V3C5 1.61929 3.88071 0.5 2.5 0.5C1.11929 0.5 0 1.61929 0 3C0 4.38071 1.11929 5.5 2.5 5.5Z"
                              fill="url(#paint0_linear)"
                              fill-opacity="0.33"
                          />
                          <defs>
                            <linearGradient
                                id="paint0_linear"
                                x1="-4.30412e-10"
                                y1="0.5"
                                x2="208"
                                y2="0.500295"
                                gradientUnits="userSpaceOnUse">
                              <stop stop-color="white"/>
                              <stop
                                  offset="0.79478"
                                  stop-color="white"
                                  stop-opacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </CarouselItemImg>
                      </CarouselItemTitle>
                      <CarouselItemText>{item.text}</CarouselItemText>
                    </CarouselItem>
                  </CarouselMobileScrollNode>
              );
            })}
          </>
        </CarouselContainer>
        <CarouselButtons>
          {TimeLineData.map((item, index) => {
            return (
                <CarouselButton
                    key={index}
                    id={`carousel-button-${index}`}
                    active={activeItem === index}
                    onClick={(e) => handleClick(e, index)}>
                  <CarouselButtonDot active={activeItem}/>
                </CarouselButton>
            );
          })}
        </CarouselButtons>
      </Section>
  );
};

function getYearsOld(current) {
  const elapsed = current - 1212549780000;
  return Math.floor(elapsed / 31556952000) + ' year old';
}

function getGrade(current) {
  const elapsed = current - 1212549780000;
  const age = Math.round(elapsed / 31556952000);
  return age - 5;
}

export default AboutMe;
