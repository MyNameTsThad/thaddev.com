import React from 'react';
import {BlogCard, MainCard} from "./BlogPageStyles";
import {CardInfo, GridContainer, HeaderThree, Hr, TitleContent, Vr,} from "../../Projects/ProjectsStyles";
import {SectionText} from "../../../styles/GlobalComponents";
import Image from 'next/image'
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";

const FrontPagePosts = ({posts}) => {
  const {t} = useTranslation(['blog', 'common']);
  const router = useRouter();
  let firstPostId = posts.length === 0 ? -1 : posts[posts.length - 1].id;
  let firstPost = posts.length === 0 ? -1 : posts[posts.length - 1];
  if (posts.length === 0) {
    return (
      <>
        <p><br/></p>
        <p><br/></p>
        <center><SectionText>{t('no-posts')}</SectionText></center>
      </>);
  } else {
    return (
      <>
        <Link href={`/blog/posts?id=${firstPostId}`} locale={router.locale}>
          <MainCard>
            <p><br/></p>
            <TitleContent>
              {firstPost.attributes.image !== null && firstPost.attributes.image !== undefined ?
                <Image src={"https://cms.thaddev.com" + firstPost.attributes.image.data.attributes.url}
                       alt={firstPost.attributes.image.data.attributes.alternativeText}
                       width={firstPost.attributes.image.data.attributes.width * 0.75}
                       height={firstPost.attributes.image.data.attributes.height * 0.75}/> : <></>}
              <p><br/></p>
              <HeaderThree title>
                {firstPost.attributes.title}
              </HeaderThree>
            </TitleContent>
            <Vr/>
            <CardInfo>{firstPost.attributes.description}</CardInfo>
          </MainCard>
        </Link>
        <GridContainer>
          {posts.slice(0).reverse().map(({id, attributes}) => {
            if (id !== firstPostId) {
              return (
                <Link href={`/blog/posts?id=${id}`}>
                  <BlogCard>
                    <TitleContent>
                      {attributes.image != null && attributes.image.data != null ?
                        <><Image src={"https://cms.thaddev.com" + attributes.image.data.attributes.url}
                                 alt={attributes.image.data.attributes.alternativeText}
                                 width={attributes.image.data.attributes.width * 0.75}
                                 height={attributes.image.data.attributes.height * 0.75}/><p><br/></p></>
                        : null}
                      <HeaderThree title>
                        {attributes.title}
                        <Hr/>
                      </HeaderThree>
                    </TitleContent>
                    <CardInfo>{attributes.description}</CardInfo>
                  </BlogCard>
                </Link>
              );
            }
          })}
        </GridContainer>
      </>
    );
  }
};

export default FrontPagePosts;
