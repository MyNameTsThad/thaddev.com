import {NextSeo} from "next-seo";
import axios from "axios";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import React from "react";

const Index = (props) => {
  const {t} = useTranslation('blog', 'common');
  return (
    <>
      <NextSeo title="ThadDev's Site - Blog"/>
      {/*<AltLayout>
        <Section>
          <SectionTitle>{t('common:blog')}</SectionTitle>
          <SectionText>{t('welcome')}</SectionText>
          <SectionDivider/>
          <p><br/></p>
          <p><br/></p>
          <FrontPagePosts posts={props.posts === undefined ? {} : props.posts.data}/>
          <p><br/></p>
        </Section>
      </AltLayout>*/}

    </>
  );
};

export async function getServerSideProps({locale}) {
  const postsRes = await axios.get('https://thaddev.com/blog/cms-strapi/api/posts?populate=image');
  return {
    props: {
      posts: postsRes.data,
      ...(await serverSideTranslations(locale, ['common', 'blog'])),
    },
  };
}

export default Index;