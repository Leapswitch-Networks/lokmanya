import React, { useState, useEffect } from "react";
import Head from "next/head";
import HealthVideos from "@/site/components/HealthVideos";

const Video = () => {
  return (
    <>
      <Head>
        <title>Lokmanya Hospitals Videos | Healthcare Tips & Patient Stories</title>
        <meta name="description" content="Discover health tips, treatments, and patient stories with videos from Lokmanya Hospitals. Stay informed and take charge of your health today." />
      </Head>
      <HealthVideos/>
    </>
  );
};

export default Video;
