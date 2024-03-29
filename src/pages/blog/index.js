import {NextSeo} from "next-seo";
import axios from "axios";
import {Section, SectionDivider, SectionText, SectionTitle} from "../../styles/GlobalComponents";
import FrontPagePosts from "../../components/Blog/BlogPage/FrontPagePosts";
import {AltLayout} from "../../layout/AltLayout";
import ChangeLanguageButton from "../../styles/GlobalComponents/Button";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import React from "react";

const Index = (props) => {
  const {t} = useTranslation('blog', 'common');
  return (
    <>
      <NextSeo title="ThadDev's Site - Blog"/>
      <AltLayout>
        <Section>
          <SectionTitle>{t('common:blog')}</SectionTitle>
          <SectionText>{t('welcome')}</SectionText>
          <SectionDivider/>
          <p><br/></p>
          <p><br/></p>
          <FrontPagePosts posts={props.posts === undefined ? {} : props.posts.data}/>
          <p><br/></p>
        </Section>
      </AltLayout>
      <ChangeLanguageButton/>
    </>
  );
};

export async function getServerSideProps({locale}) {
  const postsRes = await axios.get('https://cms.thaddev.com/api/posts?populate=image?locale=' + locale.split('-')[0]);
  return {
    props: {
      posts: postsRes.data,
      ...(await serverSideTranslations(locale, ['common', 'blog'])),
    },
  };
}

export default Index;