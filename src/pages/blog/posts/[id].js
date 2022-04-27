import React from 'react';
import {NextSeo} from "next-seo";
import {AltLayout} from "../../../layout/AltLayout";
import {Section, SectionSubText, SectionText, SectionTitle} from "../../../styles/GlobalComponents";
import axios from "axios";
import Image from "next/image";
import {AiFillCalendar} from "react-icons/ai";
import {BiLeftArrow, BiRightArrow} from "react-icons/bi";
import {NavLink} from "../../../components/Header/HeaderStyles";
import {marked} from 'marked';
import PostContent from "../../../components/Blog/BlogPage/PostContent";

const PostPage = (props) => {
  const published = new Date(props.post.data.attributes.publishedAt).toLocaleString();
  const updated = new Date(props.post.data.attributes.updatedAt).toLocaleString();

  const htmlContent = marked.parse(props.post.data.attributes.content === null ? "" : props.post.data.attributes.content);
  return (
    <>
      <NextSeo title="ThadDev's Site - Blog"/>
      <AltLayout>
        <Section>
          <NavLink href="/blog/"><SectionSubText><BiLeftArrow/> Back to Blog</SectionSubText></NavLink>
          <NavLink href={`/blog/posts/${parseInt(props.id) - 1}`}><SectionSubText><BiLeftArrow/> Previous
            post</SectionSubText></NavLink>
          <div style={{"margin-left": "auto", "margin-right": "0"}}>
            <NavLink href={`/blog/posts/${parseInt(props.id) + 1}`}><SectionSubText>Next
              post <BiRightArrow/></SectionSubText></NavLink>
          </div>
          <p><br/></p>
          <Image src={"http://localhost:1337" + props.post.data.attributes.image.data.attributes.url}
                 alt={props.post.data.attributes.image.data.attributes.alternativeText}
                 width={props.post.data.attributes.image.data.attributes.width}
                 height={props.post.data.attributes.image.data.attributes.height}/>
          <p><br/></p>
          <SectionSubText>
            <AiFillCalendar size="2rem"/> Posted at {published} {published !== updated ? <>(Updated
            at {updated})</> : null}
          </SectionSubText>
          <SectionTitle>{props.post.data.attributes.title}</SectionTitle>
          <SectionText>{props.post.data.attributes.description}</SectionText>
          {/*<>
            <SectionDivider/>
            <p><br/></p><p><br/></p>
            <SectionText dangerouslySetInnerHTML={{__html: htmlContent}}/>
          </>*/}
          <PostContent content={htmlContent}/>
        </Section>
      </AltLayout>
    </>
  );
};

export async function getStaticProps({params}) {
  const post = await axios.get(`http://localhost:1337/api/posts/${params.id}?populate=image`);
  //console.log(post.data);
  return {
    props: {
      post: post.data,
      id: params.id
    },
  };
}

export async function getStaticPaths() {
  const posts = await axios.get("http://localhost:1337/api/posts");
  const paths = posts.data.data.map((post) => {
    return {
      params: {
        id: post.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false
  };
}

export default PostPage;
