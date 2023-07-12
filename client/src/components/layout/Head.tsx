import React from "react";
import HeadNext from "next/head";

interface Props {
  title: string;
  description: string;
}

export const Head = ({ title, description }: Props) => {
  return (
    <HeadNext>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </HeadNext>
  );
};
