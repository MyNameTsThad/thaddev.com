import React from 'react';
import Link from 'next/link';
import {LongButton} from "../../styles/GlobalComponents/Button";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {SectionTitle} from "../../styles/GlobalComponents";

const BlogSection = () => {
  const router = useRouter();
  const {t} = useTranslation();
  return (
    <>
      <p><br/></p>
      <p><br/></p>
      <SectionTitle>{t('blog')}</SectionTitle>
      <div style={{width: "50%", margin: "0 auto"}}>
        <Link href="blog/" locale={`${router.locale}`}><LongButton>{t('blog')} »</LongButton></Link>
      </div>
      <p><br/></p>
    </>
  );
};


export default BlogSection;
